import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Award } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { stats } from "@/lib/data";

import missionImg from "@/assets/missionnew.avif";
import visionImg from "@/assets/visionnew.avif";
import mukulImg from "@/assets/mukul sharma.png";
import journeyImg from "@/assets/journeydigie.png";

// Quality card background images — place these in @/assets/
import isoImg from "@/assets/iso-certified.avif";
import bisImg from "@/assets/bis-approve.jpg";
import energyImg from "@/assets/energystar.png";
import qaImg from "@/assets/quality testing.avif";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Digie" },
      {
        name: "description",
        content:
          "25 years of engineering premium electronics in India. Our story, mission, manufacturing and leadership.",
      },
    ],
  }),
  component: AboutPage,
});

const journeyParas = [
  "CANDID AUTOMATION makes a wide range of Consumer Electronics including LED TVs, Washing Machines, Air Coolers, Party Speakers & Small Appliances. DIGIE – DIGITAL INNOVATIONS is a young brand of Candid Automation, but an old hand at end-to-end manufacturing in Consumer Electronics.",
  "DIGIE uses materials & components sourced from the world's top suppliers to manufacture a wide range of Consumer Electronics at its 2 state-of-the-art facilities near India's capital in Ghaziabad, Uttar Pradesh. Each facility is fully equipped with end-to-end manufacturing capabilities and a dedicated research house for future developments.",
  "The beginning, in 2009, was exceptionally humble — a 200 sq. ft. warehouse in Ghaziabad's Hindon Vihar area, set up by Mr. Mukul Sharma, manufacturing LED TVs and taking them to retail stores in his own car. He is a visionary in design, deeply aware of technological advancements in the domain, an outstanding salesman, and everything else to the business.",
  "This indigenous drive of 25 years has today landed us in a position of unique strength — a combination of domain expertise and comprehensive back-end integration of manufacturing capabilities. Two things however haven't changed despite the massive change in scale of operation: our commitment to quality in each and every unit that bears our name, and the pride of being a thoroughly Indian manufacturing company.",
];

const qualityItems = [
  {
    title: "ISO 9001 Certified",
    desc: "Quality management across every facility and process.",
    img: isoImg,
  },
  {
    title: "BIS Approved",
    desc: "Compliant with Bureau of Indian Standards safety norms.",
    img: bisImg,
  },
  {
    title: "Energy Star",
    desc: "High efficiency ratings across the appliance range.",
    img: energyImg,
  },
  {
    title: "120-Point QA",
    desc: "Every unit individually tested before dispatch.",
    img: qaImg,
  },
];

const globalStyle = `
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-48px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeUpSm {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes statPop {
    0%   { opacity: 0; transform: scale(0.85) translateY(12px); }
    60%  { transform: scale(1.04) translateY(-2px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes barGrow {
    from { width: 0; }
    to   { width: 64px; }
  }

  .founder-img-wrap {
    animation: slideInLeft 0.85s cubic-bezier(0.22,1,0.36,1) both;
    animation-delay: 0.15s;
  }
  .founder-content {
    animation: fadeUpSm 0.75s cubic-bezier(0.22,1,0.36,1) both;
    animation-delay: 0.35s;
  }
  .founder-bar {
    display: block;
    height: 4px;
    border-radius: 2px;
    background: currentColor;
    animation: barGrow 0.6s cubic-bezier(0.22,1,0.36,1) both;
    animation-delay: 0.55s;
  }
  .founder-stat {
    opacity: 0;
    animation: statPop 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  .founder-stat:nth-child(1) { animation-delay: 0.65s; }
  .founder-stat:nth-child(2) { animation-delay: 0.80s; }
  .founder-stat:nth-child(3) { animation-delay: 0.95s; }
  .founder-stat:nth-child(4) { animation-delay: 1.10s; }

  .quality-card-img {
    transition: transform 0.65s cubic-bezier(0.22,1,0.36,1);
  }
  .quality-card:hover .quality-card-img {
    transform: scale(1.08);
  }
  .quality-card-overlay {
    transition: background 0.4s ease;
  }
  .quality-card:hover .quality-card-overlay {
    background: linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.15) 100%) !important;
  }
  .quality-card-body {
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
  }
  .quality-card:hover .quality-card-body {
    transform: translateY(-6px);
  }
`;

function AboutPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyle }} />

      <PageHero
        eyebrow="Our story"
        title="Engineering brilliance since 2001"
        description="From a single assembly line to one of India's most trusted electronics brands — built on craft, precision and care."
        crumbs={[{ label: "About" }]}
      />

      {/* ── STATS ── */}
      <section className="container-px mx-auto max-w-7xl py-14">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-3xl" />
                <p className="relative font-display text-4xl font-bold text-accent">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="relative mt-2 text-sm text-muted-foreground">{s.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="container-px mx-auto max-w-7xl py-6">
        <Stagger className="grid gap-6 md:grid-cols-2">
          <StaggerItem>
            <div
              className="group relative overflow-hidden rounded-3xl shadow-soft"
              style={{ minHeight: "320px" }}
            >
              <img
                src={missionImg}
                alt="Our Mission"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 transition-opacity duration-300 group-hover:from-black/90" />
              <div
                className="relative flex h-full flex-col justify-end p-8"
                style={{ minHeight: "320px" }}
              >
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/20 backdrop-blur-sm border border-accent/30 transition-colors duration-300 group-hover:bg-accent/35">
                  <Target className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-white">Our Mission</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  Bringing innovative technology within everyone's reach — creating reliable
                  solutions that simplify and enrich daily living across every Indian home.
                </p>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div
              className="group relative overflow-hidden rounded-3xl shadow-soft"
              style={{ minHeight: "320px" }}
            >
              <img
                src={visionImg}
                alt="Our Vision"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 transition-opacity duration-300 group-hover:from-black/90" />
              <div
                className="relative flex h-full flex-col justify-end p-8"
                style={{ minHeight: "320px" }}
              >
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/20 backdrop-blur-sm border border-accent/30 transition-colors duration-300 group-hover:bg-accent/35">
                  <Eye className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-white">Our Vision</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  To establish Digie as a globally recognized technology brand — delivering
                  innovative solutions that enrich lives worldwide through quality and purpose.
                </p>
              </div>
            </div>
          </StaggerItem>
        </Stagger>
      </section>

      {/* ── FOUNDER ── */}
      <section className="container-px mx-auto max-w-7xl py-14">
        <SectionHeading align="center" eyebrow="Leadership" title="The person behind Digie" />

        <Reveal>
          <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <div className="grid items-center lg:grid-cols-[520px_1fr]">
              <div className="founder-img-wrap relative min-h-[620px] bg-gradient-to-br from-accent/10 to-accent/5">
                <img
                  src={mukulImg}
                  alt="Mukul Sharma"
                  className="absolute bottom-0 left-0 h-full w-full object-contain object-left"
                />
              </div>

              <div className="founder-content p-8 lg:p-12">
                <span className="founder-bar mb-5 text-accent" />
                <h3 className="font-display text-4xl font-bold">Mukul Sharma</h3>
                <p className="mt-2 text-lg font-medium text-accent">Founder & Chairman</p>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  With a vision to make world-class electronics accessible to every Indian
                  household, Mukul Sharma founded Digie and transformed it into a trusted
                  electronics brand serving customers across India.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  His dedication to innovation, manufacturing excellence and customer satisfaction
                  continues to drive Digie's growth and success.
                </p>
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { value: "3M+", label: "Homes Powered" },
                    { value: "25+", label: "Years of Engineering" },
                    { value: "200+", label: "Showrooms" },
                    { value: "10+", label: "Awards & Recognition" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="founder-stat rounded-2xl bg-accent/10 p-5 text-center transition-colors duration-300 hover:bg-accent/20"
                    >
                      <p className="text-3xl font-bold text-accent">{stat.value}</p>
                      <p className="mt-1 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── OUR JOURNEY ── */}
      <section className="container-px mx-auto max-w-7xl py-6 pb-14">
        <SectionHeading align="center" eyebrow="Our Journey" title="Built from the ground up" />

        {/* Journey image — auto height so nothing is cropped */}
        <Reveal>
          <div className="mt-10 overflow-hidden rounded-3xl shadow-soft">
            <img src={journeyImg} alt="Digie journey" className="h-auto w-full object-contain" />
          </div>
        </Reveal>

        <div className="mt-8 space-y-6">
          {journeyParas.map((para, i) => (
            <Reveal key={i}>
              <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-3xl" />
                <div className="relative flex gap-5">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent transition-colors duration-300 group-hover:bg-accent/30">
                    {i + 1}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{para}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── QUALITY & MANUFACTURING ── */}
      <section className="container-px mx-auto max-w-7xl py-6 pb-14">
        <SectionHeading
          align="center"
          eyebrow="Quality & manufacturing"
          title="Made with precision, certified for trust"
        />

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {qualityItems.map((item) => (
            <StaggerItem key={item.title}>
              <div
                className="quality-card group relative overflow-hidden rounded-3xl shadow-soft"
                style={{ minHeight: "260px" }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="quality-card-img absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="quality-card-overlay absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.40) 55%, rgba(0,0,0,0.10) 100%)",
                  }}
                />
                <div
                  className="quality-card-body relative flex h-full flex-col justify-end p-6"
                  style={{ minHeight: "260px" }}
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 backdrop-blur-sm border border-accent/30 transition-colors duration-300 group-hover:bg-accent/40">
                    <Award className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-white">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-white/75">{item.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}
