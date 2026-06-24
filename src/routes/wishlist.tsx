import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { products } from "@/lib/data";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — Digie" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));
  return (
    <>
      <PageHero eyebrow="Saved" title="Your wishlist" crumbs={[{ label: "Wishlist" }]} />
      <section className="container-px mx-auto max-w-7xl py-12">
        {items.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-16 text-center shadow-soft">
            <Heart className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-4 text-lg font-medium">Your wishlist is empty</p>
            <p className="mt-1 text-sm text-muted-foreground">Tap the heart on any product to save it here.</p>
            <Link to="/products"><Button variant="accent" className="mt-6">Browse products</Button></Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </>
  );
}
