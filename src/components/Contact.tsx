import { Mail, Phone } from "lucide-react";
import { site } from "@/lib/data";
import LinkedInIcon from "./LinkedInIcon";
import Section from "./Section";
import Reveal from "./Reveal";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: site.linkedinLabel,
    href: site.linkedin,
  },
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phoneHref}`,
  },
];

export default function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's Build Something"
      description="Whether it's a platform that needs an architect, a product that needs scaling, or an early-stage idea that needs a technical co-founder — I'd love to hear about it."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {channels.map((channel, i) => (
          <Reveal key={channel.label} delay={i * 0.08}>
            <a
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={
                channel.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="group flex h-full flex-col items-start gap-4 rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-accent/50"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-transform group-hover:scale-110">
                <channel.icon size={20} />
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest text-faint uppercase">
                  {channel.label}
                </p>
                <p className="mt-1.5 text-sm font-medium break-all text-foreground transition-colors group-hover:text-accent-strong">
                  {channel.value}
                </p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
