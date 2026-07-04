import { createFileRoute, Link } from "@tanstack/react-router";
import { Cpu, Zap, Volume2, Wifi, ShieldCheck, Leaf } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";

import quantumHdr from "@/assets/quantumhdr.jpg";
import acousticTuning from "@/assets/acoustictuning.avif";
import adaptiveAi from "@/assets/adavtiveai.avif";
import connectedCore from "@/assets/connectedcore.avif";
import duraBuild from "@/assets/durabuild.jpg";
import ecoSmart from "@/assets/ecosmart.avif";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology — Digie" },
      {
        name: "description",
        content:
          "Proprietary Digie technology: QuantumColour HDR, AI energy management, acoustic tuning and connected experiences.",
      },
    ],
  }),
  component: TechPage,
});

const tech = [
  {
    icon: Cpu,
    title: "QuantumColour HDR",
    description:
      "A billion shades of true-to-life colour rendered with per-pixel precision across every frame. Our proprietary HDR engine maps peak brightness and shadow detail simultaneously, delivering cinema-grade visuals in your living room.",
    image: quantumHdr,
  },
  {
    icon: Volume2,
    title: "Acoustic Tuning",
    description:
      "Every speaker enclosure is hand-tuned by audiophiles using real acoustic chambers — not just simulations. The result is rich, room-filling sound that's precise at low volumes and powerful at high ones.",
    image: acousticTuning,
  },
  {
    icon: Zap,
    title: "Adaptive Power AI",
    description:
      "Our onboard AI learns your daily usage patterns and intelligently scales power draw, cutting energy consumption by up to 40% without compromising performance. Smart savings, automatically.",
    image: adaptiveAi,
  },
  {
    icon: Wifi,
    title: "Connected Core",
    description:
      "Built on Wi-Fi 6 and Bluetooth 5.3, every Digie device stays fast, stable, and up to date. Seamless OTA firmware updates mean your product keeps getting better long after you take it home.",
    image: connectedCore,
  },
  {
    icon: ShieldCheck,
    title: "DuraBuild",
    description:
      "Engineered specifically for Indian conditions — surge-protected circuits, reinforced joints, and heat-resistant materials ensure your device performs reliably through voltage fluctuations, humidity, and daily wear.",
    image: duraBuild,
  },
  {
    icon: Leaf,
    title: "EcoSmart",
    description:
      "From recyclable packaging to low-power standby modes, sustainability is built into every product decision. Digie devices meet the highest energy-efficiency standards without sacrificing any features.",
    image: ecoSmart,
  },
];

function TechPage() {
  return (
    <>
      <PageHero
        eyebrow="Engineering"
        title="Technology you can feel"
        description="Decades of research distilled into proprietary innovations that power every Digie product."
        crumbs={[{ label: "Technology" }]}
      />

      <section className="container-px mx-auto max-w-7xl py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tech.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.title}
                className="group relative overflow-hidden rounded-3xl min-h-[360px] flex flex-col justify-end"
              >
                {/* Background image */}
                <img
                  src={t.image}
                  alt={t.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

                {/* Content */}
                <div className="relative z-10 p-7">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/20 backdrop-blur-sm border border-accent/30">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-white leading-snug">{t.title}</h3>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed line-clamp-2">
                    {t.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-14">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-ink p-12 text-center text-foreground">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl"
          />
          <h2 className="relative text-3xl font-semibold md:text-4xl">Experience it in person</h2>
          <p className="relative mx-auto mt-3 max-w-md text-muted-foreground">
            Find a Digie experience store or explore the full range online.
          </p>
          <Link to="/products" className="mt-6 inline-block">
            <Button variant="accent" size="lg">
              Explore products
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
