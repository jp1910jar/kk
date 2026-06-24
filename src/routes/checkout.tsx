import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShoppingBag,
  Phone,
  User,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { formatINR } from "@/lib/format";
import { products } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Digie" },
      { name: "description", content: "Place your order with Digie." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cart, removeFromCart, clearCart } = useStore();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const cartItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { ...product, qty: item.qty } : null;
    })
    .filter(Boolean) as ((typeof products)[number] & { qty: number })[];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) newErrors.name = "Please enter your name.";
    if (!phone.trim()) newErrors.phone = "Please enter your phone number.";
    else if (!/^[6-9]\d{9}$/.test(phone.replace(/\s/g, "")))
      newErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <>
        <PageHero eyebrow="Order placed" title="Thank you!" crumbs={[{ label: "Checkout" }]} />
        <section className="container-px mx-auto max-w-xl py-20 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="h-20 w-20 text-accent" />
          </div>
          <h2 className="text-2xl font-semibold">We've received your request</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Thanks, <span className="text-foreground font-medium">{name}</span>! Our team will reach
            out to you on <span className="text-foreground font-medium">{phone}</span> shortly to
            confirm your order and discuss delivery.
          </p>
          <Button variant="accent" className="mt-10" onClick={() => navigate({ to: "/products" })}>
            Continue shopping
          </Button>
        </section>
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <PageHero eyebrow="Checkout" title="Your cart is empty" crumbs={[{ label: "Checkout" }]} />
        <section className="container-px mx-auto max-w-xl py-20 text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/40 mb-6" />
          <p className="text-muted-foreground">Add some products before checking out.</p>
          <Button variant="accent" className="mt-8" onClick={() => navigate({ to: "/products" })}>
            Browse products
          </Button>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Checkout" title="Place your order" crumbs={[{ label: "Checkout" }]} />

      <section className="container-px mx-auto max-w-7xl py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
          {/* Left — Payment notice + Contact form */}
          <div className="space-y-8">
            {/* Payment notice */}
            <div className="flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/40 dark:bg-amber-950/30">
              <AlertCircle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                Sorry, it seems that there are no available payment methods. Please contact us on
                this number <b>8447744522</b> if you require assistance or wish to make alternate
                arrangements.
              </p>
            </div>

            {/* How it works */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-semibold text-lg mb-1">How to place your order</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Fill in your name and phone number below and we'll call you to confirm your order,
                discuss delivery, and arrange payment.
              </p>

              <div className="mt-6 space-y-5">
                {/* Name */}
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-sm font-medium">
                    <User className="h-4 w-4 text-accent" /> Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((err) => ({ ...err, name: undefined }));
                    }}
                    className={cn(
                      "w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent",
                      errors.name ? "border-red-400" : "border-border",
                    )}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-sm font-medium">
                    <Phone className="h-4 w-4 text-accent" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setErrors((err) => ({ ...err, phone: undefined }));
                    }}
                    className={cn(
                      "w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent",
                      errors.phone ? "border-red-400" : "border-border",
                    )}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-sm font-medium">
                    <MessageSquare className="h-4 w-4 text-accent" /> Message{" "}
                    <span className="text-muted-foreground font-normal">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Any special requests, delivery instructions, preferred time to call…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right — Order summary */}
          <div>
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
              <h2 className="font-semibold text-lg mb-5">Order summary</h2>

              <ul className="space-y-4 divide-y divide-border">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex gap-3 pt-4 first:pt-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-xl object-cover shrink-0 border border-border"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-snug line-clamp-2">{item.name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">Qty: {item.qty}</p>
                      <p className="mt-1 text-sm font-semibold">
                        {formatINR(item.price * item.qty)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="shrink-0 text-muted-foreground hover:text-red-500 transition-colors"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span className="text-accent font-medium">Free</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                  <span>Total</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
              </div>

              <Button variant="accent" size="lg" className="mt-6 w-full" onClick={handleSubmit}>
                Place order <ChevronRight className="h-4 w-4" />
              </Button>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                We'll call you to confirm and arrange payment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
