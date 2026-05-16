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
import {
  Truck,
  ShieldCheck,
  Gift,
  Globe,
  Clock,
  Leaf,
  BarChart3,
  HeartHandshake,
  ChevronRight,
  ArrowRight,
  Check,
} from 'lucide-react';
import PageBanner from '@/utils/PageBanner';
import AnimatedSection from '@/utils/AnimatedSection';
import Image from 'next/image';

/* ─── Animated Counter ─────────────────────────────────────────────────── */
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

/* ─── Marquee ──────────────────────────────────────────────────────────── */
function Marquee({ items }: { items: string[] }) {
  const repeated = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden bg-[#1a1a2e] py-4 select-none">
      <div className="flex whitespace-nowrap" style={{ animation: 'marquee-scroll 30s linear infinite' }}>
        {repeated.map((item, i) => (
          <span key={i} className="mx-5 text-white font-black text-sm uppercase tracking-[0.18em]">
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

const services = [
  {
    number: '01',
    icon: Globe,
    title: 'Wholesale Supply',
    tagline: 'Scale without compromise.',
    description:
      'Bulk fresh produce sourced directly from growers across 25+ countries, delivered to hotels, supermarkets, restaurants, and distributors across Dubai — every crate to the same uncompromising standard.',
    image: "/sections/wholesale.png",
    highlights: [
      'Minimum order flexibility — from 50kg to full truckloads',
      'Direct grower partnerships in 25+ countries',
      'Dedicated account manager for every client',
      'Weekly availability lists & custom sourcing on request',
    ],
    accent: '#e63946',
  },
  {
    number: '02',
    icon: Truck,
    title: 'Cold-chain Logistics',
    tagline: 'Flavour locked in, every time.',
    description:
      'Sub-24h temperature-controlled logistics from orchard gate to your floor. Our refrigerated fleet and humidity-managed storage ensure every item arrives at peak freshness, flavour, and food-safe temperature.',
    image: "/sections/cold-chain.png",
    highlights: [
      'Farm-to-door in under 24 hours',
      'Real-time temperature monitoring throughout transit',
      'Humidity-controlled storage at Dubai hub',
      'GPS-tracked refrigerated fleet',
    ],
    accent: '#e63946',
  },
  {
    number: '03',
    icon: Gift,
    title: 'Gift Hampers',
    tagline: 'A gift worth remembering.',
    description:
      'Hand-curated premium fruit baskets for Eid, weddings, and corporate gifting — branded or bespoke. Every hamper is assembled with the same care we give our wholesale crates: nothing leaves our floor unless it is perfect.',
    image: "/sections/gift.png",
    highlights: [
      'Fully branded packaging & custom ribbon',
      'Bespoke curation by fruit variety, origin, or theme',
      'Same-day & next-day delivery across Dubai',
      'Corporate bulk orders with volume discounts',
    ],
    accent: '#e63946',
  },
  {
    number: '04',
    icon: HeartHandshake,
    title: 'Corporate Catering Supply',
    tagline: 'Your kitchen, our produce.',
    description:
      'Standing supply agreements for hotels, five-star restaurants, and catering companies. Predictable schedules, agreed specifications, and a team that anticipates your needs — so your kitchen never misses a beat.',
    image: "/sections/catering.png",
    highlights: [
      'Fixed weekly supply schedules to your spec',
      'Flexible substitution protocols for seasonal gaps',
      'Invoicing & credit terms for established clients',
      'Dedicated chef liaison for menu-planning support',
    ],
    accent: '#e63946',
  },
];

const whyChoose = [
  { icon: ShieldCheck, title: 'Quality Guaranteed', desc: 'Every crate inspected at source, at our Dubai hub, and before last-mile. Imperfect produce never leaves our floor.' },
  { icon: Leaf,        title: 'Farm-Direct Sourcing', desc: 'Direct grower partnerships means shorter supply chains, better prices, and fruit that is actually ripe.' },
  { icon: Clock,       title: 'Sub-24h Standard', desc: 'Orchard to your door in under 24 hours. Not a target — the non-negotiable baseline for every single order.' },
  { icon: BarChart3,   title: 'Transparent Pricing', desc: 'Market-linked pricing updated weekly. No hidden charges, no surprises on invoice day.' },
];

const ticker = [
  'Wholesale Supply', 'Cold-chain', 'Gift Hampers', 'Corporate Catering',
  'Custom Sourcing', 'Farm-fresh', 'Sub-24h Delivery', 'Pesticide-free',
];

const processSteps = [
  { step: '01', title: 'Enquire', desc: 'Tell us what you need — volume, frequency, preferred varieties. We respond within 2 hours.' },
  { step: '02', title: 'We Source', desc: 'We match your spec to our grower network and confirm availability, origin, and price.' },
  { step: '03', title: 'Quality Check', desc: 'Every item inspected at our Dubai hub before it moves to packing or cold storage.' },
  { step: '04', title: 'Delivered', desc: 'Your order arrives cold, on time, and exactly as specified. Every time.' },
];

/* ═══════════════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════════════ */
export default function ServicesPage() {
  const [activeService, setActiveService] = useState(0);

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#f5f0e8' }}>

      {/* ── BANNER ─────────────────────────────────────────────────────── */}
      <PageBanner
        title="Our Services"
        subtitle="Built for scale, crafted for care."
        image="/banner/service-banner.png"
      />

      {/* ── INTRO — cream bg ────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#f5f0e8' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            <AnimatedSection animation="fadeInUp">
              <p className="text-red-600 font-black text-xs uppercase tracking-[0.25em] mb-3">
                · What We Offer
              </p>
              <h2
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-black leading-[1.05] tracking-tight"
                style={{ color: '#1a1a2e' }}
              >
                Every service built around{' '}
                <span className="text-red-600 italic">freshness.</span>
              </h2>
              <p className="mt-6 text-base md:text-lg leading-relaxed" style={{ color: '#4a4a5a' }}>
                From bulk wholesale to hand-curated gift hampers, every service we offer shares one
                foundation — produce that is fresher, more traceable, and more carefully handled
                than anything else on the market.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all duration-200 text-sm shadow-lg hover:shadow-red-600/30 hover:scale-105"
                >
                  Get a quote →
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-full border-2 transition-all duration-200 text-sm hover:scale-105"
                  style={{ borderColor: '#1a1a2e', color: '#1a1a2e', backgroundColor: 'transparent' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#1a1a2e';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#f5f0e8';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#1a1a2e';
                  }}
                >
                  About us
                </Link>
              </div>
            </AnimatedSection>

            {/* Service quick-select nav */}
            <AnimatedSection animation="slideRight" delay={150}>
              <div className="flex flex-col gap-3">
                {services.map((s, i) => (
                  <button
                    key={i}
                    // onClick={() => setActiveService(i)}

                    onClick={() => {
  setActiveService(i);
  const el = document.getElementById(`service-${i + 1}`);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}}
                    className="group flex items-center cursor-pointer gap-5 rounded-2xl px-6 py-5 text-left transition-all duration-300"
                    style={{
                      backgroundColor: activeService === i ? '#1a1a2e' : '#ffffff',
                      boxShadow: activeService === i ? '0 8px 32px rgba(26,26,46,0.18)' : 'none',
                    }}
                  >
                    <span
                      className="text-2xl font-black leading-none transition-colors duration-300"
                      style={{ color: activeService === i ? '#e63946' : '#d0c8bc' }}
                    >
                      {s.number}
                    </span>
                    <div className="flex-1">
                      <p
                        className="font-black text-base tracking-tight transition-colors duration-300"
                        style={{ color: activeService === i ? '#ffffff' : '#1a1a2e' }}
                      >
                        {s.title}
                      </p>
                      <p
                        className="text-xs mt-0.5 transition-colors duration-300"
                        style={{ color: activeService === i ? 'rgba(255,255,255,0.5)' : '#9a9aaa' }}
                      >
                        {s.tagline}
                      </p>
                    </div>
                    <ChevronRight
                      size={16}
                      className="transition-all duration-300"
                      style={{ color: activeService === i ? '#e63946' : '#d0c8bc', transform: activeService === i ? 'translateX(4px)' : 'none' }}
                    />
                  </button>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── SERVICES DETAIL — alternating layout ───────────────────────── */}
      {services.map((service, i) => {
        const Icon = service.icon;
        const isEven = i % 2 === 0;
        return (
          <section
            key={i}
            id={`service-${i + 1}`}
            className="py-20 md:py-28"
            style={{ backgroundColor: isEven ? '#ffffff' : '#f5f0e8' }}
          >
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
              <div
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  isEven ? '' : 'lg:grid-flow-col-dense'
                }`}
              >
                {/* Text side */}
                <AnimatedSection
                  animation={isEven ? 'slideLeft' : 'slideRight'}
                  className={isEven ? '' : 'lg:col-start-2'}
                >
                  <div className="space-y-6">
                    {/* Number + icon row */}
                    <div className="flex items-center gap-4">
                      <span
                        className="text-7xl font-black leading-none select-none"
                        style={{ color: 'rgba(230,57,70,0.12)' }}
                      >
                        {service.number}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center shadow-md shadow-red-600/20 flex-shrink-0">
                        <Icon size={22} className="text-white" strokeWidth={2} />
                      </div>
                    </div>

                    <div>
                      <p className="text-red-600 font-black text-xs uppercase tracking-[0.25em] mb-2">
                        · {service.tagline}
                      </p>
                      <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight"
                        style={{ color: '#1a1a2e' }}
                      >
                        {service.title}
                      </h2>
                    </div>

                    <p className="text-base md:text-lg leading-relaxed" style={{ color: '#5a5a6a' }}>
                      {service.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-3">
                      {service.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <div className="mt-1 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                            <Check size={11} className="text-white" strokeWidth={3} />
                          </div>
                          <span className="text-sm leading-relaxed" style={{ color: '#4a4a5a' }}>
                            {h}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all duration-200 text-sm shadow-lg hover:shadow-red-600/30 hover:scale-105"
                    >
                      Enquire about this service <ArrowRight size={15} />
                    </Link>
                  </div>
                </AnimatedSection>

                {/* Image side */}
                <AnimatedSection
                  animation={isEven ? 'slideRight' : 'slideLeft'}
                  delay={150}
                  className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}
                >
                  <div className="relative">
                    <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                    {/* Floating badge */}
                    <div
                      className="absolute -bottom-5 right-6 md:right-10 rounded-2xl px-5 py-4 shadow-xl"
                      style={{ backgroundColor: '#1a1a2e' }}
                    >
                      <p className="text-red-500 font-black text-xs uppercase tracking-[0.2em] mb-1">Service</p>
                      <p className="text-white font-black text-lg leading-none">{service.number}</p>
                      <p className="text-white/60 text-xs mt-0.5">of {services.length}</p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── MARQUEE ─────────────────────────────────────────────────────── */}
      <Marquee items={ticker} />

      {/* ── HOW IT WORKS — cream bg ──────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#f5f0e8' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <AnimatedSection animation="fadeInUp">
            <p className="text-red-600 font-black text-xs uppercase tracking-[0.25em] mb-3">
              · How It Works
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <h2
                className="text-4xl md:text-5xl font-black leading-tight tracking-tight"
                style={{ color: '#1a1a2e' }}
              >
                From enquiry to delivery,{' '}
                <span className="text-red-600">in four steps.</span>
              </h2>
             
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 relative">
            {/* Connecting line — desktop only */}
            <div
              className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-[2px]"
              style={{ background: 'linear-gradient(90deg, #e63946 0%, rgba(230,57,70,0.2) 100%)' }}
            />

            {processSteps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 100} animation="fadeInUp">
                <div className="relative flex flex-col items-center text-center px-6 py-2">
                  {/* Step circle */}
                  <div
                    className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-6 font-black text-2xl shadow-lg"
                    style={{
                      backgroundColor: i === 0 ? '#e63946' : '#ffffff',
                      color: i === 0 ? '#ffffff' : '#1a1a2e',
                      border: i === 0 ? 'none' : '2px solid #e8e0d6',
                    }}
                  >
                    {step.step}
                  </div>
                  <h3 className="text-lg font-black mb-3 tracking-tight" style={{ color: '#1a1a2e' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#7a7a8a' }}>
                    {step.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US — white bg ─────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <AnimatedSection animation="fadeInUp">
            <p className="text-red-600 font-black text-xs uppercase tracking-[0.25em] mb-3">
              · Why Alwafafruits
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
            {whyChoose.map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={i} delay={i * 100} animation="fadeInUp">
                  <div
                    className="group flex flex-col rounded-2xl p-7 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default"
                    style={{ backgroundColor: '#f5f0e8' }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shadow-md shadow-red-600/20">
                      <Icon size={22} className="text-white" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-black mb-2 tracking-tight" style={{ color: '#1a1a2e' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: '#6a6a7a' }}>
                      {item.desc}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATS — dark navy ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#1a1a2e' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-14">
              <p className="text-red-500 font-black text-xs uppercase tracking-[0.25em] mb-3">
                · The numbers
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                Trusted across Dubai
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { end: 50,  suffix: '+',  title: 'Wholesale Clients',   desc: 'Hotels, restaurants & grocers' },
              { end: 25,  suffix: '+',  title: 'Source Countries',    desc: 'Direct grower partnerships' },
              { end: 300, suffix: '+',  title: 'Premium Products',    desc: 'Seasonal & year-round varieties' },
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

      {/* ── TESTIMONIAL / TRUST — cream bg ──────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#f5f0e8' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-3 gap-5">

            {[
              {
                quote: "The cold-chain reliability alone is worth switching suppliers. We've had zero temperature complaints since we moved to Alwafafruits.",
                name: 'Executive Chef',
                company: 'Five-star hotel, Dubai Marina',
              },
              {
                quote: "Our Eid hamper order arrived branded, on time, and the produce inside was genuinely exceptional. Clients noticed.",
                name: 'Procurement Manager',
                company: 'Corporate gifting company, DIFC',
              },
              {
                quote: "They source varieties we couldn't get anywhere else in the region. The mango selection alone keeps us coming back.",
                name: 'Head Buyer',
                company: 'Premium grocery chain, UAE',
              },
            ].map((t, i) => (
              <AnimatedSection key={i} delay={i * 100} animation="fadeInUp">
                <div
                  className="rounded-2xl p-8 h-full flex flex-col"
                  style={{ backgroundColor: '#ffffff' }}
                >
                  <div className="text-red-600 text-4xl font-black leading-none mb-4">&ldquo;</div>
                  <p className="text-sm leading-relaxed flex-1 italic" style={{ color: '#4a4a5a' }}>
                    {t.quote}
                  </p>
                  <div className="mt-6 pt-5 border-t" style={{ borderColor: '#e8e0d6' }}>
                    <p className="text-sm font-black" style={{ color: '#1a1a2e' }}>{t.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#9a9aaa' }}>{t.company}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA — white bg ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <AnimatedSection animation="fadeInUp">
            <div
              className="relative rounded-3xl overflow-hidden p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl"
              style={{ backgroundColor: '#1a1a2e' }}
            >
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