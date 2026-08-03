import { ArrowRight, Mail, MapPin } from "lucide-react";
import { site, stats } from "@/lib/data";
import LinkedInIcon from "./LinkedInIcon";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Backdrop */}
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,var(--color-background)_70%)]"
        aria-hidden
      />
      <div
        className="absolute -top-40 left-1/2 h-130 w-2xl -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 pt-28 pb-16">
        <Reveal>
          <p className="flex items-center gap-2 font-mono text-sm text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for select projects
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            {site.name}
            <span className="mt-3 block text-gradient">{site.role}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {site.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#experience"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#06152e] transition-transform hover:scale-[1.03]"
            >
              View My Work
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/60 hover:text-accent-strong"
            >
              <Mail size={16} />
              Get in Touch
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong p-3 text-muted transition-colors hover:border-accent/60 hover:text-accent-strong"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon size={16} />
            </a>
            <span className="inline-flex items-center gap-1.5 text-sm text-faint">
              <MapPin size={14} />
              {site.location}
            </span>
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal delay={0.34}>
          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-surface px-6 py-5">
                <dd className="font-display text-3xl font-semibold text-accent-strong">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-sm text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
