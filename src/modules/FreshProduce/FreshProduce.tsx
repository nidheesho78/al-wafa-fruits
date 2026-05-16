'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import {
  Leaf,
  Search,
  Globe,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Star,
  Filter,
  X,
} from 'lucide-react';
import PageBanner from '@/utils/PageBanner';
import AnimatedSection from '@/utils/AnimatedSection';
import Image from 'next/image';

/* ─── Types ─────────────────────────────────────────────────────────────── */
type Category = 'All' | 'Fruits' | 'Vegetables' | 'Exotic' | 'Seasonal';

interface Produce {
  id: number;
  name: string;
  category: Category | Category[];
  tagline: string;
  origins: string[];
  badge?: string;
  badgeColor?: string;
  image: string;
}

/* ─── Data ──────────────────────────────────────────────────────────────── */
const produceItems: Produce[] = [
  {
    id: 1,
    name: 'Alphonso Mangoes',
    category: ['Fruits', 'Seasonal', 'Exotic'],
    tagline: 'The king of mangoes. Fibre-free, honey-sweet, irreplaceable.',
    origins: ['IN', 'PK', 'PH'],
    badge: 'Premium',
    badgeColor: '#e63946',
    image: "/category/mango.png",
  },
  {
    id: 2,
    name: 'Red Apples',
    category: ['Fruits'],
    tagline: 'Crisp, sweet, year-round versatility.',
    origins: ['CN', 'NZ', 'CL'],
    badge: 'Year-round',
    badgeColor: '#2d6a4f',
    image: "/category/apple.png",
  },
  {
    id: 3,
    name: 'Navel Oranges',
    category: ['Fruits'],
    tagline: 'Seedless, juicy, intensely citrus.',
    origins: ['EG', 'ZA', 'ES'],
    badge: 'Seasonal',
    badgeColor: '#e98c16',
    image: "/category/orange.png",
  },
  {
    id: 4,
    name: 'Red Seedless Grapes',
    category: ['Fruits'],
    tagline: 'Plump, snappy skin, intensely sweet core.',
    origins: ['TR', 'IN', 'IT'],
    badge: 'Seasonal',
    badgeColor: '#e98c16',
    image: "/category/grapes.png",
  },
  {
    id: 5,
    name: 'Cavendish Bananas',
    category: ['Fruits'],
    tagline: 'Consistent sweetness, every bunch.',
    origins: ['EC', 'PH', 'LK'],
    badge: 'Year-round',
    badgeColor: '#2d6a4f',
    image: "/category/banana.png",
  },
  {
    id: 6,
    name: 'Watermelon',
    category: ['Fruits', 'Seasonal'],
    tagline: 'Crisp red flesh, minimal seeds, maximum hydration.',
    origins: ['AE', 'IR', 'JO'],
    badge: 'Seasonal',
    badgeColor: '#e98c16',
    image: "/category/watermelon.png",
  },
  {
    id: 7,
    name: 'Dragon Fruit',
    category: ['Fruits', 'Exotic'],
    tagline: 'Visually stunning. Subtly sweet. Extraordinary.',
    origins: ['VN', 'TH', 'MY'],
    badge: 'Exotic',
    badgeColor: '#9b5de5',
    image: "/category/dragonfruit.png",
  },
  {
    id: 8,
    name: 'Pomegranate',
    category: ['Fruits', 'Seasonal'],
    tagline: 'Jewel-like seeds bursting with antioxidants.',
    origins: ['IR', 'IN', 'ES'],
    badge: 'Seasonal',
    badgeColor: '#e98c16',
    image: "/category/pomegranate.png",
  },
  {
    id: 9,
    name: 'Pineapple',
    category: ['Fruits'],
    tagline: 'Tropical tang with a golden core.',
    origins: ['PH', 'CR', 'ZA'],
    badge: 'Year-round',
    badgeColor: '#2d6a4f',
    image: "/category/pineapple.png",
  },
  {
    id: 10,
    name: 'Kiwifruit',
    category: ['Fruits'],
    tagline: 'Tangy-sweet, packed with vitamin C.',
    origins: ['NZ', 'CL', 'TR'],
    badge: 'Year-round',
    badgeColor: '#2d6a4f',
    image: "/category/kiwi.png",
  },
  {
    id: 11,
    name: 'Strawberries',
    category: ['Fruits', 'Seasonal'],
    tagline: 'Sun-ripened berries, fragrant and sweet.',
    origins: ['US', 'ZA', 'ES'],
    badge: 'Seasonal',
    badgeColor: '#e98c16',
    image: "/category/strawberry.png",
  },
  {
    id: 12,
    name: 'Avocado',
    category: ['Fruits', 'Vegetables'],
    tagline: 'Creamy flesh, consistently ripe, chef-ready.',
    origins: ['MX', 'PE', 'KE'],
    badge: 'Year-round',
    badgeColor: '#2d6a4f',
    image: "/category/avocado.png",
  },
  {
    id: 13,
    name: 'Cherry Tomatoes',
    category: ['Vegetables'],
    tagline: 'Sweet, concentrated flavour in every bite.',
    origins: ['MA', 'TR', 'NL'],
    badge: 'Year-round',
    badgeColor: '#2d6a4f',
    image: "/category/cherry-tomatoes.png",
  },
  {
    id: 14,
    name: 'Bell Peppers',
    category: ['Vegetables'],
    tagline: 'Vivid colours, crisp texture, sweet flesh.',
    origins: ['NL', 'ES', 'MA'],
    badge: 'Year-round',
    badgeColor: '#2d6a4f',
    image: "/category/bell-peppers.png",
  },
  {
    id: 15,
    name: 'Broccoli',
    category: ['Vegetables'],
    tagline: 'Deep green heads, tight florets, nutrient-dense.',
    origins: ['ES', 'KE', 'CN'],
    badge: 'Seasonal',
    badgeColor: '#e98c16',
    image: "/category/broccoli.png",
  },
  {
    id: 16,
    name: 'Rambutan',
    category: ['Fruits', 'Exotic'],
    tagline: 'Lychee-like sweetness beneath a spiky shell.',
    origins: ['TH', 'MY', 'ID'],
    badge: 'Exotic',
    badgeColor: '#9b5de5',
    image: "/category/rambutan.png",
  },
  {
    id: 17,
    name: 'Dates (Medjool)',
    category: ['Fruits', 'Exotic'],
    tagline: 'The prince of dates — plump, caramel-rich, indulgent.',
    origins: ['SA', 'AE', 'JO'],
    badge: 'Premium',
    badgeColor: '#e63946',
    image: "/category/dates.png",
  },
  {
    id: 18,
    name: 'Cucumber',
    category: ['Vegetables'],
    tagline: 'Cool, crisp, and hydrating — from field to fridge fast.',
    origins: ['AE', 'IR', 'NL'],
    badge: 'Year-round',
    badgeColor: '#2d6a4f',
    image: "/category/cucumber.png",
  },
];

const categories: Category[] = ['All', 'Fruits', 'Vegetables', 'Exotic', 'Seasonal'];

const qualityPillars = [
  {
    icon: ShieldCheck,
    title: 'Triple Inspection',
    desc: 'Every item inspected at source, at our Dubai hub, and before last-mile dispatch. Zero compromise.',
  },
  {
    icon: Leaf,
    title: 'Farm-Direct',
    desc: 'Direct grower partnerships across 25+ countries. Shorter chains mean fresher produce and fairer prices.',
  },
  {
    icon: Globe,
    title: '25+ Origins',
    desc: 'Sourced from the world\'s best growing regions — matched to season, soil, and optimal ripeness windows.',
  },
  {
    icon: Star,
    title: 'Chef\'s Standard',
    desc: 'Our specifications are set by chefs from Dubai\'s five-star hotels. If it passes their bar, it passes ours.',
  },
];

const ticker = [
  'Farm-fresh', 'Pesticide-tested', 'Cold-chain', 'Hand-picked',
  'Single-origin', 'Sub-24h delivery', 'Certified', 'Seasonal selections',
];

/* ─── Animated Counter ─────────────────────────────────────────────────── */
function AnimatedCounter({ end, duration = 2.5, suffix = '+' }: { end: number; duration?: number; suffix?: string }) {
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

/* ─── Produce Card ─────────────────────────────────────────────────────── */
function ProduceCard({ item, index }: { item: Produce; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07, ease: 'easeOut' }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          style={{ transition: 'transform 0.7s ease' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge */}
        {item.badge && (
          <div
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-white font-black text-[10px] uppercase tracking-[0.18em]"
            style={{ backgroundColor: item.badgeColor }}
          >
            {item.badge}
          </div>
        )}

        {/* Hover CTA */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-colors"
          >
            Enquire <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-black text-base leading-tight mb-1" style={{ color: '#1a1a2e' }}>
          {item.name}
        </h3>
        <p className="text-xs leading-relaxed mb-3" style={{ color: '#7a7a8a' }}>
          {item.tagline}
        </p>

        {/* Origins */}
        <div className="flex items-center gap-2">
          <Globe size={11} style={{ color: '#9a9aaa' }} />
          <div className="flex gap-1.5">
            {item.origins.map((o) => (
              <span
                key={o}
                className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full"
                style={{ backgroundColor: '#f5f0e8', color: '#6a6a7a' }}
              >
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════════════ */
export default function FreshProducePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const filtered = useMemo(() => {
    return produceItems.filter((item) => {
      const cats = Array.isArray(item.category) ? item.category : [item.category];
      const matchCat = activeCategory === 'All' || cats.includes(activeCategory);
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#f5f0e8' }}>

      {/* ── BANNER ─────────────────────────────────────────────────────── */}
      <PageBanner
        title="Fresh Produce"
        subtitle="Farm-direct. Inspected three times. Delivered in under 24 hours."
        image="/banner/fresh-banner.png"
      />

      {/* ── INTRO ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#f5f0e8' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            <AnimatedSection animation="fadeInUp">
              <p className="text-red-600 font-black text-xs uppercase tracking-[0.25em] mb-3">
                · The Selection
              </p>
              <h2
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-black leading-[1.05] tracking-tight"
                style={{ color: '#1a1a2e' }}
              >
                A rotating cast of{' '}
                <span className="text-red-600 italic">seasonal favourites</span>{' '}
                and rare discoveries.
              </h2>
              <p className="mt-6 text-base md:text-lg leading-relaxed" style={{ color: '#4a4a5a' }}>
                Every week, something new. Our buyers travel the world's best growing regions so
                your menu never stands still. Premium fruits, vegetables, and exotic finds —
                sourced direct, inspected rigorously, delivered cold.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all duration-200 text-sm shadow-lg hover:shadow-red-600/30 hover:scale-105"
                >
                  Request availability list →
                </Link>
                <Link
                  href="/services"
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
                  Our services
                </Link>
              </div>
            </AnimatedSection>

            {/* Stats grid */}
            <AnimatedSection animation="slideRight" delay={150}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { end: 300, suffix: '+', label: 'Products', sub: 'Fruits, vegetables & exotics' },
                  { end: 25,  suffix: '+', label: 'Origins',  sub: 'Direct grower partnerships' },
                  { end: 24,  suffix: 'h', label: 'Sub-24h',  sub: 'From farm to your floor' },
                  { end: 52,  suffix: '+', label: 'Clients',  sub: 'Hotels, grocers & restaurants' },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-6 flex flex-col"
                    style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#1a1a2e' }}
                  >
                    <AnimatedCounter end={s.end} suffix={s.suffix} />
                    <p className="font-black text-sm mb-1" style={{ color: i % 2 === 0 ? '#1a1a2e' : '#ffffff' }}>
                      {s.label}
                    </p>
                    <p className="text-xs" style={{ color: i % 2 === 0 ? '#9a9aaa' : '#5a5a7a' }}>
                      {s.sub}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────────────────── */}
      <Marquee items={ticker} />

      {/* ── QUALITY PILLARS — white ─────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <AnimatedSection animation="fadeInUp">
            <p className="text-red-600 font-black text-xs uppercase tracking-[0.25em] mb-3">
              · Our Promise
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <h2
                className="text-4xl md:text-5xl font-black leading-tight tracking-tight"
                style={{ color: '#1a1a2e' }}
              >
                What makes our produce{' '}
                <span className="text-red-600">different.</span>
              </h2>
             
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {qualityPillars.map((item, i) => {
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

      {/* ── PRODUCE CATALOGUE ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#f5f0e8' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* Section header */}
          <AnimatedSection animation="fadeInUp">
            <p className="text-red-600 font-black text-xs uppercase tracking-[0.25em] mb-3">
              · Premium Quality
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <h2
                className="text-4xl md:text-5xl font-black leading-tight tracking-tight"
                style={{ color: '#1a1a2e' }}
              >
                The full selection.
              </h2>
             
            </div>
          </AnimatedSection>

          {/* Filter + search bar */}
          <AnimatedSection animation="fadeInUp" delay={80}>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">

              {/* Category pills */}
              <div className="flex flex-wrap gap-2 flex-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-5 py-2 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: activeCategory === cat ? '#e63946' : '#ffffff',
                      color: activeCategory === cat ? '#ffffff' : '#1a1a2e',
                      boxShadow: activeCategory === cat ? '0 4px 16px rgba(230,57,70,0.3)' : 'none',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div
                className="relative flex items-center rounded-full px-4 py-2 gap-2"
                style={{ backgroundColor: '#ffffff', minWidth: 220 }}
              >
                <Search size={15} style={{ color: '#9a9aaa' }} />
                <input
                  type="text"
                  placeholder="Search produce…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm outline-none flex-1"
                  style={{ color: '#1a1a2e' }}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')}>
                    <X size={13} style={{ color: '#9a9aaa' }} />
                  </button>
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* Results count */}
          <p className="text-xs font-black uppercase tracking-[0.2em] mb-6" style={{ color: '#9a9aaa' }}>
            {filtered.length} items
          </p>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
              >
                {filtered.map((item, i) => (
                  <ProduceCard key={item.id} item={item} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-2xl font-black mb-2" style={{ color: '#1a1a2e' }}>
                  Nothing found
                </p>
                <p className="text-sm" style={{ color: '#9a9aaa' }}>
                  Try a different search or category — or{' '}
                  <Link href="/contact" className="text-red-600 underline underline-offset-2">
                    contact us
                  </Link>{' '}
                  for custom sourcing.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── SOURCING FEATURE — dark bg ──────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#1a1a2e' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <AnimatedSection animation="slideLeft">
              <p className="text-red-500 font-black text-xs uppercase tracking-[0.25em] mb-3">
                · Custom Sourcing
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                Can't find what you need?{' '}
                <span className="text-red-500 italic">We'll source it.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed" style={{ color: '#8a8aaa' }}>
                Our buyer network covers 25+ countries. If a variety, origin, or specification
                isn't in our standard range, tell us — we'll find it, qualify it, and have it
                at your door within the week.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Specific variety or country of origin requests',
                  'Rare and heirloom varieties for fine-dining menus',
                  'Minimum-order flexibility from 10kg upward',
                  'Standing weekly orders with agreed specs',
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                      <ChevronRight size={11} className="text-white" strokeWidth={3} />
                    </div>
                    <span className="text-sm leading-relaxed" style={{ color: '#b0b0c8' }}>{pt}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all duration-200 text-sm shadow-lg hover:shadow-red-600/30 hover:scale-105"
              >
                Submit a sourcing request <ArrowRight size={15} />
              </Link>
            </AnimatedSection>

            {/* Image collage */}
            <AnimatedSection animation="slideRight" delay={150}>
              <div className="grid grid-cols-2 gap-3 relative">
                <div className="rounded-2xl overflow-hidden h-52 md:h-64">
                  <img
                    src="/sections/wholesale.png"
                    alt="Exotic fruits"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-52 md:h-64 mt-6">
                  <img
                    src="/sections/about-main.png"
                    alt="Fresh vegetables"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-52 md:h-64 -mt-6">
                  <img
                    src="/sections/gift.png"
                    alt="Premium produce"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-52 md:h-64">
                  <img
                    src="/sections/delivery.png"
                    alt="Fresh selection"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Floating badge */}
                <div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-2xl px-5 py-3 shadow-xl text-center whitespace-nowrap"
                  style={{ backgroundColor: '#e63946' }}
                >
                  <p className="text-white font-black text-sm">25+ source countries</p>
                  <p className="text-white/70 text-xs mt-0.5">Direct grower partnerships</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── SECOND MARQUEE (inverted) ───────────────────────────────────── */}
      <div className="overflow-hidden bg-red-600 py-4 select-none">
        <div className="flex whitespace-nowrap" style={{ animation: 'marquee-scroll-reverse 25s linear infinite' }}>
          {[...ticker, ...ticker, ...ticker].map((item, i) => (
            <span key={i} className="mx-5 text-white font-black text-sm uppercase tracking-[0.18em]">
              {item}
              <span className="ml-5 opacity-50">·</span>
            </span>
          ))}
        </div>
        <style jsx>{`
          @keyframes marquee-scroll-reverse {
            0%   { transform: translateX(-33.333%); }
            100% { transform: translateX(0); }
          }
        `}</style>
      </div>

      {/* ── CTA — white bg ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <AnimatedSection animation="fadeInUp">
            <div
              className="relative rounded-3xl overflow-hidden p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl"
              style={{ backgroundColor: '#1a1a2e' }}
            >
              <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 pointer-events-none" style={{ backgroundColor: '#dc2626' }} />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-5 pointer-events-none" style={{ backgroundColor: '#ffffff' }} />
              <div className="relative">
                <p className="text-red-500 font-black text-xs uppercase tracking-[0.25em] mb-3">
                  · Weekly Availability
                </p>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                  Want our weekly availability list?
                </h2>
                <p className="mt-3 text-base max-w-md leading-relaxed" style={{ color: '#8a8aaa' }}>
                  Every Monday we publish what's in season, what's arriving, and what's
                  exceptional that week. Get it straight to your inbox.
                </p>
              </div>
              <Link
                href="/contact"
                className="relative shrink-0 px-9 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-sm rounded-full hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-red-600/40 whitespace-nowrap"
              >
                Get the list →
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </main>
  );
}