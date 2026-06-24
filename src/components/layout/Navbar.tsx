import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SearchDialog } from "@/components/SearchDialog";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import logo from "@/assets/digie.png";

const nav = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Categories", to: "/categories" },
  { label: "Technology", to: "/technology" },
  { label: "About", to: "/about" },
  { label: "Support", to: "/support" },
  { label: "Contact", to: "/contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, wishlistCount } = useStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "glass shadow-soft" : "bg-transparent",
        )}
      >
        <nav className="container-px mx-auto flex h-18 max-w-7xl items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Digie Innovation"
              className="h-9 w-auto object-contain"
            />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-foreground after:scale-x-100" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="relative px-3 py-2 text-sm font-medium transition-colors hover:text-foreground after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-secondary"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-secondary"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && <Badge>{wishlistCount}</Badge>}
            </Link>
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-secondary"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && <Badge>{cartCount}</Badge>}
            </Link>
            <Link to="/login" className="ml-1 hidden sm:block">
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4" /> Login
              </Button>
            </Link>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-secondary lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-border glass lg:hidden"
            >
              <div className="container-px mx-auto flex max-w-7xl flex-col py-4">
                {nav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="rounded-xl px-3 py-3 text-base font-medium transition-colors hover:bg-secondary"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link to="/login" className="mt-2">
                  <Button variant="accent" className="w-full">
                    <User className="h-4 w-4" /> Login / Register
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
      {children}
    </span>
  );
}