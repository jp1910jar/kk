import { Link } from "@tanstack/react-router";
import { Heart, Star, ShoppingBag, Check } from "lucide-react";
import { motion } from "framer-motion";
import { type Product } from "@/lib/data";
import { formatINR, discountPct } from "@/lib/format";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const saved = inWishlist(product.id);
  const off = discountPct(product.mrp, product.price);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-card shadow-soft transition-colors duration-300 hover:border-primary/40 hover:shadow-glow"
    >
      {/* Gradient sheen on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-3xl bg-gradient-to-b from-primary/[0.07] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-white/90 to-white/70">
        <Link to="/product/$id" params={{ id: product.id }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </Link>

        {/* Badges */}
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {product.badge && (
            <span className="w-fit rounded-full bg-accent-gradient px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-foreground shadow-glow">
              {product.badge}
            </span>
          )}
          {off > 0 && (
            <span className="w-fit rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold text-accent backdrop-blur-sm">
              -{off}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.8 }}
          onClick={() => toggleWishlist(product.id)}
          aria-label="Toggle wishlist"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full glass text-foreground transition-colors hover:text-accent"
        >
          <Heart
            className={cn("h-4 w-4 transition-all", saved && "scale-110 fill-accent text-accent")}
          />
        </motion.button>

        {/* Stock indicator */}
        <span className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              product.inStock ? "bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400" : "bg-red-400",
            )}
          />
          {product.inStock ? "In stock" : "Sold out"}
        </span>

        {/* Add to cart reveal */}
        <div className="absolute inset-x-4 bottom-4 z-10 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
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

      <div className="relative z-10 flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-medium uppercase tracking-wide">{product.brand}</span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            {product.rating}
            <span className="text-muted-foreground/70">({product.reviews})</span>
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
          {off > 0 && (
            <span className="mb-0.5 ml-auto inline-flex items-center gap-1 text-xs font-semibold text-accent">
              <Check className="h-3 w-3" />
              {off}% off
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
