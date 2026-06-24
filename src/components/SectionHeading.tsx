import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal>
      <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
        {eyebrow && (
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            <span className="h-px w-6 bg-accent" />
            {eyebrow}
          </span>
        )}
        <h2 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-[2.75rem]">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
        )}
      </div>
    </Reveal>
  );
}
