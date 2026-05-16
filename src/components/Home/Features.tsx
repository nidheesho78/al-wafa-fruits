"use client";


const features = [
  {
    icon: '🌱',
    title: 'Sustainably grown',
    desc: 'Partner orchards that respect soil, water and biodiversity — from root to fruit.',
  },
  {
    icon: '❄️',
    title: 'Cold-chain delivered',
    desc: 'Sub-24h logistics that preserve every drop of flavour, from harvest to your hands.',
  },
  {
    icon: '✦',
    title: 'Quality guaranteed',
    desc: 'If a piece isn\'t perfect, we replace it — no questions, no delays.',
  },
];

export default function Features() {
  return (
    <section className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Feature cards */}
        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-28">
          {features.map((f) => (
            <div
              key={f.title}
              className="group bg-[#f5f0e8] hover:bg-red-600 rounded-2xl sm:rounded-3xl p-8 sm:p-10 transition-colors duration-300 cursor-default"
            >
              <div className="w-14 h-14 bg-red-600 group-hover:bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl mb-6 transition-colors duration-300">
                <span>{f.icon}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-white mb-3 transition-colors duration-300">
                {f.title}
              </h3>
              <p className="text-slate-500 group-hover:text-white/80 text-sm sm:text-base leading-relaxed transition-colors duration-300">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Clients / Logos marquee */}
        {/* <div>
          <p className="text-red-600 text-xs font-bold tracking-widest uppercase mb-4 ">
            · Our Clients
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              Trusted by tables{' '}
              <span className="text-red-600">across the region.</span>
            </h2>
           
          </div> */}

          {/* Scrolling logos */}
          {/* <div className="border-t border-b border-stone-200 overflow-hidden py-5">
            <div className="flex gap-0 animate-clients whitespace-nowrap">
              {['Almond Kitchen', 'Pearl Hospitality', 'Ritz Carlton', 'FreshMart', 'Four Seasons', 'Green Leaf', 'Royal Plaza', 'Souq Fresh', 'Almond Kitchen', 'Pearl Hospitality', 'Ritz Carlton', 'FreshMart', 'Four Seasons', 'Green Leaf', 'Royal Plaza', 'Souq Fresh'].map(
                (name, i) => (
                  <span key={i} className="inline-flex items-center gap-6 px-8">
                    <span className="text-lg sm:text-xl font-bold text-slate-400 hover:text-slate-700 transition-colors cursor-default">
                      {name}
                    </span>
                    <span className="text-red-400">·</span>
                  </span>
                )
              )}
            </div>
          </div>
        </div> */}



        
      </div>

      <style jsx>{`
        @keyframes clients {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-clients {
          animation: clients 30s linear infinite;
          display: inline-flex;
          min-width: max-content;
        }
      `}</style>
    </section>
  );
}