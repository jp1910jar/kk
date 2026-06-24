import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Lock, Chrome, Apple } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Digie" }] }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <>
      <PageHero eyebrow="Account" title="Welcome back" crumbs={[{ label: "Login" }]} />
      <section className="container-px mx-auto max-w-md py-12">
        <form onSubmit={(e) => e.preventDefault()} className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <div className="space-y-4">
            <div>
              <Label className="mb-1.5 block">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input required type="email" placeholder="you@email.com" className="rounded-xl pl-9" />
              </div>
            </div>
            <div>
              <Label className="mb-1.5 block">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input required type="password" placeholder="••••••••" className="rounded-xl pl-9" />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2"><Checkbox /> Remember me</label>
              <Link to="/forgot-password" className="text-accent hover:underline">Forgot password?</Link>
            </div>
            <Button variant="accent" size="lg" className="w-full">Sign in</Button>
          </div>
          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or continue with <span className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline"><Chrome className="h-4 w-4" /> Google</Button>
            <Button variant="outline"><Apple className="h-4 w-4" /> Apple</Button>
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to Digie? <Link to="/register" className="font-medium text-accent hover:underline">Create an account</Link>
          </p>
        </form>
      </section>
    </>
  );
}
