import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  Share2,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  Check,
  Download,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getProduct, getRelated } from "@/lib/data";
import { formatINR, discountPct } from "@/lib/format";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

import productBanner from "@/assets/product banner.webp";

export const Route = createFileRoute("/product/$id")({
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="container-px mx-auto max-w-7xl py-40 text-center">
      <h1 className="text-2xl font-semibold">Product not found</h1>
      <Link to="/products">
        <Button variant="accent" className="mt-6">
          Back to products
        </Button>
      </Link>
    </div>
  ),
});

function ProductDetail() {
  const { id } = Route.useParams();
  const product = getProduct(id);
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const [zoom, setZoom] = useState(false);
  const [active, setActive] = useState(0);

  if (!product) {
    return (
      <div className="container-px mx-auto max-w-7xl py-40 text-center">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <Link to="/products">
          <Button variant="accent" className="mt-6">
            Back to products
          </Button>
        </Link>
      </div>
    );
  }

  const related = getRelated(product);
  const saved = inWishlist(product.id);
  const gallery = [product.image, product.image, product.image];

  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        {/* Background image */}
        <img
          src={productBanner}
          alt="Product banner"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Content */}
        <div className="relative z-10 container-px mx-auto max-w-7xl h-full flex flex-col justify-end pb-8 pt-28">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-white/70 mb-3">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/products" className="hover:text-white transition-colors">
              Products
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">{product.name}</span>
          </nav>

          {/* Product name */}
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-md">
            {product.name}
          </h1>
          <p className="mt-1.5 text-sm text-white/70 uppercase tracking-widest">
            {product.brand} · {product.category}
          </p>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-10">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div
              className="group relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/90 to-white/70 shadow-soft"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
            >
              <img
                src={gallery[active]}
                alt={product.name}
                className={cn(
                  "h-full w-full object-cover transition-transform duration-500",
                  zoom && "scale-150",
                )}
              />
              <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full glass text-foreground">
                <ZoomIn className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-4 flex gap-3">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "h-20 w-20 overflow-hidden rounded-2xl border-2",
                    active === i ? "border-accent" : "border-border",
                  )}
                >
                  <img src={g} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info + sticky purchase */}
          <div>
            <div className="lg:sticky lg:top-24">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                {product.brand} · {product.category}
              </span>
              <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
                {product.name}
              </h2>
              <div className="mt-3 flex items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" /> {product.rating}
                </span>
                <span className="text-muted-foreground">{product.reviews} reviews</span>
                {product.inStock && (
                  <span className="inline-flex items-center gap-1 text-accent">
                    <Check className="h-4 w-4" /> In stock
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-end gap-3">
                <span className="text-3xl font-bold">{formatINR(product.price)}</span>
                <span className="mb-1 text-lg text-muted-foreground line-through">
                  {formatINR(product.mrp)}
                </span>
                <span className="mb-1.5 rounded-full bg-accent/15 px-2.5 py-0.5 text-sm font-semibold text-accent">
                  {discountPct(product.mrp, product.price)}% off
                </span>
              </div>

              <p className="mt-5 text-muted-foreground">{product.shortDescription}</p>

              <ul className="mt-6 space-y-2">
                {product.features.slice(0, 3).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {f}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="accent" size="lg" onClick={() => addToCart(product.id)}>
                  <ShoppingBag className="h-4 w-4" /> Add to cart
                </Button>
                <Button
                  size="lg"
                  onClick={() => {
                    addToCart(product.id);
                    navigate({ to: "/checkout" });
                  }}
                >
                  Buy now
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Wishlist"
                >
                  <Heart className={cn("h-5 w-5", saved && "fill-accent text-accent")} />
                </Button>
                <Button variant="outline" size="icon" aria-label="Share">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 text-center text-xs">
                {[
                  { icon: Truck, label: "Free delivery" },
                  { icon: ShieldCheck, label: "2-yr warranty" },
                  { icon: RotateCcw, label: "10-day returns" },
                ].map((b) => (
                  <div key={b.label} className="rounded-2xl border border-border bg-card p-4">
                    <b.icon className="mx-auto h-5 w-5 text-accent" />
                    <p className="mt-2 text-muted-foreground">{b.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="specs">
            <TabsList className="flex-wrap">
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="warranty">Warranty</TabsTrigger>
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
            </TabsList>
            <TabsContent value="specs" className="mt-6">
              <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                {product.specs.map((s) => (
                  <div key={s.label} className="flex justify-between bg-card px-5 py-4">
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="features" className="mt-6">
              <ul className="grid gap-3 sm:grid-cols-2">
                {product.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 rounded-2xl border border-border bg-card p-4"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {f}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="warranty" className="mt-6">
              <div className="rounded-2xl border border-border bg-card p-6 text-muted-foreground">
                {product.warranty}
              </div>
            </TabsContent>
            <TabsContent value="downloads" className="mt-6">
              <div className="space-y-3">
                {["User Manual (PDF)", "Quick Start Guide", "Warranty Card"].map((d) => (
                  <a
                    key={d}
                    href="#"
                    className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 hover:border-accent"
                  >
                    <span>{d}</span>
                    <Download className="h-4 w-4 text-accent" />
                  </a>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <SectionHeading eyebrow="You may also like" title="Related products" />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
