import { Link } from "@tanstack/react-router";
import { Heart, Star, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { type Product } from "@/lib/data";
import { formatINR, discountPct } from "@/lib/format";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const saved = inWishlist(product.id);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary/50">
        <Link to="/product/$id" params={{ id: product.id }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-foreground px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-background">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label="Toggle wishlist"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full glass text-foreground shadow-soft transition-colors hover:text-accent"
        >
          <Heart className={cn("h-4 w-4", saved && "fill-accent text-accent")} />
        </button>

        <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            variant="accent"
            size="sm"
            className="w-full"
            onClick={() => addToCart(product.id)}
          >
            <ShoppingBag className="h-4 w-4" /> Add to cart
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-medium uppercase tracking-wide">{product.brand}</span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            {product.rating}
          </span>
        </div>

        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="mt-2 line-clamp-2 font-display text-base font-medium leading-snug text-foreground transition-colors hover:text-accent"
        >
          {product.name}
        </Link>

        <div className="mt-auto flex items-end gap-2 pt-4">
          <span className="text-lg font-semibold text-foreground">{formatINR(product.price)}</span>
          <span className="mb-0.5 text-sm text-muted-foreground line-through">
            {formatINR(product.mrp)}
          </span>
          <span className="mb-0.5 ml-auto text-xs font-semibold text-accent">
            {discountPct(product.mrp, product.price)}% off
          </span>
        </div>
      </div>
    </motion.div>
  );
}
