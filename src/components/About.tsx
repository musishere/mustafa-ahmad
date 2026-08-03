import { Gauge, Layers, Radio, Rocket } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";

const pillars = [
  {
    icon: Layers,
    title: "Systems Architecture",
    text: "End-to-end ownership of backend, frontend, and infrastructure — designing platforms from the ground up rather than patching them together.",
  },
  {
    icon: Radio,
    title: "Real-Time Platforms",
    text: "Socket-driven availability, live notifications, and reservation systems that keep data fresh at the exact moments conversion depends on it.",
  },
  {
    icon: Gauge,
    title: "Performance at Scale",
    text: "Sub-200ms APIs for thousands of concurrent users through index tuning, query restructuring, Redis caching, and zero-downtime deploys.",
  },
  {
    icon: Rocket,
    title: "Founder Mindset",
    text: "Product decisions treated as growth levers — split payments, gamification, and retention mechanics designed around measurable business outcomes.",
  },
];

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Architect by craft, founder by conviction"
      description="I've spent the last four years owning systems end to end — the architecture, the APIs, the dashboards, and the infrastructure underneath them. I care less about shipping features and more about the outcome they move: revenue that scales, latency that holds under load, and platforms teams actually rely on every day."
      className="bg-surface/40"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40">
              <pillar.icon size={22} className="text-accent" />
              <h3 className="mt-4 font-display text-base font-semibold">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {pillar.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
