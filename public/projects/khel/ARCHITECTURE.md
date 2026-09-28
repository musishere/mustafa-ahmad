# Khel Architecture

How the mobile app, admin panel and landing site reach the Go backend on AWS EKS, and what that backend depends on. Drawn from `Khel-Backend`, `Khel-Mobile`, `Khel-Admin`, `Khel-Landing` and `Khel-backend-k8` as of 29 September 2026.

**At a glance:** 18 REST route groups · 3 WebSocket endpoints · 8 domain modules · 56 SQL migrations · 9 third-party APIs · 1 backend replica

## Repositories

| Repo | What it is | Stack |
|---|---|---|
| `Khel-Mobile` | Player + turf-owner app | Expo, React Native, React Query, Zod, Firebase Messaging, EAS builds |
| `Khel-Admin` | Internal admin panel | React 18, Vite, Radix UI, Tailwind, React Query, Recharts |
| `Khel-Landing` | Marketing site (static, no API calls) | React, Three.js, Framer Motion |
| `Khel-Backend` | API, WebSockets, background workers | Go 1.25, Gin, GORM, golang-migrate, gorilla/websocket |
| `Khel-backend-k8` | Kubernetes manifests | Deployment, LoadBalancer Service, Redis Deployment + PVC, ConfigMap, Secret |

## System map

```mermaid
flowchart LR
  subgraph clients["Clients"]
    mobile["Khel Mobile<br/>Expo · React Native"]
    admin["Khel Admin<br/>React · Vite"]
    landing["Khel Landing<br/>static, no API calls"]
  end

  subgraph aws["AWS · eu-north-1"]
    subgraph eks["EKS · khel-cluster"]
      lb["LoadBalancer Service<br/>:80 → :9000"]
      subgraph pod["khel-backend pod · 1 replica"]
        rest["REST /api/v1<br/>18 route groups"]
        ws["WebSockets<br/>/ws/chat · /matchmaking/ws · /admin/ws"]
        mods["Domain modules<br/>Catalog · Social · Booking · Matchmaking<br/>Tournament · Notifications · Admin · Shared"]
        workers["In-process workers<br/>SQS consumer ×5 · task pool ×5<br/>FCM push workers · story scheduler 24h"]
      end
      redis[("Redis 7<br/>OTP codes · OTP rate limits<br/>JWT denylist · slot queue · cache")]
    end
    pg[("PostgreSQL on RDS<br/>TLS · 56 migrations")]
    sqs[["SQS queue KHEL<br/>welcome_email jobs"]]
  end

  ext["Third-party APIs<br/>see table below"]

  mobile -- "REST · WSS" --> lb
  admin -- "REST · WSS" --> lb
  lb --> rest
  lb --> ws
  rest --> mods
  ws --> mods
  mods -- "SQL via GORM" --> pg
  mods -- "GET · SET · TTL" --> redis
  mods -. "send job" .-> sqs
  sqs -. "poll" .-> workers
  mods -- "outbound HTTPS" --> ext
  workers -- "outbound HTTPS" --> ext
  ext -. "FCM push" .-> mobile
```

Solid arrows are request/response; dashed arrows are asynchronous. Everything runs through one Gin process. Redis runs inside the cluster next to it, while RDS and SQS are managed AWS services outside it. The only thing that reaches a phone without going through the API is FCM push.

### Third-party APIs

| Service | Used for | Called from |
|---|---|---|
| Firebase Cloud Messaging | Push notifications | `services/shared/fcm.go`, `push.go` |
| Anthropic API | AI match recaps | `services/shared/ai.go` |
| PayFast | Checkout + signed webhook (`POST /api/v1/payments/payfast/webhook`) | `services/booking/payment_gateway.go` |
| Stripe | Payment intents | `services/booking/service.go` |
| Supabase Storage or Cloudinary | Image + video uploads (Supabase when `SUPABASE_*` is set, else Cloudinary) | `helpers/uploadImages.go` |
| LocationIQ | Place search, reverse geocoding | `handlers/location_handler.go`, `helpers/geocoding.go` |
| OpenWeather | Match-day forecast | `services/social/weather.go` |
| Facebook Graph | OAuth sign-in | `oauth/facebook.go` |
| Gmail SMTP | OTP + welcome emails | `helpers/send_email.go`, `queue/mail.go` |

## One request, start to finish

Global middleware runs on every request in this order (`BuildRouter` in `internal/app/middleware.go`):

| # | Middleware | What it does |
|---|---|---|
| 1 | Recovery | Turns a panic into a 500 |
| 2 | Request ID | Tags every log line for the request |
| 3 | Request log | Logs method, path, latency |
| 4 | Error handler | Renders `APIError`s as JSON |
| 5 | Audit logger | Writes mutating `/api/v1` requests to the DB and broadcasts them to the admin feed |
| 6 | CORS | Origin allowlist from `ALLOWED_ORIGINS` |
| 7 | Security headers | HSTS (production), CSP, `X-Frame-Options: DENY`, nosniff |
| 8 | IP rate limit | 20 req/s per IP, burst 40, else 429 |

```mermaid
flowchart LR
  req(["Request"]) --> mw["Middleware 1–7"]
  mw -. "mutations" .-> hub["Admin hub<br/>→ /admin/ws feed"]
  mw --> rl{"IP rate limit<br/>20/s · burst 40"}
  rl -- "over limit" --> r429["429"]
  rl -- "allowed" --> route["Route group<br/>/api/v1/…"]
  route --> auth["Auth middleware<br/>JWT cookie or Bearer"]
  auth --> perm["Permission check<br/>admin routes only"]
  perm --> handler["Handler<br/>bind · validate"]
  handler --> svc["Service<br/>domain rules"]
  svc --> repo["Repository<br/>GORM"]
  repo --> db[("Postgres · Redis")]
```

The audit logger calls `c.Next()` before recording, and it sits before CORS and the rate limiter, so it also records requests those two reject, with their final status code.

## How the modules are wired

`modules.WireAll` (`internal/app/modules/all.go`) builds the eight domain modules in a fixed order and hands each one references to the modules it needs. An arrow points from a module to one it holds.

```mermaid
flowchart TB
  mm["Matchmaking · built 8th"]
  catalog["Catalog · built 2nd<br/>no module deps"]
  booking["Booking · built 6th"]
  tournament["Tournament · built 7th"]
  notifications["Notifications · built 4th"]
  social["Social · built 3rd"]
  admin["Admin · built 5th<br/>no module deps"]
  shared["Shared · built 1st<br/>Push (FCM) · WSManager · Badge · AI"]

  mm --> catalog
  mm --> booking
  mm --> social
  booking --> social
  tournament --> social
  notifications --> social
  booking -. "LinkTournament()" .-> tournament
  social --> shared
  notifications --> shared
  booking --> shared
  tournament --> shared
  mm --> shared
```

The dotted arrow is `booking.LinkTournament(...)`: Booking is built before Tournament, so it gets that reference in a second step.

## Shipping the backend

From `Jenkinsfile`, `Dockerfile` and `Khel-backend-k8/deployment.yaml`:

```mermaid
flowchart LR
  push["git push"] --> lint["golangci-lint"] --> build["go build<br/>server + migrate"]
  build -- "master only" --> docker["Docker build<br/>Go 1.25 → Alpine 3.20"]
  docker --> ecr["Push to ECR<br/>:sha7 + :latest"]
  ecr --> setimg["kubectl set image<br/>deployment/khel-backend"]
  setimg --> rollout["rollout status<br/>up to 120s"]
  rollout --> ready["Pod ready<br/>wait-for-redis init<br/>→ /health on :9000"]
```

Lint and compile run on every branch; only `master` builds the image and deploys. The mobile app ships separately through EAS. Nothing in these repos says where Khel Admin and Khel Landing are hosted.

## What the diagrams point to

- **All realtime state lives in one pod.** The chat hub, the matchmaking socket manager, the admin feed hub and the per-IP rate limiter are Go maps in process memory. A second replica would put users on different pods that can't see each other's sockets. Redis is already deployed, so Redis pub/sub is the natural fan-out when you need to scale out.
- **Redis is on the sign-in path.** OTP codes, OTP rate limits, the JWT denylist and slot-queue state all sit in one in-cluster Redis pod. New backend pods wait for it before starting. If it restarts, OTP sign-in and slot holds stop working until it's back.
- **Migrations are a manual step.** Jenkins compiles `cmd/migrate` but never runs it. Before a rollout that depends on a schema change, run `make migrate-up` against RDS, or the new pod will query columns that don't exist yet.
- **Production config still has placeholders.** `configmap.yaml` sets `ALLOWED_ORIGINS` to `https://your-frontend-domain.com` and `COOKIE_DOMAIN` to `your-domain.com`. The admin panel runs in a browser, so its requests will fail CORS until these hold real domains. The native mobile app sends no Origin header and isn't affected.
