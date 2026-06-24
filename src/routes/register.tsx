import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — Digie" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const [otp, setOtp] = useState(false);
  return (
    <>
      <PageHero eyebrow="Account" title="Create your account" crumbs={[{ label: "Register" }]} />
      <section className="container-px mx-auto max-w-md py-12">
        <form
          onSubmit={(e) => { e.preventDefault(); if (!otp) { setOtp(true); toast.success("Verification code sent to your email"); } else { toast.success("Account verified! Welcome to Digie."); } }}
          className="rounded-3xl border border-border bg-card p-8 shadow-soft"
        >
          {!otp ? (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label className="mb-1.5 block">First name</Label><Input required placeholder="First" className="rounded-xl" /></div>
                <div><Label className="mb-1.5 block">Last name</Label><Input required placeholder="Last" className="rounded-xl" /></div>
              </div>
              <div><Label className="mb-1.5 block">Email</Label><Input required type="email" placeholder="you@email.com" className="rounded-xl" /></div>
              <div><Label className="mb-1.5 block">Password</Label><Input required type="password" placeholder="••••••••" className="rounded-xl" /></div>
              <label className="flex items-center gap-2 text-sm"><Checkbox required /> I agree to the Terms & Privacy Policy</label>
              <Button variant="accent" size="lg" className="w-full">Create account</Button>
            </div>
          ) : (
            <div className="space-y-4 text-center">
              <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to your email.</p>
              <div className="flex justify-center gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Input key={i} maxLength={1} className="h-12 w-12 rounded-xl text-center text-lg" />
                ))}
              </div>
              <Button variant="accent" size="lg" className="w-full">Verify & continue</Button>
              <button type="button" className="text-sm text-accent hover:underline">Resend code</button>
            </div>
          )}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="font-medium text-accent hover:underline">Sign in</Link>
          </p>
        </form>
      </section>
    </>
  );
}
