import { Compass, Layers, TrendingUp, Zap } from "lucide-react";
import { achievements } from "@/lib/data";
import Section from "./Section";
import Reveal from "./Reveal";

const icons = {
  "trending-up": TrendingUp,
  layers: Layers,
  zap: Zap,
  compass: Compass,
} as const;

export default function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Highlights"
      title="Selected Achievements"
      description="A few outcomes I'm proud of — measured in revenue moved, latency held, and systems owned end to end."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {achievements.map((item, i) => {
          const Icon = icons[item.icon as keyof typeof icons] ?? Layers;
          return (
            <Reveal key={item.title} delay={i * 0.08}>
              <article className="group h-full rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-accent/40">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-transform group-hover:scale-110">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
