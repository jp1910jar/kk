import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, TrendingUp } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { products, categories } from "@/lib/data";
import { formatINR } from "@/lib/format";

const popular = ["OLED TV", "Soundbar", "Air Cooler", "Air Fryer", "Front Load"];

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      )
      .slice(0, 6);
  }, [query]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-24 max-w-2xl translate-y-0 gap-0 overflow-hidden rounded-3xl p-0">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search TVs, speakers, appliances…"
            className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-3">
          {!query && (
            <div className="p-3">
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <TrendingUp className="h-4 w-4" /> Popular searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popular.map((p) => (
                  <button
                    key={p}
                    onClick={() => setQuery(p)}
                    className="rounded-full border border-border px-4 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
                  >
                    {p}
                  </button>
                ))}
              </div>
              <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Categories
              </p>
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 6).map((c) => (
                  <Link
                    key={c.id}
                    to="/products"
                    search={{ category: c.id }}
                    onClick={() => onOpenChange(false)}
                    className="rounded-xl px-3 py-2 text-sm transition-colors hover:bg-secondary"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {query && results.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">
              No results for “{query}”.
            </p>
          )}

          {results.map((p) => (
            <Link
              key={p.id}
              to="/product/$id"
              params={{ id: p.id }}
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-secondary"
            >
              <img src={p.image} alt={p.name} className="h-14 w-14 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{p.name}</p>
                <p className="text-sm text-muted-foreground">{p.category}</p>
              </div>
              <span className="font-semibold">{formatINR(p.price)}</span>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
