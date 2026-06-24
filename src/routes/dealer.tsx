import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { TrendingUp, Megaphone, Handshake, MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Stagger } from "@/components/Reveal";
import { FeatureCard } from "@/components/FeatureCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { reviews } from "@/lib/data";

export const Route = createFileRoute("/dealer")({
  head: () => ({
    meta: [
      { title: "Dealer Network — Digie" },
      { name: "description", content: "Become a Digie dealer. Premium margins, marketing support and a trusted brand across India." },
    ],
  }),
  component: DealerPage,
});

const benefits = [
  { icon: TrendingUp, title: "Premium Margins", description: "Industry-leading margins with volume incentives and seasonal bonuses." },
  { icon: Megaphone, title: "Marketing Support", description: "Co-branded campaigns, in-store assets and digital lead generation." },
  { icon: Handshake, title: "Dedicated Manager", description: "A regional partner manager committed to your store's growth." },
];

function DealerPage() {
  const [submitting, setSubmitting] = useState(false);
  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); toast.success("Application received! Our team will reach out within 3 working days."); }, 800);
  };

  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Grow with the Digie dealer network"
        description="Join 1,200+ partners building successful businesses with a brand customers ask for by name."
        crumbs={[{ label: "Dealer Network" }]}
      />

      <section className="container-px mx-auto max-w-7xl py-12">
        <SectionHeading eyebrow="Why partner" title="Built for your success" />
        <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
          {benefits.map((b) => <FeatureCard key={b.title} {...b} />)}
        </Stagger>
      </section>

      <section className="container-px mx-auto max-w-7xl py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Requirements" title="What you'll need" />
            <ul className="mt-6 space-y-3">
              {["Registered retail space (min. 300 sq ft)", "Valid GST registration", "Working capital for initial inventory", "Commitment to brand standards"].map((r) => (
                <li key={r} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" /> {r}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3 rounded-3xl border border-border bg-secondary/40 p-6">
              <MapPin className="h-8 w-8 text-accent" />
              <div>
                <p className="font-semibold">Coverage across India</p>
                <p className="text-sm text-muted-foreground">Active in 28 states · expanding to 500 new towns by 2026.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handle} className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h3 className="font-display text-xl font-semibold">Dealer registration</h3>
            <div className="mt-6 space-y-4">
              <div><Label className="mb-1.5 block">Full name</Label><Input required placeholder="Your name" className="rounded-xl" /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label className="mb-1.5 block">Email</Label><Input required type="email" placeholder="you@email.com" className="rounded-xl" /></div>
                <div><Label className="mb-1.5 block">Phone</Label><Input required placeholder="+91" className="rounded-xl" /></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label className="mb-1.5 block">City</Label><Input required placeholder="City" className="rounded-xl" /></div>
                <div><Label className="mb-1.5 block">Store name</Label><Input placeholder="Store" className="rounded-xl" /></div>
              </div>
              <Button variant="accent" size="lg" className="w-full" disabled={submitting}>
                {submitting ? "Submitting…" : "Apply to become a dealer"}
              </Button>
            </div>
          </form>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-12">
        <SectionHeading align="center" eyebrow="Partner voices" title="What our dealers say" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => <TestimonialCard key={r.name} {...r} />)}
        </div>
      </section>
    </>
  );
}
