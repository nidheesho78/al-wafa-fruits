import Image from "next/image";

const products = [
  {
    name: 'Berries & Exotics',
    tag: 'Seasonal',
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=800&auto=format&fit=crop',
    large: true,
  },
  {
    name: 'Mango',
    tag: 'Premium',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'Apples',
    tag: 'Year-round',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'Citrus',
    tag: 'Seasonal',
    image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'Grapes',
    tag: 'Premium',
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?q=80&w=600&auto=format&fit=crop',
  },
];

export default function Selection() {
  return (
    <section className="bg-[#f5f0e8] py-16 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900">
              The <span className="text-red-600">selection</span>
            </h2>
          </div>
         
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Large card */}
          <div className="col-span-2 lg:col-span-1 row-span-2 group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[480px] cursor-pointer">
            <img
              src={products[0].image}
              alt={products[0].name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wide">{products[0].tag}</span>
                <h3 className="text-white text-2xl sm:text-3xl font-black">{products[0].name}</h3>
              </div>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 font-bold text-lg">
                →
              </div>
            </div>
          </div>

          {/* Small cards */}
          {products.slice(1).map((p) => (
            <div
              key={p.name}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-square cursor-pointer"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wide">{p.tag}</span>
                <h3 className="text-white text-base sm:text-xl font-black">{p.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-slate-900 text-slate-900 font-bold rounded-full hover:bg-slate-900 hover:text-white transition-all text-sm sm:text-base"
          >
            View full catalogue →
          </a>
        </div>
      </div>
    </section>
  );
}