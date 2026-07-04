import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/digie-light.png";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Smart TVs", to: "/products" },
      { label: "Speakers", to: "/products" },
      { label: "Air Coolers", to: "/products" },
      { label: "Kitchen", to: "/products" },
      { label: "Accessories", to: "/products" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Technology", to: "/technology" },
      { label: "Dealer Network", to: "/dealer" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Centre", to: "/support" },
      { label: "Track Order", to: "/profile" },
      { label: "Warranty", to: "/support" },
      { label: "Downloads", to: "/support" },
    ],
  },
] as const;

const socials = [
  { Icon: Instagram, href: "https://instagram.com/", label: "Instagram" },
  { Icon: Facebook, href: "https://facebook.com/", label: "Facebook" },
  { Icon: Youtube, href: "https://youtube.com/", label: "YouTube" },
  { Icon: Twitter, href: "https://x.com/", label: "Twitter" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Subscribed! Welcome to the Digie inner circle.");
    setEmail("");
  };

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-spectrum-gradient"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
      />

      <div className="container-px relative mx-auto max-w-7xl py-16">
        {/* Newsletter */}
        <div className="mb-14 grid items-center gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:grid-cols-[1.2fr_1fr] md:p-10">
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Join the <span className="text-gradient-accent">Digie</span> newsletter
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Launches, offers and product drops — straight to your inbox. No spam, ever.
            </p>
          </div>
          <form onSubmit={subscribe} className="flex w-full items-center gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="h-12 w-full rounded-full border border-white/12 bg-white/[0.04] pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
              />
            </div>
            <Button type="submit" variant="accent" className="h-12 shrink-0">
              Subscribe <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2">
              <img src={logo} alt="Digie Innovation" className="h-9 w-auto object-contain" />
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Premium consumer electronics engineered in India. Twenty-five years of design,
              precision manufacturing and a promise of brilliance in every home.
            </p>

            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                +91-84477 44522
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                info.digitalinnovations22@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                A-1/380 Swadeshi Compound, Sector 17, Ghaziabad 201001
              </p>
            </div>
          </div>

          {/* Footer Columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wide">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
                    >
                      <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Digie Electronics. All rights reserved.</p>

          <div className="flex gap-3">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-glow"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
