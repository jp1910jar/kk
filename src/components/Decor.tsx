import { cn } from "@/lib/utils";

/**
 * Animated aurora / mesh-gradient backdrop. Purely decorative and
 * pointer-events-none so it never interferes with content or interactions.
 */
export function Aurora({
  className,
  intensity = "medium",
}: {
  className?: string;
  intensity?: "soft" | "medium" | "strong";
}) {
  const opacity =
    intensity === "strong" ? "opacity-90" : intensity === "soft" ? "opacity-40" : "opacity-70";
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div
        className={cn(
          "absolute -left-24 -top-24 h-[38rem] w-[38rem] rounded-full blur-3xl animate-aurora",
          opacity,
        )}
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.64 0.21 258 / 0.55), transparent 65%)",
        }}
      />
      <div
        className={cn(
          "absolute -right-32 top-10 h-[34rem] w-[34rem] rounded-full blur-3xl animate-aurora",
          opacity,
        )}
        style={{
          animationDelay: "-6s",
          background:
            "radial-gradient(circle at center, oklch(0.56 0.25 305 / 0.5), transparent 65%)",
        }}
      />
      <div
        className={cn(
          "absolute bottom-[-12rem] left-1/3 h-[32rem] w-[32rem] rounded-full blur-3xl animate-aurora",
          opacity,
        )}
        style={{
          animationDelay: "-11s",
          background:
            "radial-gradient(circle at center, oklch(0.82 0.15 200 / 0.4), transparent 65%)",
        }}
      />
    </div>
  );
}

/** Subtle animated blueprint grid with a radial fade mask. */
export function GridPattern({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 bg-grid", className)}
      style={{
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
      }}
    />
  );
}

/** Floating decorative orbs used to add depth to sections. */
export function FloatingShapes({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <span className="absolute left-[8%] top-[18%] h-3 w-3 rounded-full bg-brand-cyan/70 blur-[1px] animate-float" />
      <span
        className="absolute right-[12%] top-[30%] h-2 w-2 rounded-full bg-brand-purple/80 animate-float-slow"
        style={{ animationDelay: "-3s" }}
      />
      <span
        className="absolute left-[18%] bottom-[16%] h-2.5 w-2.5 rounded-full bg-brand-blue/70 animate-float"
        style={{ animationDelay: "-5s" }}
      />
      <span
        className="absolute right-[22%] bottom-[26%] h-1.5 w-1.5 rounded-full bg-brand-cyan/70 animate-float-slow"
        style={{ animationDelay: "-1.5s" }}
      />
    </div>
  );
}

/** Gradient hairline separator. */
export function GradientDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent",
        className,
      )}
    />
  );
}

/** Shimmering skeleton block for loading states. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("shimmer rounded-xl", className)} />;
}
