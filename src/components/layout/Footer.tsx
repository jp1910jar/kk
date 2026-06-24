import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Instagram, Twitter, Youtube, Facebook } from "lucide-react";
import logo from "@/assets/digie.png";

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
  {
    Icon: Instagram,
    href: "https://instagram.com/",
  },
  {
    Icon: Facebook,
    href: "https://facebook.com/",
  },
  {
    Icon: Youtube,
    href: "https://youtube.com/",
  },
  {
    Icon: Twitter,
    href: "https://x.com/",
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-gradient font-display text-lg font-bold text-accent-foreground">
                D
              </span>

              <span className="font-display text-xl font-bold tracking-tight">DIGIE</span>
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
                      className="text-sm text-muted-foreground transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Digie Electronics. All rights reserved.</p>

          <div className="flex gap-3">
            {socials.map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full border border-border transition-all duration-300 hover:border-accent hover:text-accent"
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
