

'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  useInView,
} from 'framer-motion';
import { Leaf, Truck, ShieldCheck, Globe, Star, Clock, Lightbulb, UserCheck } from 'lucide-react';
import PageBanner from '@/utils/PageBanner';
import AnimatedSection from '@/utils/AnimatedSection';
import Image from 'next/image';

/* ─── Animated Counter (exact pattern from your project) ─────────────── */
function AnimatedCounter({
  end,
  duration = 2.5,
  suffix = '+',
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (isInView) {
      const c = animate(count, end, { duration, ease: 'easeOut' });
      return () => c.stop();
    }
  }, [isInView, end, duration, count]);

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-black text-red-600 leading-none mb-3">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </div>
  );
}

/* ─── Marquee ticker (matches home StatsAndTicker) ────────────────────── */
function Marquee({ items }: { items: string[] }) {
  const repeated = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden bg-[#1a1a2e] py-4 select-none">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: 'marquee-scroll 30s linear infinite',
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="mx-5 text-white font-black text-sm uppercase tracking-[0.18em]"
          >
            {item}
            <span className="ml-5 text-red-600">·</span>
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════════ */
const coreValues = [
  {
    icon: Star,
    title: 'Premium Quality',
    description:
      'Every crate inspected at source, at our Dubai hub, and before last-mile delivery. If it is not perfect, it does not leave our floor.',
  },
  {
    icon: Leaf,
    title: 'Farm-Fresh Sourcing',
    description:
      'Direct grower partnerships across 15+ countries. Tree-ripened, never artificially rushed — freshness is never faked.',
  },
  {
    icon: Truck,
    title: 'Sub-24h Cold Chain',
    description:
      'Temperature-controlled logistics from orchard to your door. Flavour locked in, every single delivery.',
  },
  {
    icon: UserCheck,
    title: 'Client-First Service',
    description:
      'Custom schedules, flexible volumes, transparent pricing. A team that picks up the phone and gets it done.',
  },
];

const principles = [
  {
    icon: ShieldCheck,
    title: 'Our Mission',
    description:
      "To supply Dubai's homes, hotels, and restaurants with the world's finest produce — delivered with integrity, speed, and zero compromise on freshness.",
  },
  {
    icon: Globe,
    title: 'Our Vision',
    description:
      "To become the UAE's most trusted wholesale produce partner, setting the regional benchmark for quality, traceability, and cold-chain excellence.",
  },
  {
    icon: Lightbulb,
    title: 'Our Approach',
    description:
      'We combine global sourcing relationships with local logistics expertise — giving every client the freshness of a specialist and the reliability of a partner.',
  },
  {
    icon: Clock,
    title: 'Our Promise',
    description:
      'Punctuality is non-negotiable. Every order fulfilled on time, every delivery meeting the same premium standard, regardless of size.',
  },
];

const stats = [
  { end: 2,   suffix: ' yrs', label: 'In Operation',          desc: 'Founded & growing in Dubai' },
  { end: 50,  suffix: '+',    label: 'Wholesale Clients',      desc: 'Hotels, restaurants & retailers' },
  { end: 15,  suffix: '+',    label: 'Source Countries',       desc: 'Direct grower partnerships' },
  { end: 24,  suffix: 'h',    label: 'Farm-to-Door',           desc: 'Cold chain delivery standard' },
];

const timeline = [
  { year: '2023', text: 'Company founded in Dubai — first wholesale deliveries to local restaurants and grocery outlets across the city.' },
  { year: '2023', text: 'Cold-chain logistics infrastructure established. Sub-24h farm-to-door delivery becomes our baseline standard.' },
  { year: '2024', text: 'Exclusive sourcing partnerships formed with growers across Egypt, Lebanon, India, and Southeast Asia.' },
  { year: '2024', text: 'Hotel and five-star catering supply contracts secured across Dubai.' },
  { year: '2025', text: '50+ wholesale clients. Household delivery programme launched. Still obsessing over every single piece of produce.' },
];

const ticker = [
  'Farm-fresh', 'Cold-chain', 'Hand-picked', 'Certified',
  'Single-origin', 'Seasonal', 'Pesticide-free', 'Delivered within 24h',
];

/* ═══════════════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const whoRef = useRef<HTMLElement>(null);
  const isWhoInView = useInView(whoRef as React.RefObject<Element>, { once: true, margin: '-50px' });

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#f5f0e8' }}>

      {/* ── BANNER ─────────────────────────────────────────────────────── */}
      <PageBanner
        title="About Us"
        subtitle="Dubai's freshest wholesale produce partner."
        image="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1920&auto=format&fit=crop"
      />

      {/* ── WHO WE ARE ─────────────────────────────────────────────────── */}
      {/* Cream background, matches home Philosophy section */}
      <section
        ref={whoRef}
        className="py-20 md:py-28"
        style={{ backgroundColor: '#f5f0e8' }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Text block */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isWhoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="space-y-5"
            >
              {/* Label — matches "· OUR PHILOSOPHY" from home */}
              <p className="text-red-600 font-black text-xs uppercase tracking-[0.25em]">
                · About Alwafafruits
              </p>

              <h2
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-black leading-[1.05] tracking-tight"
                style={{ color: '#1a1a2e' }}
              >
                We treat produce like{' '}
                <span className="text-red-600 italic">heirlooms.</span>
              </h2>

              <div className="space-y-4" style={{ color: '#4a4a5a' }}>
                <p className="text-base md:text-lg leading-relaxed font-semibold" style={{ color: '#1a1a2e' }}>
                  Alwafafruits is a Dubai-based wholesale distributor of premium
                  fresh fruits and vegetables, founded in 2023.
                </p>
                <p className="text-base leading-relaxed">
                  Each variety has a story — a soil, a climate, a farm that
                  has tended it for generations. We don&apos;t just deliver produce;
                  we carry that story intact from source to your door, preserving
                  every note of flavour.
                </p>
                <p className="text-base leading-relaxed">
                  In just two years we&apos;ve built direct grower partnerships across
                  25+ countries, a cold-chain network delivering farm-to-floor in
                  under 24 hours, and a reputation in Dubai as the wholesale
                  partner that never lets quality slip.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all duration-200 text-sm shadow-lg hover:shadow-red-600/30 hover:scale-105"
                >
                  Explore services →
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-full border-2 transition-all duration-200 text-sm hover:scale-105"
                  style={{
                    borderColor: '#1a1a2e',
                    color: '#1a1a2e',
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#1a1a2e';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#f5f0e8';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#1a1a2e';
                  }}
                >
                  Get in touch
                </Link>
              </div>
            </motion.div>

            {/* Image block — matches home Philosophy image layout */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isWhoInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              className="relative"
            >
              {/* Main image */}
              <div className="relative h-[420px] md:h-[500px] lg:h-[540px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1400&auto=format&fit=crop"
                  alt="Fresh wholesale produce"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Floating quote card — same rounded card style as home */}
              <div
                className="absolute -bottom-6 -left-4 md:left-6 right-4 md:right-auto md:w-72 rounded-2xl p-5 shadow-xl"
                style={{ backgroundColor: '#ffffff' }}
              >
                <div className="text-red-600 text-3xl font-black leading-none mb-2">&ldquo;</div>
                <p className="text-sm font-bold italic leading-snug" style={{ color: '#1a1a2e' }}>
                  We never put anything on a truck we wouldn&apos;t serve at
                  our own family table.
                </p>
                <p className="mt-3 text-xs uppercase tracking-widest" style={{ color: '#9a9aaa' }}>
                  — Founder, Alwafafruits Dubai
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS — cream bg, large red numbers (matches home StatsAndTicker) */}
      <section className="py-16 md:py-20" style={{ backgroundColor: '#f5f0e8' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-b"
            style={{ borderColor: '#d8d0c4' }}>
            {stats.map((s, i) => (
              <AnimatedSection
                key={i}
                delay={i * 100}
                animation="fadeInUp"
                className="py-10 px-6 text-center border-r last:border-r-0"
                style={{ borderColor: '#d8d0c4' } as React.CSSProperties}
              >
                <AnimatedCounter end={s.end} suffix={s.suffix} />
                <p className="text-base font-black" style={{ color: '#1a1a2e' }}>{s.label}</p>
                <p className="mt-1 text-xs" style={{ color: '#7a7a8a' }}>{s.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER — matches home marquee exactly ──────────────────────── */}
      <Marquee items={ticker} />

      {/* ── CORE VALUES — white bg, same card style as home Features ───── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <AnimatedSection animation="fadeInUp">
            <p className="text-red-600 font-black text-xs uppercase tracking-[0.25em] mb-3">
              · What drives us
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <h2
                className="text-4xl md:text-5xl font-black leading-tight tracking-tight"
                style={{ color: '#1a1a2e' }}
              >
                Built for <span className="text-red-600">scale,</span>
                <br />crafted for care.
              </h2>
              
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {coreValues.map((v, i) => (
              <AnimatedSection key={i} delay={i * 100} animation="fadeInUp">
                <div
                  className="group flex flex-col rounded-2xl p-7 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default"
                  style={{ backgroundColor: '#f5f0e8' }}
                >
                  {/* Icon — matches home feature icon style */}
                  <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shadow-md shadow-red-600/20">
                    <v.icon size={22} className="text-white" strokeWidth={2} />
                  </div>
                  <h3
                    className="text-lg font-black mb-2 tracking-tight"
                    style={{ color: '#1a1a2e' }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: '#6a6a7a' }}>
                    {v.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO STRIP + QUOTE — cream bg ─────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#f5f0e8' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-5 gap-5 items-stretch">

            {/* Large image */}
            <AnimatedSection animation="slideLeft" className="md:col-span-3 h-[340px] md:h-auto">
              <div className="h-full min-h-[300px] rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1400&auto=format&fit=crop"
                  alt="Sorting premium produce"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </AnimatedSection>

            {/* Right column */}
            <div className="md:col-span-2 flex flex-col gap-5">
              <AnimatedSection animation="slideRight" delay={100} className="flex-1">
                <div className="h-[160px] md:h-full rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=800&auto=format&fit=crop"
                    alt="Fresh fruits"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </AnimatedSection>

              {/* Stat card — matches home floating card style */}
              <AnimatedSection animation="slideRight" delay={200}>
                <div className="bg-white rounded-2xl p-7 shadow-lg">
                  <p className="text-red-600 font-black text-xs uppercase tracking-[0.2em] mb-4">
                    · Our Standard
                  </p>
                  <div className="flex flex-col gap-3">
                    {[
                      { label: 'Sustainably grown',   desc: 'Partner orchards that respect soil & biodiversity' },
                      { label: 'Cold-chain delivered', desc: 'Sub-24h logistics — flavour locked in' },
                      { label: 'Quality guaranteed',   desc: 'If a piece isn\'t perfect, we replace it — no questions' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-red-600 shrink-0" />
                        <div>
                          <p className="text-sm font-black" style={{ color: '#1a1a2e' }}>{item.label}</p>
                          <p className="text-xs mt-0.5" style={{ color: '#8a8a9a' }}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES — white bg, same 2-col card grid as home ─────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <AnimatedSection animation="fadeInUp">
            <p className="text-red-600 font-black text-xs uppercase tracking-[0.25em] mb-3">
              · How we operate
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <h2
                className="text-4xl md:text-5xl font-black leading-tight tracking-tight"
                style={{ color: '#1a1a2e' }}
              >
                Trusted by tables{' '}
                <span className="text-red-600">across the region.</span>
              </h2>
              
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <AnimatedSection key={i} delay={i * 100} animation="fadeInUp">
                  <div
                    className="group flex gap-6 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                    style={{ backgroundColor: '#f5f0e8' }}
                  >
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-md shadow-red-600/20">
                      <Icon size={22} className="text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black mb-2 tracking-tight" style={{ color: '#1a1a2e' }}>
                        {p.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#6a6a7a' }}>
                        {p.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── OUR STORY TIMELINE — cream bg ──────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#f5f0e8' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">

            {/* Sticky left heading */}
            <AnimatedSection animation="slideLeft" className="lg:sticky lg:top-28">
              <p className="text-red-600 font-black text-xs uppercase tracking-[0.25em] mb-3">
                · Our Story
              </p>
              <h2
                className="text-4xl md:text-5xl font-black leading-tight tracking-tight"
                style={{ color: '#1a1a2e' }}
              >
                Seventeen seasons,{' '}
                <span className="text-red-600 italic">one obsession.</span>
              </h2>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-10 h-[3px] bg-red-600 rounded-full" />
                <div className="w-3 h-[3px] bg-red-300 rounded-full" />
              </div>
              <p className="mt-6 text-base leading-relaxed" style={{ color: '#6a6a7a' }}>
                From a single dream in Dubai to serving the emirate&apos;s finest
                kitchens and homes — here is how we got here.
              </p>
            </AnimatedSection>

            {/* Timeline */}
            <div>
              {timeline.map((item, i) => (
                <AnimatedSection key={i} delay={i * 80} animation="slideRight">
                  <div
                    className="group flex items-start gap-8 py-7 border-b transition-colors duration-200 hover:pl-2"
                    style={{ borderColor: '#d8d0c4' }}
                  >
                    <span
                      className="min-w-[72px] text-3xl font-black leading-none pt-1 transition-colors duration-300 group-hover:text-red-600"
                      style={{ color: '#c8c0b4' }}
                    >
                      {item.year}
                    </span>
                    <p className="text-base leading-relaxed" style={{ color: '#4a4a5a' }}>
                      {item.text}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US — dark navy bg, matches home dark sections ────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#1a1a2e' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-14">
              <p className="text-red-500 font-black text-xs uppercase tracking-[0.25em] mb-3">
                · The numbers speak
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                Why choose Alwafafruits
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { end: 50,  suffix: '+',  title: 'Wholesale Clients',   desc: 'Hotels, restaurants & grocers' },
              { end: 25,  suffix: '+',  title: 'Source Countries',    desc: 'Direct grower partnerships' },
              { end: 100, suffix: '%',  title: 'Client Satisfaction', desc: 'Zero compromise on quality' },
              { end: 24,  suffix: 'h',  title: 'Delivery Standard',   desc: 'Cold-chain, every order' },
            ].map((s, i) => (
              <AnimatedSection key={i} delay={i * 100} animation="fadeInUp">
                <div
                  className="flex flex-col items-center text-center p-7 rounded-2xl transition-all duration-300 hover:scale-105 cursor-default"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.10)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)')}
                >
                  <AnimatedCounter end={s.end} suffix={s.suffix} />
                  <p className="text-base font-black text-white mb-1">{s.title}</p>
                  <p className="text-xs" style={{ color: '#8a8aaa' }}>{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA — matches home CTA/contact card style ──────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <AnimatedSection animation="fadeInUp">
            <div
              className="relative rounded-3xl overflow-hidden p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl"
              style={{ backgroundColor: '#1a1a2e' }}
            >
              {/* Background texture shapes */}
              <div
                className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 pointer-events-none"
                style={{ backgroundColor: '#dc2626' }}
              />
              <div
                className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-5 pointer-events-none"
                style={{ backgroundColor: '#ffffff' }}
              />

               <div className="relative">
                <p className="text-red-500 font-black text-xs uppercase tracking-[0.25em] mb-3">
                  · Get Started Today
                </p>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                  Ready to source smarter?
                </h2>
                <p className="mt-3 text-base max-w-md leading-relaxed" style={{ color: '#8a8aaa' }}>
                  Talk to our team about wholesale supply, cold-chain logistics, corporate
                  gifting, or a custom sourcing arrangement built around your operation.
                </p>
              </div>

              <Link
                href="/contact"
                className="relative shrink-0 px-9 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-sm rounded-full hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-red-600/40 whitespace-nowrap"
              >
                Get in touch →
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </main>
  );
}