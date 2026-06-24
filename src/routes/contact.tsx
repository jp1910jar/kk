import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Phone, Mail, MapPin } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Background Images
import callUsBg from "@/assets/callus.avif";
import emailBg from "@/assets/email.avif";
import addressBg from "@/assets/address.avif";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Digie" },
      {
        name: "description",
        content:
          "Get in touch with Digie. Call, email or visit us. Our experts respond within minutes.",
      },
    ],
  }),
  component: ContactPage,
});

const cards = [
  {
    icon: Phone,
    title: "Call us",
    value: "+91-84477 44522",
    description: "Speak directly with our support team",
    bgImage: callUsBg,
  },
  {
    icon: Mail,
    title: "Email",
    value: "info.digitalinnovations22@gmail.com",
    description: "We reply within a few hours",
    bgImage: emailBg,
  },
  {
    icon: MapPin,
    title: "Head office",
    value: "A-1/380 Swadeshi Compound, Sector 17, Ghaziabad 201001",
    description: "Come visit us in person",
    bgImage: addressBg,
  },
];

function ContactPage() {
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    setSending(true);

    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! We'll be in touch shortly.");
    }, 800);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk"
        description="Whether it's a product question or after-sales help, we're one message away."
        crumbs={[{ label: "Contact" }]}
      />

      {/* Contact Cards */}
      <section className="container-px mx-auto max-w-7xl py-14">
        <div className="grid gap-6 sm:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="group relative overflow-hidden rounded-3xl border border-border shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${c.bgImage})`,
                }}
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/60" />

              {/* Accent Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Content */}
              <div className="relative z-10 p-8 text-white">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/25">
                  <c.icon className="h-6 w-6 text-white" />
                </div>

                <p className="mt-5 text-sm font-medium uppercase tracking-wide text-white/80">
                  {c.title}
                </p>

                <p className="mt-2 font-display text-lg font-semibold leading-snug break-words text-white">
                  {c.value}
                </p>

                <p className="mt-2 text-sm text-white/75">
                  {c.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="container-px mx-auto max-w-7xl pb-14">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact Form */}
          <form
            onSubmit={submit}
            className="rounded-3xl border border-border bg-card p-8 shadow-soft"
          >
            <h2 className="font-display text-2xl font-semibold">
              Send a message
            </h2>

            <div className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="mb-1.5 block">Name</Label>
                  <Input
                    required
                    placeholder="Your name"
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <Label className="mb-1.5 block">Email</Label>
                  <Input
                    required
                    type="email"
                    placeholder="you@email.com"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label className="mb-1.5 block">Subject</Label>
                <Input
                  required
                  placeholder="How can we help?"
                  className="rounded-xl"
                />
              </div>

              <div>
                <Label className="mb-1.5 block">Message</Label>
                <Textarea
                  required
                  rows={5}
                  placeholder="Your message"
                  className="rounded-xl"
                />
              </div>

              <Button
                variant="accent"
                size="lg"
                className="w-full"
                disabled={sending}
              >
                {sending ? "Sending..." : "Send message"}
              </Button>
            </div>
          </form>

          {/* Google Map */}
          <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
            <iframe
              title="Digie HQ Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.234567890123!2d77.4321!3d28.6789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sA-1%2F380+Swadeshi+Compound+Sector+17+Kavinagar+Industrial+Area+Ghaziabad!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{
                minHeight: "400px",
                border: 0,
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}