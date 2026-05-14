'use client';

const stats = [
  { value: '90,000m²', label: 'Cold storage' },
  { value: '2+', label: 'Years of legacy' },
  { value: '300+', label: 'Premium products' },
  { value: '25', label: 'Countries sourced' },
];

const tickerItems = [
  'Certified',
  'Single-origin',
  'Seasonal',
  'Pesticide-free',
  'Delivered within 24h',
  'Farm-fresh',
  'Cold-chain',
  'Hand-picked',
];

export default function StatsAndTicker() {
  return (
    <section className="bg-[#f5f0e8]">
      {/* Stats row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-red-600 leading-none mb-2">
                {s.value}
              </div>
              <div className="text-sm sm:text-base text-slate-500 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Ticker / Marquee */}
      <div className="border-y border-stone-200 bg-[#f5f0e8] overflow-hidden py-4">
        <div className="flex gap-0 animate-marquee whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-6">
              <span className="text-xl sm:text-2xl font-bold text-slate-900">{item}</span>
              <span className="text-red-500 text-xl">·</span>
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 22s linear infinite;
          display: inline-flex;
          min-width: max-content;
        }
      `}</style>
    </section>
  );
}