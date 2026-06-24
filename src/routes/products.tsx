import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { LayoutGrid, List, SlidersHorizontal, Star, X } from "lucide-react";
import { z } from "zod";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@tanstack/react-router";
import { products, categories, brands } from "@/lib/data";
import { formatINR, discountPct } from "@/lib/format";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  category: z.string().optional(),
});

export const Route = createFileRoute("/products")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "All Products — Digie" },
      {
        name: "description",
        content: "Browse premium TVs, speakers, coolers and appliances from Digie.",
      },
    ],
  }),
  component: ProductsPage,
});

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "discount", label: "Best Discount" },
];

const PER_PAGE = 9;
const maxPrice = Math.max(...products.map((p) => p.price));

function ProductsPage() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();

  const [selectedCats, setSelectedCats] = useState<string[]>(category ? [category] : []);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(maxPrice);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = (arr: string[], v: string, set: (x: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (selectedCats.length && !selectedCats.includes(p.categoryId)) return false;
      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
      if (p.price > price) return false;
      if (inStockOnly && !p.inStock) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "discount":
          return discountPct(b.mrp, b.price) - discountPct(a.mrp, a.price);
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
    return list;
  }, [selectedCats, selectedBrands, price, inStockOnly, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE) || 1;
  const current = Math.min(page, totalPages);
  const paged = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const clearAll = () => {
    setSelectedCats([]);
    setSelectedBrands([]);
    setPrice(maxPrice);
    setInStockOnly(false);
    setPage(1);
    navigate({ search: {} });
  };

  const Filters = (
    <div className="space-y-8">
      <FilterGroup title="Category">
        {categories.map((c) => (
          <label key={c.id} className="flex cursor-pointer items-center gap-3 py-1.5 text-sm">
            <Checkbox
              checked={selectedCats.includes(c.id)}
              onCheckedChange={() => {
                toggle(selectedCats, c.id, setSelectedCats);
                setPage(1);
              }}
            />
            <span className="flex-1">{c.name}</span>
            <span className="text-xs text-muted-foreground">{c.count}</span>
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Brand">
        {brands.map((b) => (
          <label key={b} className="flex cursor-pointer items-center gap-3 py-1.5 text-sm">
            <Checkbox
              checked={selectedBrands.includes(b)}
              onCheckedChange={() => {
                toggle(selectedBrands, b, setSelectedBrands);
                setPage(1);
              }}
            />
            {b}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Max price">
        <Slider
          value={[price]}
          min={1000}
          max={maxPrice}
          step={1000}
          onValueChange={(v) => {
            setPrice(v[0]);
            setPage(1);
          }}
        />
        <p className="mt-3 text-sm text-muted-foreground">Up to {formatINR(price)}</p>
      </FilterGroup>

      <FilterGroup title="Availability">
        <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm">
          <Checkbox
            checked={inStockOnly}
            onCheckedChange={(v) => {
              setInStockOnly(!!v);
              setPage(1);
            }}
          />
          In stock only
        </label>
      </FilterGroup>

      <Button variant="outline" className="w-full" onClick={clearAll}>
        Clear filters
      </Button>
    </div>
  );

  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="All products"
        description="Explore the complete Digie collection — filter, compare and find your perfect match."
        crumbs={[{ label: "Products" }]}
      />

      <section className="container-px mx-auto max-w-7xl py-12">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">{Filters}</div>
          </aside>

          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{paged.length}</span> of{" "}
                {filtered.length} products
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setFiltersOpen((v) => !v)}
                >
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </Button>
                <Select
                  value={sort}
                  onValueChange={(v) => {
                    setSort(v);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-9 w-[180px] rounded-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="hidden rounded-full border border-border p-1 sm:flex">
                  <button
                    onClick={() => setView("grid")}
                    className={cn(
                      "grid h-7 w-7 place-items-center rounded-full",
                      view === "grid" && "bg-secondary",
                    )}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={cn(
                      "grid h-7 w-7 place-items-center rounded-full",
                      view === "list" && "bg-secondary",
                    )}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {filtersOpen && (
              <div className="mb-6 rounded-3xl border border-border bg-card p-6 lg:hidden">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-semibold">Filters</span>
                  <button onClick={() => setFiltersOpen(false)}>
                    <X className="h-5 w-5" />
                  </button>
                </div>
                {Filters}
              </div>
            )}

            {paged.length === 0 ? (
              <div className="rounded-3xl border border-border bg-card p-16 text-center">
                <p className="text-lg font-medium">No products match your filters.</p>
                <Button variant="accent" className="mt-4" onClick={clearAll}>
                  Reset filters
                </Button>
              </div>
            ) : view === "grid" ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {paged.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paged.map((p) => (
                  <ListRow key={p.id} id={p.id} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={cn(
                      "h-10 w-10 rounded-full text-sm font-medium transition-colors",
                      current === i + 1
                        ? "bg-foreground text-background"
                        : "border border-border hover:bg-secondary",
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide">{title}</h3>
      {children}
    </div>
  );
}

function ListRow({ id }: { id: string }) {
  const p = products.find((x) => x.id === id)!;
  const { addToCart } = useStore();
  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-4 shadow-soft sm:flex-row">
      <Link to="/product/$id" params={{ id: p.id }} className="shrink-0">
        <img src={p.image} alt={p.name} className="h-44 w-full rounded-2xl object-cover sm:w-44" />
      </Link>
      <div className="flex flex-1 flex-col">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          {p.brand} · {p.category}
        </span>
        <Link
          to="/product/$id"
          params={{ id: p.id }}
          className="mt-1 font-display text-lg font-semibold hover:text-accent"
        >
          {p.name}
        </Link>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" /> {p.rating} ({p.reviews})
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.shortDescription}</p>
        <div className="mt-auto flex items-center gap-3 pt-4">
          <span className="text-lg font-semibold">{formatINR(p.price)}</span>
          <span className="text-sm text-muted-foreground line-through">{formatINR(p.mrp)}</span>
          <Button variant="accent" size="sm" className="ml-auto" onClick={() => addToCart(p.id)}>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
