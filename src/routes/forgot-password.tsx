import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — Digie" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  return (
    <>
      <PageHero eyebrow="Account" title="Reset your password" crumbs={[{ label: "Login", to: "/login" }, { label: "Reset" }]} />
      <section className="container-px mx-auto max-w-md py-12">
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Reset link sent to your email"); }} className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <p className="text-sm text-muted-foreground">Enter your email and we'll send you a secure reset link.</p>
          <div className="mt-5 space-y-4">
            <div><Label className="mb-1.5 block">Email</Label><Input required type="email" placeholder="you@email.com" className="rounded-xl" /></div>
            <Button variant="accent" size="lg" className="w-full">Send reset link</Button>
          </div>
          <p className="mt-6 text-center text-sm"><Link to="/login" className="text-accent hover:underline">Back to login</Link></p>
        </form>
      </section>
    </>
  );
}
