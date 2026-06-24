import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { type Category } from "@/lib/data";

export function CategoryCard({ category, large = false }: { category: Category; large?: boolean }) {
  return (
    <Link
      to="/products"
      search={{ category: category.id }}
      className={`group relative block overflow-hidden rounded-3xl border border-border bg-card shadow-soft ${
        large ? "row-span-2" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${large ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
        <motion.img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/10 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-background">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-background/70">{category.count} products</p>
          <h3 className="mt-1 font-display text-xl font-semibold sm:text-2xl">{category.name}</h3>
          <p className="mt-1 max-w-xs text-sm text-background/80">{category.tagline}</p>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full glass text-foreground transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}
