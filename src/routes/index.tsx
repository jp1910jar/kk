import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Headphones,
  Cpu,
  Factory,
  BadgeCheck,
  Layers,
  Wrench,
} from "lucide-react";
import digieBanner1 from "@/assets/digie-banner-1.jpg";
import digieBanner2 from "@/assets/digie-banner-2.jpg";
import digieBanner3 from "@/assets/digie-banner-3.jpg";

// Why choose Digie images
import promiseImg from "@/assets/promise.avif";
import freeInstallImg from "@/assets/freeinstallation.avif";
import alwaysImg from "@/assets/always.avif";
import smartImg from "@/assets/smartbydesign.avif";

// Manufacturing process images
import designStudioImg from "@/assets/designstudio.avif";
import precisionBuildImg from "@/assets/precisionbuild.webp";
import qualityImg from "@/assets/quality testing.avif";
import lifetimeImg from "@/assets/lifetime.avif";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/SectionHeading";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { categories, products, reviews, faqs, stats } from "@/lib/data";

export const Route = createFileRoute("/")({
  component: Home,
});

const heroSlides = [digieBanner1, digieBanner2, digieBanner3];

const whyUs = [
  {
    icon: ShieldCheck,
    title: "2-Year Promise",
    description: "Every product backed by comprehensive warranty and transferable coverage.",
    image: promiseImg,
  },
  {
    icon: Truck,
    title: "Free Installation",
    description: "Doorstep delivery with complimentary expert installation across India.",
    image: freeInstallImg,
  },
  {
    icon: Headphones,
    title: "Always-On Support",
    description: "400+ service centres and a support team that answers in minutes.",
    image: alwaysImg,
  },
  {
    icon: Cpu,
    title: "Smart by Design",
    description: "Connected appliances with OTA updates and intuitive app control.",
    image: smartImg,
  },
];

const process = [
  {
    icon: Layers,
    step: "01",
    title: "Design Studio",
    text: "Industrial designers sculpt each product for form, balance and feel.",
    image: designStudioImg,
  },
  {
    icon: Factory,
    step: "02",
    title: "Precision Build",
    text: "Robotic assembly lines hold tolerances within fractions of a millimetre.",
    image: precisionBuildImg,
  },
  {
    icon: BadgeCheck,
    step: "03",
    title: "120-Point QA",
    text: "Every unit runs a rigorous quality gauntlet before it ships.",
    image: qualityImg,
  },
  {
    icon: Wrench,
    step: "04",
    title: "Lifetime Care",
    text: "Serviceable, repairable and supported long after the sale.",
    image: lifetimeImg,
  },
];

function Home() {
  const featuredCats = categories.slice(0, 5);
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 4);

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container-px mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          {/* Left — text content */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-6 text-5xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl md:text-7xl"
            >
              Brilliance,
              <br />
              <span className="text-gradient-accent">in every home.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground"
            >
              Premium TVs, audio and home appliances — engineered in India with twenty-five years of
              obsessive craft. Designed to be seen, built to last.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link to="/products">
                <Button variant="accent" size="xl">
                  Shop the range <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/technology">
                <Button variant="outline" size="xl">
                  Explore technology
                </Button>
              </Link>
            </motion.div>
            <div className="mt-12 grid max-w-md grid-cols-3 gap-6">
              {stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl font-bold text-foreground">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative w-full"
          >
            <div className="absolute inset-0 -z-10 rounded-[3rem] bg-accent-gradient opacity-20 blur-3xl" />

            <div className="relative w-full overflow-hidden rounded-[2.5rem] shadow-elevated">
              {/* Invisible placeholder — forces container to match image natural height */}
              <img
                src={heroSlides[0]}
                alt=""
                aria-hidden="true"
                className="w-full opacity-0 pointer-events-none select-none"
              />

              {/* All slides stacked on top */}
              {heroSlides.map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt={`Digie banner ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: i === activeSlide ? 1 : 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
              ))}

              {/* Dot indicators */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-10">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeSlide ? "w-6 bg-accent" : "w-2 bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Prev arrow */}
              <button
                onClick={() =>
                  setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
                aria-label="Previous slide"
              >
                ‹
              </button>

              {/* Next arrow */}
              <button
                onClick={() => setActiveSlide((prev) => (prev + 1) % heroSlides.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
                aria-label="Next slide"
              >
                ›
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="container-px mx-auto max-w-7xl py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Shop by category"
            title="Built for every room"
            description="From cinema-grade displays to whisper-quiet appliances, explore the full Digie collection."
          />
          <Link to="/categories">
            <Button variant="link">
              View all categories <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="mt-10 grid auto-rows-[1fr] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <CategoryCard category={featuredCats[0]} large />
          {featuredCats.slice(1).map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container-px mx-auto max-w-7xl py-12">
        <SectionHeading
          eyebrow="Curated for you"
          title="Featured products"
          description="Our designers' picks — the products that define what Digie stands for."
        />
        <div className="mt-10 grid grid-cols-4 gap-5">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE DIGIE */}
      <section className="container-px mx-auto max-w-7xl py-20">
        <SectionHeading
          align="center"
          eyebrow="The Digie difference"
          title="Why choose Digie"
          description="More than electronics — a promise of design, durability and service that stays with you."
        />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((f) => (
            <StaggerItem key={f.title}>
              <div
                className="group relative overflow-hidden rounded-3xl shadow-soft"
                style={{ minHeight: "280px" }}
              >
                <img
                  src={f.image}
                  alt={f.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                <div
                  className="relative flex h-full flex-col justify-end p-6"
                  style={{ minHeight: "280px" }}
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 backdrop-blur-sm">
                    <f.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/75">{f.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* TECHNOLOGY SHOWCASE */}
      <section className="bg-ink py-24 text-background">
        <div className="container-px mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Engineering
            </span>
            <h2 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">
              Technology you can feel, not just read about.
            </h2>
            <p className="mt-5 max-w-md text-background/70">
              From our QuantumColour panels to AI-driven energy optimisation, every Digie product
              carries proprietary technology refined across decades.
            </p>
            <div className="mt-8 space-y-4">
              {[
                "QuantumColour HDR for true-to-life cinema",
                "Adaptive AI power management saves up to 40% energy",
                "Acoustic-tuned chambers engineered with audiophiles",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-background/85">{t}</span>
                </div>
              ))}
            </div>
            <Link to="/technology" className="mt-8 inline-block">
              <Button variant="accent" size="lg">
                Discover the tech <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-3xl border border-background/10 bg-background/5 p-7"
                >
                  <p className="font-display text-4xl font-bold text-accent">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-background/70">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="container-px mx-auto max-w-7xl py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Loved by India" title="Best sellers" />
          <Link to="/products">
            <Button variant="link">
              Shop all <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-4 gap-5">
          {bestSellers.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* MANUFACTURING PROCESS */}
      <section className="container-px mx-auto max-w-7xl py-12">
        <SectionHeading
          align="center"
          eyebrow="How it's made"
          title="From sketch to your home"
          description="A four-stage journey obsessed with detail at every step."
        />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {process.map((p) => (
            <StaggerItem key={p.step}>
              <div
                className="group relative overflow-hidden rounded-3xl shadow-soft"
                style={{ minHeight: "320px" }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div
                  className="relative flex h-full flex-col justify-between p-6"
                  style={{ minHeight: "320px" }}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-display text-5xl font-bold text-white/20">{p.step}</span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 backdrop-blur-sm">
                      <p.icon className="h-5 w-5 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/75">{p.text}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* REVIEWS */}
      <section className="container-px mx-auto max-w-7xl py-12">
        <SectionHeading eyebrow="Customer stories" title="Trusted in millions of homes" />
        <Stagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <StaggerItem key={r.name} className="h-full">
              <TestimonialCard {...r} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* FAQ */}
      <section className="container-px mx-auto max-w-3xl py-20">
        <SectionHeading align="center" eyebrow="Good to know" title="Frequently asked questions" />
        <Reveal>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="mb-3 rounded-2xl border border-border bg-card px-5 shadow-soft"
              >
                <AccordionTrigger className="text-left font-display text-base font-medium hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>
    </>
  );
}
