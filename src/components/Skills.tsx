import { skills } from "@/lib/data";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Toolbox"
      title="Skills & Technologies"
      description="The stack I reach for when taking products from architecture diagram to production traffic."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal
            key={group.category}
            delay={i * 0.06}
            className={i === 0 ? "md:col-span-2" : undefined}
          >
            <div className="h-full rounded-2xl border border-border bg-surface p-7">
              <h3 className="font-mono text-sm tracking-widest text-accent uppercase">
                {group.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border bg-surface-raised px-3 py-1.5 text-sm text-foreground/90 transition-colors hover:border-accent/50 hover:text-accent-strong"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
