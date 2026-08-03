import { GraduationCap } from "lucide-react";
import { education } from "@/lib/data";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Education() {
  return (
    <Section
      id="education"
      eyebrow="Foundation"
      title="Education"
      className="bg-surface/40"
    >
      <Reveal>
        <div className="flex items-start gap-5 rounded-2xl border border-border bg-surface p-8">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <GraduationCap size={22} />
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold">
              {education.degree}
            </h3>
            <p className="mt-1 text-sm text-muted">{education.school}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
