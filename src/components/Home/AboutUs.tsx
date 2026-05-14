import Image from "next/image";

export default function Philosophy() {
  return (
    <section className="bg-[#f5f0e8] py-16 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left text */}
          <div>
            <p className="text-red-600 text-xs font-bold tracking-widest uppercase mb-4">
              · Our Philosophy
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
              We treat fruit<br />
              like{' '}
              <span className="text-red-600 italic">heirlooms.</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              Each variety has a story — a soil, a climate, a family that has tended it for generations.
              We don't just deliver fruit; we carry that story intact from source to your door,
              preserving every nuance of flavour along the way.
            </p>
            <a
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 hover:bg-slate-700 text-white font-bold rounded-full transition-colors text-sm sm:text-base"
            >
              Learn our story →
            </a>
          </div>

          {/* Right image mosaic */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-2xl overflow-hidden aspect-[3/4] col-span-1">
              <img
                src="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=800&auto=format&fit=crop"
                alt="Orchard fruit on tree"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="rounded-2xl overflow-hidden aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=600&auto=format&fit=crop"
                  alt="Farmer harvesting"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* <div className="rounded-2xl overflow-hidden aspect-square bg-emerald-600 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <div className="text-4xl sm:text-5xl font-black mb-1">2+</div>
                  <div className="text-sm font-semibold opacity-80">Years of<br />excellence</div>
                </div>
              </div> */}


              <div className="rounded-2xl overflow-hidden aspect-square relative flex items-center justify-center">
  {/* Background image */}
  <img
    src="https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?q=80&w=600&auto=format&fit=crop"
    alt=""
    aria-hidden="true"
    className="absolute inset-0 w-full h-full object-cover"
  />
  {/* Dark green overlay */}
  <div className="absolute inset-0 bg-emerald-900/70" />
  {/* Text */}
  <div className="relative text-center text-white p-4 z-10">
    <div className="text-4xl sm:text-5xl font-black mb-1">2+</div>
    <div className="text-sm font-semibold opacity-80">
      Years of<br />excellence
    </div>
  </div>
</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}