import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { Aurora, GridPattern, FloatingShapes } from "./Decor";

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs = [],
  image,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: { label: string; to?: string }[];
  image?: string;
}) {
  if (image) {
    return (
      <section className="relative h-72 overflow-hidden md:h-96">
        <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/25 via-transparent to-brand-purple/20" />

        <div className="relative z-10 container-px mx-auto flex h-full max-w-7xl flex-col justify-end pb-10 pt-32">
          <Reveal>
            <nav className="mb-3 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Link to="/" className="transition-colors hover:text-accent">
                Home
              </Link>
              {crumbs.map((c) => (
                <span key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5" />
                  {c.to ? (
                    <Link to={c.to} className="transition-colors hover:text-accent">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-foreground">{c.label}</span>
                  )}
                </span>
              ))}
            </nav>
            {eyebrow && (
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {eyebrow}
              </span>
            )}
            <h1 className="mt-1 text-3xl font-bold leading-tight text-foreground md:text-5xl">
              {title}
            </h1>
            {description && (
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-hero pt-32 pb-16">
      <Aurora intensity="soft" />
      <GridPattern />
      <FloatingShapes />
      <div className="container-px relative mx-auto max-w-7xl">
        <Reveal>
          <nav className="mb-5 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-accent">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5" />
                {c.to ? (
                  <Link to={c.to} className="hover:text-accent">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
          {eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
