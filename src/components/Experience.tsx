import { Briefcase } from "lucide-react";
import { experience } from "@/lib/data";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Career"
      title="Work Experience"
      description="From SaaS backends to real-time booking platforms and founder-level product ownership — four years of shipping production systems."
      className="bg-surface/40"
    >
      <ol className="relative space-y-10 border-l border-border pl-8 sm:pl-10">
        {experience.map((job, i) => (
          <li key={job.company} className="relative">
            {/* Timeline node */}
            <span
              className={`absolute top-1 -left-[41px] flex h-6 w-6 items-center justify-center rounded-full border sm:-left-[49px] ${
                job.current
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border-strong bg-surface text-faint"
              }`}
            >
              <Briefcase size={12} />
            </span>

            <Reveal delay={i * 0.05}>
              <article className="rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-accent/40 sm:p-8">
                <header className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold">
                      {job.role}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-accent-strong">
                      {job.company}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 font-mono text-xs whitespace-nowrap ${
                      job.current
                        ? "bg-accent-soft text-accent-strong"
                        : "bg-surface-raised text-faint"
                    }`}
                  >
                    {job.period}
                  </span>
                </header>

                <p className="mt-4 text-sm leading-relaxed text-muted italic">
                  {job.summary}
                </p>

                <ul className="mt-4 space-y-2.5">
                  {job.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {job.tech.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-surface-raised px-2.5 py-1 font-mono text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
