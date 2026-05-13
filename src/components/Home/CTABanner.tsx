export default function CTABanner() {
  return (
    <section className="bg-[#f5f0e8] py-10 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-emerald-400 via-green-400 to-teal-500 rounded-2xl sm:rounded-3xl overflow-hidden px-8 sm:px-12 lg:px-16 py-12 sm:py-16">
          {/* decorative circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/10 rounded-full" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
            <div className="max-w-lg">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-2">
                Taste this{' '}
                <span className="text-red-600 italic">season</span>{' '}
                —<br className="hidden sm:block" />
                before it slips by.
              </h2>
              <p className="text-slate-800/70 text-sm sm:text-base mt-3">
                Limited seasonal varieties. Order now and we'll deliver within 24 hours.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-colors text-sm sm:text-base whitespace-nowrap shadow-lg hover:shadow-red-600/40 self-start sm:self-auto"
            >
              Start your order →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}