export const site = {
  name: "Mustafa Ahmed",
  role: "Solution Architect & Technical Founder",
  tagline:
    "Technical founder with 4+ years of experience building full-stack products, business platforms, and mobile applications from concept to production.",
  email: "musisherepawl@gmail.com",
  phone: "+92 335 4451205",
  phoneHref: "+923354451205",
  linkedin: "https://www.linkedin.com/in/musishere/",
  linkedinLabel: "linkedin.com/in/musishere",
  location: "Lahore, Pakistan",
};

export const stats = [
  { value: "4+", label: "Years of Experience" },
  { value: "3.5x", label: "Revenue Growth Delivered" },
  { value: "<200ms", label: "API Latency at Scale" },
  { value: "0", label: "Downtime Deployments" },
];

export const achievements = [
  {
    title: "End-to-End Product Ownership",
    description:
      "Owned end-to-end product architecture, backend, frontend, and infrastructure for a data engineering platform built from the ground up.",
    icon: "layers",
  },
  {
    title: "3–3.5x Revenue Growth",
    description:
      "Co-led a small engineering team, scaling daily revenue from $2K/day to $6–7K/day through platform performance and reliability improvements.",
    icon: "trending-up",
  },
  {
    title: "High-Concurrency APIs",
    description:
      "Architected and shipped high-concurrency, real-time RESTful APIs, sustaining sub-200ms latency for thousands of concurrent users at scale.",
    icon: "zap",
  },
  {
    title: "Full-Stack Technical Strategy",
    description:
      "Drove full-stack technical strategy and execution — security, performance optimization, CI/CD deployment, and team leadership — spanning founder-level decision-making to hands-on engineering.",
    icon: "compass",
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  current: boolean;
  summary: string;
  bullets: string[];
  tech: string[];
};

export const experience: Experience[] = [
  {
    company: "Khel",
    role: "Co-Founder",
    period: "Jan 2026 – Present",
    current: true,
    summary:
      "A marketplace booking platform for sports venues, where I own end-to-end product and technical vision across backend and mobile.",
    bullets: [
      "Founded Khel and owned end-to-end product and technical vision, driving every major architecture and platform decision across backend and mobile.",
      "Architected the core reservation system for a marketplace booking platform, resolving booking conflicts, payment deadlines, and partial payments — directly shaping booking-to-revenue conversion.",
      "Designed and built a peer-to-peer split-payment system in place of third-party payment gateway integration, reducing transaction costs and external dependency while turning group bookings into a key product differentiator.",
      "Led matchmaking and gamification strategy (ELO rating system, badges, streaks) as a deliberate retention mechanism, treating user engagement as a measurable growth lever rather than a standalone feature.",
      "Defined real-time communication strategy across bookings and matches, reducing user drop-off at critical engagement points.",
    ],
    tech: [
      "React Native",
      "Node.js",
      "PostgreSQL",
      "Real-Time Systems",
      "Product Strategy",
    ],
  },
  {
    company: "ByteForge",
    role: "Solution Architect",
    period: "Dec 2025 – Present",
    current: true,
    summary:
      "Owning end-to-end architecture of an internal business intelligence platform driving pricing and sourcing decisions.",
    bullets: [
      "Owned end-to-end architecture of web (backend, frontend, and system design) for an internal business intelligence dashboard, building a platform that scaled daily sales from ~$2K/day to $6–7K/day through real-time visibility into sales, ROI, and inventory performance.",
      "Designed and built backend infrastructure (Node.js, Express, PostgreSQL) to aggregate and process metrics from the data engineering pipeline into actionable sales and ROI reporting for the operations team.",
      "Built React-based frontend dashboard featuring sales/ROI data visualizations, inventory health monitoring, and drill-down reporting tools used daily by the business team to inform pricing and sourcing decisions.",
      "Implemented authentication and role-based access control (RBAC) for the internal platform, securing sensitive sales and ROI data access across teams.",
      "Partnered cross-functionally with data engineering to define and maintain API contracts between the data pipeline and dashboard, ensuring metric accuracy and reliability as data infrastructure scaled.",
    ],
    tech: ["Node.js", "Express", "PostgreSQL", "React", "RBAC", "System Design"],
  },
  {
    company: "Infoetech",
    role: "Lead Software Engineer",
    period: "Nov 2023 – Dec 2025",
    current: false,
    summary:
      "Led delivery of the APIs, real-time infrastructure, and cloud deployment behind a high-traffic tour-booking application.",
    bullets: [
      "Owned design and delivery of RESTful APIs and microservices (Node.js, Express) powering search, availability, and checkout flows for a tour-booking application, maintaining consistent sub-200ms response times at scale.",
      "Led real-time infrastructure integration using Socket.IO to power live availability updates and booking notifications, eliminating stale availability data at checkout and improving conversion reliability.",
      "Owned full-stack performance optimization, resolving slow search and availability queries through database index tuning, query restructuring, and Redis-based caching to sustain performance during peak booking traffic.",
      "Directed cloud-native deployment strategy on AWS using Docker and Kubernetes, achieving zero-downtime releases during high-traffic booking seasons.",
      "Established code review standards and engineering documentation practices, improving code quality, consistency, and delivery velocity across the team.",
    ],
    tech: ["Node.js", "Socket.IO", "Redis", "AWS", "Docker", "Kubernetes"],
  },
  {
    company: "Ethisol",
    role: "Software Engineer",
    period: "Mar 2023 – Nov 2023",
    current: false,
    summary:
      "Built the backend foundation, payment integrations, and observability layer for a growing SaaS product.",
    bullets: [
      "Designed and implemented scalable backend architecture (Node.js, MongoDB) that became the core technical foundation for a growing SaaS product, supporting product scale and reliability requirements.",
      "Owned end-to-end integration of third-party payment gateways (Stripe, PayPal) and external APIs, enabling secure, reliable transactional flows across the platform.",
      "Implemented role-based access control (RBAC) and JWT-based authentication, meeting enterprise-grade security and compliance requirements.",
      "Built centralized error handling and logging system with real-time alerting, significantly improving system observability and reducing incident response time.",
      "Standardized logging and monitoring practices across services, cutting mean time-to-detect (MTTD) for production incidents.",
    ],
    tech: ["Node.js", "MongoDB", "Stripe", "PayPal", "JWT", "Observability"],
  },
];

export const education = {
  school: "University of Lahore",
  degree: "Bachelor of Computer Science",
};

export const skills = [
  {
    category: "Artificial Intelligence",
    items: ["Claude Code", "RAG", "LangChain", "LangGraph"],
  },
  {
    category: "Frameworks",
    items: ["Node.js", "React.js", "React Native"],
  },
  {
    category: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "Go"],
  },
  {
    category: "Data",
    items: ["PostgreSQL", "SQL"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS (S3, SQS, EKS, ECS, SES, RDS)", "Docker", "Linux", "Git"],
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#achievements", label: "Achievements" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];
