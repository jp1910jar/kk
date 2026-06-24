import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy, FileText, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";

import warrantyImg from "@/assets/warranty.jpg";
import troubleshootingImg from "@/assets/troubleshooting.jpg";
import liveSupportImg from "@/assets/livesupport.avif";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support — Digie" },
      {
        name: "description",
        content:
          "Digie help centre: warranty, downloads, troubleshooting and customer care across 400+ service centres.",
      },
    ],
  }),
  component: SupportPage,
});

const cards = [
  {
    icon: LifeBuoy,
    title: "Warranty Claims",
    description:
      "Register and track your warranty claims in minutes. Our team processes requests quickly so you're never left waiting.",
    image: warrantyImg,
  },
  {
    icon: FileText,
    title: "Troubleshooting",
    description:
      "Step-by-step guides to resolve common issues quickly. Find fixes for your product without ever needing to call us.",
    image: troubleshootingImg,
  },
  {
    icon: MessageCircle,
    title: "Live Support",
    description:
      "Chat or call +91-84477 44522, seven days a week. Our experts are always ready to help you get back on track.",
    image: liveSupportImg,
  },
];

function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Help centre"
        title="We're here to help"
        description="Find answers, download manuals and reach our support team — anytime."
        crumbs={[{ label: "Support" }]}
      />

      <section className="container-px mx-auto max-w-7xl py-14">
        <div className="grid gap-6 sm:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-3xl min-h-[360px] flex flex-col justify-end"
              >
                {/* Background image */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

                {/* Content */}
                <div className="relative z-10 p-7">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/20 backdrop-blur-sm border border-accent/30">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-white leading-snug">{card.title}</h3>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed line-clamp-2">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-px mx-auto max-w-3xl pb-14">
        <h2 className="text-center font-display text-3xl font-semibold">Common questions</h2>
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`s-${i}`}
              className="mb-3 rounded-2xl border border-border bg-card px-5 shadow-soft"
            >
              <AccordionTrigger className="text-left font-display font-medium hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
