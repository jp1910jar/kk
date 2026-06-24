import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Minus, Plus, Trash2, ShoppingBag, Tag, Truck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/store";
import { formatINR } from "@/lib/format";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Digie" }] }),
  component: CartPage,
});

function CartPage() {
  const { cartDetailed, subtotal, updateQty, removeFromCart } = useStore();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const shipping = subtotal > 0 ? (subtotal > 50000 ? 0 : 499) : 0;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "DIGIE10") { setDiscount(Math.round(subtotal * 0.1)); toast.success("Coupon applied — 10% off!"); }
    else { setDiscount(0); toast.error("Invalid coupon code"); }
  };

  return (
    <>
      <PageHero eyebrow="Bag" title="Shopping cart" crumbs={[{ label: "Cart" }]} />
      <section className="container-px mx-auto max-w-7xl py-12">
        {cartDetailed.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-16 text-center shadow-soft">
            <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-4 text-lg font-medium">Your cart is empty</p>
            <Link to="/products"><Button variant="accent" className="mt-6">Start shopping</Button></Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {cartDetailed.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-4 rounded-3xl border border-border bg-card p-4 shadow-soft">
                  <img src={product.image} alt={product.name} className="h-24 w-24 shrink-0 rounded-2xl object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link to="/product/$id" params={{ id: product.id }} className="font-display font-medium hover:text-accent">{product.name}</Link>
                      <button onClick={() => removeFromCart(product.id)} aria-label="Remove"><Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" /></button>
                    </div>
                    <span className="text-xs text-muted-foreground">{product.brand}</span>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center gap-1 rounded-full border border-border p-1">
                        <button onClick={() => updateQty(product.id, qty - 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-secondary"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-7 text-center text-sm font-medium">{qty}</span>
                        <button onClick={() => updateQty(product.id, qty + 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-secondary"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <span className="font-semibold">{formatINR(product.price * qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-3xl border border-border bg-card p-6 shadow-soft lg:sticky lg:top-24">
              <h2 className="font-display text-lg font-semibold">Order summary</h2>
              <div className="mt-4 flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon (try DIGIE10)" className="rounded-xl pl-9" />
                </div>
                <Button variant="outline" onClick={applyCoupon}>Apply</Button>
              </div>
              <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                <Row label="Subtotal" value={formatINR(subtotal)} />
                {discount > 0 && <Row label="Discount" value={`- ${formatINR(discount)}`} accent />}
                <Row label={<span className="inline-flex items-center gap-1"><Truck className="h-3.5 w-3.5" /> Shipping</span>} value={shipping === 0 ? "Free" : formatINR(shipping)} />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="font-semibold">Total</span>
                <span className="font-display text-xl font-bold">{formatINR(total)}</span>
              </div>
              <Link to="/checkout"><Button variant="accent" size="lg" className="mt-5 w-full">Proceed to checkout</Button></Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function Row({ label, value, accent }: { label: React.ReactNode; value: React.ReactNode; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={accent ? "font-medium text-accent" : "font-medium"}>{value}</span>
    </div>
  );
}
