import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";

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
      <section className="relative h-64 md:h-80 overflow-hidden">
        {/* Background image */}
        <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Content */}
        <div className="relative z-10 container-px mx-auto max-w-7xl h-full flex flex-col justify-end pb-8 pt-32">
          <Reveal>
            <nav className="mb-3 flex items-center gap-1.5 text-sm text-white/70">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              {crumbs.map((c) => (
                <span key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5" />
                  {c.to ? (
                    <Link to={c.to} className="hover:text-white transition-colors">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white">{c.label}</span>
                  )}
                </span>
              ))}
            </nav>
            {eyebrow && (
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {eyebrow}
              </span>
            )}
            <h1 className="mt-1 text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-md">
              {title}
            </h1>
            {description && (
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-white/75">
                {description}
              </p>
            )}
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-hero pt-32 pb-14">
      <div className="container-px mx-auto max-w-7xl">
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
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-2 max-w-3xl text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
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
