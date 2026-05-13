'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    quote:
      'I sent a basket to my mother for Eid and she actually cried. Beautiful packaging, but more importantly — the fruit tasted like my childhood.',
    name: 'Sara Khalid',
    role: 'Loyal customer · Riyadh',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop&facepad=2',
    stars: 5,
  },
  {
    quote:
      'As a hotel chef, I need consistency above everything. Alwafafruits delivers on that promise every single morning. The mangoes alone are extraordinary.',
    name: 'Chef Ahmad Nasser',
    role: 'Executive Chef · Ritz Carlton Jeddah',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop&facepad=2',
    stars: 5,
  },
  {
    quote:
      'We switched our entire corporate gifting programme to Alwafafruits. Clients love it — it\'s personal, premium, and truly fresh.',
    name: 'Leila Al-Rashid',
    role: 'Procurement Director · Pearl Hospitality',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop&facepad=2',
    stars: 5,
  },
  {
    quote:
      'The cold-chain logistics are genuinely impressive. Produce arrives as if it was just picked — every time, no exceptions.',
    name: 'Mohammed Al-Farsi',
    role: 'Operations Manager · FreshMart Dubai',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop&facepad=2',
    stars: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const t = testimonials[current];

  return (
    <section className="bg-[#f5f0e8] py-16 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-red-600 text-xs font-bold tracking-widest uppercase mb-4 text-center">
          · Testimonials
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 text-center mb-10 sm:mb-14 leading-tight">
          Loved by people who{' '}
          <span className="text-red-600">love good fruit.</span>
        </h2>

        {/* Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-sm">
            {/* Stars + icon */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white text-lg font-bold">
                ❝
              </div>
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="text-amber-400 text-xl">★</span>
                ))}
              </div>
            </div>

            {/* Quote */}
            <blockquote className="text-slate-800 text-lg sm:text-xl md:text-2xl font-semibold leading-relaxed mb-8">
              "{t.quote}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-bold text-slate-900 text-sm sm:text-base">{t.name}</div>
                <div className="text-slate-400 text-xs sm:text-sm">{t.role}</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === current ? 'bg-red-600 w-8' : 'bg-stone-300 w-2'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow hover:shadow-md transition-shadow border border-stone-200"
                aria-label="Previous"
              >
                <ChevronLeft size={20} className="text-slate-600" />
              </button>
              <button
                onClick={next}
                className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow hover:shadow-md transition-shadow border border-stone-200"
                aria-label="Next"
              >
                <ChevronRight size={20} className="text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}