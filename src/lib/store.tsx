import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { products, type Product } from "./data";

export interface CartItem {
  id: string;
  qty: number;
}

interface StoreValue {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  inWishlist: (id: string) => boolean;
  cartCount: number;
  wishlistCount: number;
  cartDetailed: { product: Product; qty: number }[];
  subtotal: number;
}

const StoreContext = createContext<StoreValue | null>(null);

function usePersisted<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setState(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [key, state, hydrated]);

  return [state, setState] as const;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = usePersisted<CartItem[]>("digie-cart", []);
  const [wishlist, setWishlist] = usePersisted<string[]>("digie-wishlist", []);

  const addToCart = useCallback(
    (id: string, qty = 1) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.id === id);
        if (existing) {
          return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
        }
        return [...prev, { id, qty }];
      });
      const p = products.find((x) => x.id === id);
      toast.success(`${p?.name ?? "Item"} added to cart`);
    },
    [setCart],
  );

  const removeFromCart = useCallback(
    (id: string) => setCart((prev) => prev.filter((i) => i.id !== id)),
    [setCart],
  );

  const updateQty = useCallback(
    (id: string, qty: number) =>
      setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))),
    [setCart],
  );

  const clearCart = useCallback(() => setCart([]), [setCart]);

  const toggleWishlist = useCallback(
    (id: string) => {
      setWishlist((prev) => {
        if (prev.includes(id)) {
          toast("Removed from wishlist");
          return prev.filter((x) => x !== id);
        }
        toast.success("Saved to wishlist");
        return [...prev, id];
      });
    },
    [setWishlist],
  );

  const value = useMemo<StoreValue>(() => {
    const cartDetailed = cart
      .map((i) => {
        const product = products.find((p) => p.id === i.id);
        return product ? { product, qty: i.qty } : null;
      })
      .filter(Boolean) as { product: Product; qty: number }[];
    const subtotal = cartDetailed.reduce((s, i) => s + i.product.price * i.qty, 0);
    return {
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      toggleWishlist,
      inWishlist: (id: string) => wishlist.includes(id),
      cartCount: cart.reduce((s, i) => s + i.qty, 0),
      wishlistCount: wishlist.length,
      cartDetailed,
      subtotal,
    };
  }, [cart, wishlist, addToCart, removeFromCart, updateQty, clearCart, toggleWishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
