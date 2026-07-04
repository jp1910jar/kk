import { type LucideIcon } from "lucide-react";
import { StaggerItem } from "./Reveal";

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <StaggerItem className="group h-full rounded-3xl border border-white/10 bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-accent transition-all duration-300 group-hover:bg-accent-gradient group-hover:text-accent-foreground group-hover:shadow-glow">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </StaggerItem>
  );
}
