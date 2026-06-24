import { Star, Quote } from "lucide-react";

export function TestimonialCard({
  name,
  city,
  rating,
  text,
  product,
}: {
  name: string;
  city: string;
  rating: number;
  text: string;
  product: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
      <Quote className="h-8 w-8 text-accent/30" />
      <p className="mt-4 flex-1 text-base leading-relaxed text-foreground">“{text}”</p>
      <div className="mt-6 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? "fill-accent text-accent" : "text-border"}`}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-accent-gradient font-display font-semibold text-accent-foreground">
          {name.charAt(0)}
        </span>
        <div>
          <p className="font-medium leading-tight">{name}</p>
          <p className="text-xs text-muted-foreground">{city} · {product}</p>
        </div>
      </div>
    </div>
  );
}
