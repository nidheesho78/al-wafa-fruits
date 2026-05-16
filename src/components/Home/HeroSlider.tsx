'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const slides = [
  {
    badge: '⟡ Cold-chain · Sub-24h',
    title: 'From orchard\nto doorstep,\nwithin hours.',
    description:
      'Temperature-controlled logistics across 25 countries — flavour locked in, freshness never compromised.',
    image:
      "/banner/home-one.png",
    overlay: 'from-black/70 via-black/40 to-transparent',
  },
  {
    badge: '★ Since 2023', 
    title: 'Leading the way\nin fresh produce\nexcellence.',
    description:
      'Experience the pinnacle of freshness, rooted in tradition. From our orchards to your table, naturally preserved with care.',
    image:
      "/banner/home-two.png",
    overlay: 'from-black/70 via-black/40 to-transparent',
  },
  {
    badge: '⟡ Premium · Gift-ready',
    title: 'Gifts that taste\nas good\nas they look.',
    description:
      'Hand-arranged baskets for weddings, Eid, corporate gifting — every detail considered, every fruit perfect.',
    image:
       "/banner/home-three.png",
    overlay: 'from-black/70 via-black/40 to-transparent',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % slides.length), 7000);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 600);
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  const slide = slides[current];

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Images */}
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={s.image}
            alt=""
            className="w-full h-full object-cover"
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${s.overlay}`} />
          {/* Green tint overlay to match brand */}
          <div className="absolute inset-0 bg-emerald-900/20" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-20">
          <div className="max-w-2xl">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-500 bg-white/20 backdrop-blur-md text-white border border-white/30 ${
                animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}
            >
              {slide.badge}
            </div>

            {/* Heading */}
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6 transition-all duration-500 whitespace-pre-line ${
                animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
              style={{ transitionDelay: '50ms' }}
            >
              {slide.title}
            </h1>

            {/* Description */}
            <p
              className={`text-white/80 text-base sm:text-lg md:text-xl max-w-md mb-10 transition-all duration-500 ${
                animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              {slide.description}
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-wrap gap-3 sm:gap-4 transition-all duration-500 ${
                animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
              style={{ transitionDelay: '150ms' }}
            >
              <a
                href="/services"
                className="px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full flex items-center gap-2 transition-all text-sm sm:text-base shadow-lg hover:shadow-red-600/40"
              >
                Explore services <span>→</span>
              </a>
              <a
                href="/about"
                className="px-7 py-3.5 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-semibold rounded-full border border-white/40 transition-all text-sm sm:text-base"
              >
                Our story
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Prev / Next Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current ? 'bg-red-500 w-10' : 'bg-white/50 w-2.5 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

     
    </section>
  );
}