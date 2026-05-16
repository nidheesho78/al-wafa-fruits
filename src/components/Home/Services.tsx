import Image from "next/image";

const services = [
  {
    number: '01',
    title: 'Wholesale Supply',
    desc: 'Bulk fresh produce sourced from 25+ countries, delivered directly to hotels, supermarkets, and distributors.',
    image: "/sections/wholesale.png",
  },
  {
    number: '02',
    title: 'Cold-chain Logistics',
    desc: 'Sub-24h refrigerated delivery ensuring every item arrives at peak freshness, flavour, and food-safe temperature.',
    image: "/sections/cold-chain.png",
  },
  {
    number: '03',
    title: 'Gift Hampers',
    desc: 'Hand-curated premium fruit baskets for Eid, weddings, and corporate gifting — branded or bespoke.',
    image: "/sections/gift.png",
  },
];

export default function Services() {
  return (
    <section className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-red-600 text-xs font-bold tracking-widest uppercase mb-4">· Our Services</p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
            Built for <span className="text-red-600">scale,</span><br />
            crafted for care.
          </h2>
          <a
            href="/services"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-red-600 font-semibold text-sm transition-colors"
          >
            All services →
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((s) => (
            <div
              key={s.number}
              className="group relative bg-[#f5f0e8] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 sm:p-8">
                <span className="text-xs font-mono text-red-400 font-bold">{s.number}</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 mb-3">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-slate-900 font-bold text-sm group-hover:text-red-600 transition-colors">
                  <a href="/services">
                  Learn more <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}