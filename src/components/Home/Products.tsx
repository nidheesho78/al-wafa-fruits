

"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const products = [
  {
    name: "Berries & Exotics",
    tag: "Seasonal",
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=1200&auto=format&fit=crop",
    large: true,
    description:
      "A vibrant medley of hand-picked seasonal berries and rare exotic fruits sourced from tropical groves and alpine meadows. Bursting with antioxidants, natural sugars, and extraordinary flavour — each variety picked at peak ripeness.",
    gallery: [
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596591868231-05e808fd131d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1200&auto=format&fit=crop",
    ],
    highlights: ["Rich in Antioxidants", "Hand-Picked", "Exotic Varieties", "Peak Ripeness"],
    origin: "Tropical & Alpine Regions",
    season: "March – September",
    color: "#e8f5e0",
    accent: "#3d7a3a",
  },
  {
    name: "Mango",
    tag: "Premium",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1200&auto=format&fit=crop",
    large: false,
    description:
      "The undisputed king of tropical fruits. Tree-ripened to perfection, delivering an intensely sweet, aromatic experience with buttery, fibre-free flesh that simply melts on the tongue.",
    gallery: [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519096845289-95806ee03a1a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544631099-5f149e60e39e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1628689469838-524a4a973b8e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582655299221-2b6bff351df0?q=80&w=1200&auto=format&fit=crop",
    ],
    highlights: ["Tree-Ripened", "Fibre-Free", "Intensely Sweet", "Aromatic"],
    origin: "South Asia & Latin America",
    season: "April – August",
    color: "#fff5e0",
    accent: "#b86e00",
  },
  {
    name: "Apples",
    tag: "Year-round",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=1200&auto=format&fit=crop",
    large: false,
    description:
      "Crisp, refreshing, and endlessly versatile. From tart Granny Smith to honeyed Fuji — grown in high-altitude orchards for maximum crunch and flavour depth.",
    gallery: [
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506459225024-1428097a7e18?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1628689469838-524a4a973b8e?q=80&w=1200&auto=format&fit=crop",
    ],
    highlights: ["Multiple Varieties", "High-Altitude Grown", "Crisp Texture", "Heirloom Options"],
    origin: "Himalayan Orchards & New Zealand",
    season: "Available Year-Round",
    color: "#fce8e8",
    accent: "#b03030",
  },
  {
    name: "Citrus",
    tag: "Seasonal",
    image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=1200&auto=format&fit=crop",
    large: false,
    description:
      "Sun-drenched and zesty. Navel oranges, blood oranges, Meyer lemons, limes, and pomelos — delivering bright vitamin-C with complex bitter-sweet notes.",
    gallery: [
      "https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521993327471-eb4f384f5c7d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587735243475-37a7082f3db9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576179635662-9d1983e97e1e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560806175-b641a1c81b39?q=80&w=1200&auto=format&fit=crop",
    ],
    highlights: ["Vitamin C Rich", "Sun-Drenched", "Multiple Varieties", "Cold-Press Grade"],
    origin: "Mediterranean & California",
    season: "November – April",
    color: "#fff3e0",
    accent: "#c45c00",
  },
  {
    name: "Grapes",
    tag: "Premium",
    image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?q=80&w=1200&auto=format&fit=crop",
    large: false,
    description:
      "Plump, jewel-toned clusters of premium table grapes. From seedless Thompsons to deep Muscat blacks — grown in sun-soaked vineyards for that satisfying pop of natural sweetness.",
    gallery: [
      "https://images.unsplash.com/photo-1596363505818-4cabc3b2d3f1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1623227775764-1a2e12c3c99b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1474878384523-552cd6e9fd7b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=1200&auto=format&fit=crop",
    ],
    highlights: ["Seedless Options", "Vineyard Grown", "Jewel Tones", "Natural Sweetness"],
    origin: "Nashik & Chilean Vineyards",
    season: "June – October",
    color: "#f0e8f8",
    accent: "#6b3fa0",
  },
];

type Product = (typeof products)[number];

/* ─────────────────────────────────────────────
   MODAL
───────────────────────────────────────────── */
function Modal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [activeImg, setActiveImg] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [visible, setVisible] = useState(false);

  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(() => onCloseRef.current(), 260);
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [handleClose]);

  const changeImg = (i: number) => { setImgLoaded(false); setActiveImg(i); };
  const prev = () => changeImg((activeImg - 1 + product.gallery.length) % product.gallery.length);
  const next = () => changeImg((activeImg + 1) % product.gallery.length);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: "rgba(8,8,8,0.80)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          opacity: visible ? 1 : 0,
        }}
        onClick={handleClose}
      />

      {/* Modal panel */}
      <div
        className="relative z-10 w-full sm:max-w-4xl flex flex-col lg:flex-row rounded-t-3xl sm:rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: "#fff",
          maxHeight: "92dvh",
          boxShadow: "0 32px 80px rgba(0,0,0,0.45)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
        }}
      >
        {/* ── LEFT: GALLERY ── */}
        <div className="lg:w-[55%] flex flex-col shrink-0" style={{ background: "#111" }}>

          {/* Hero image — fixed aspect on mobile, fills height on desktop */}
          <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:flex-1 overflow-hidden">
            {/* Skeleton */}
            {!imgLoaded && (
              <div className="absolute inset-0 animate-pulse" style={{ background: "#222" }} />
            )}

            <img
              key={activeImg}
              src={product.gallery[activeImg]}
              alt={`${product.name} ${activeImg + 1}`}
              onLoad={() => setImgLoaded(true)}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
              style={{ opacity: imgLoaded ? 1 : 0 }}
            />

            {/* Gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }}
            />

            {/* Close — top right of image */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </button>

            {/* Prev / Next */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-colors"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", backdropFilter: "blur(4px)" }}
            >‹</button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-colors"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", backdropFilter: "blur(4px)" }}
            >›</button>

            {/* Counter */}
            <div
              className="absolute bottom-3 right-3 text-white text-[10px] font-medium rounded-full px-2.5 py-1"
              style={{ background: "rgba(0,0,0,0.5)", letterSpacing: "0.06em" }}
            >
              {activeImg + 1} / {product.gallery.length}
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {product.gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => changeImg(i)}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: i === activeImg ? 18 : 5,
                    height: 5,
                    background: i === activeImg ? "#fff" : "rgba(255,255,255,0.35)",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div
            className="flex gap-2 p-2.5 overflow-x-auto shrink-0"
            style={{ background: "#0d0d0d", scrollbarWidth: "none" }}
          >
            {product.gallery.map((src, i) => (
              <button
                key={i}
                onClick={() => changeImg(i)}
                className="shrink-0 rounded-lg overflow-hidden transition-all duration-200"
                style={{
                  width: 60,
                  height: 44,
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  outline: i === activeImg ? `2px solid ${product.accent}` : "2px solid transparent",
                  outlineOffset: 2,
                  opacity: i === activeImg ? 1 : 0.45,
                  transform: i === activeImg ? "scale(1.06)" : "scale(1)",
                }}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ── RIGHT: DETAILS ── */}
        <div className="lg:flex-1 flex flex-col overflow-y-auto" style={{ background: "#fafaf8" }}>
          {/* Accent bar */}
          <div className="h-1 shrink-0" style={{ background: product.accent }} />

          <div className="flex flex-col gap-5 p-6 lg:p-7">
            {/* Tag + Title */}
            <div>
              <span
                className="inline-block text-[10px] font-bold uppercase rounded-full px-3 py-1"
                style={{
                  letterSpacing: "2px",
                  background: product.color,
                  color: product.accent,
                  border: `1px solid ${product.accent}25`,
                }}
              >
                {product.tag}
              </span>
              <h2
                className="mt-2.5 text-2xl font-bold leading-tight text-gray-900"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.01em" }}
              >
                {product.name}
              </h2>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>

            <hr className="border-gray-100" />

            {/* Highlights */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[2px] text-gray-400 mb-2.5">
                Highlights
              </p>
              <div className="flex flex-wrap gap-2">
                {product.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg"
                    style={{ background: product.color, color: product.accent, border: `1px solid ${product.accent}18` }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Origin & Season */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Origin", value: product.origin },
                { label: "Season", value: product.season },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl p-3.5" style={{ background: "#f0ede8", border: "1px solid #e4e0da" }}>
                  <p className="text-[9px] font-bold uppercase tracking-[2px] text-gray-400 mb-1">{label}</p>
                  <p className="text-xs font-semibold text-gray-800 leading-snug">{value}</p>
                </div>
              ))}
            </div>

            {/* Natural badge */}
            <div
              className="flex items-center gap-3 rounded-xl p-3.5"
              style={{ background: product.color, border: `1px solid ${product.accent}18` }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0"
                style={{ background: product.accent }}
              >
                🌿
              </div>
              <p className="text-xs leading-snug" style={{ color: product.accent }}>
                <strong>100% naturally grown.</strong> No artificial ripening agents or post-harvest chemical treatments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────────── */
function ProductCard({ product, large, onClick }: { product: Product; large: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden rounded-2xl cursor-pointer select-none ${
        large
          ? "col-span-2 lg:col-span-1 lg:row-span-2 aspect-[4/3] lg:aspect-auto lg:min-h-[480px]"
          : "col-span-1 aspect-square"
      }`}
      style={{ boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.2)" : "0 2px 12px rgba(0,0,0,0.1)", transition: "box-shadow 350ms ease" }}
    >
      <img
        src={product.image}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
        style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
      />

      {/* Gradient */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-400"
        style={{
          background: hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.60) 0%, transparent 55%)",
        }}
      />

      {/* Hover pill */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <span
          className="text-[10px] font-bold uppercase px-4 py-2 rounded-full"
          style={{
            background: "rgba(255,255,255,0.9)",
            color: "#111",
            letterSpacing: "2px",
            backdropFilter: "blur(4px)",
          }}
        >
          {large ? "Explore Gallery" : "View"}
        </span>
      </div>

      {/* Label */}
      <div className={`absolute bottom-0 left-0 right-0 ${large ? "p-5 sm:p-6" : "p-4"}`}>
        <span
          className="inline-block text-[9px] font-bold uppercase rounded-full px-2.5 py-0.5 mb-1.5"
          style={{ letterSpacing: "2px", background: "rgba(110,231,160,0.18)", color: "#6ee7a0", border: "1px solid rgba(110,231,160,0.3)" }}
        >
          {product.tag}
        </span>
        <h3
          className={`text-white font-bold leading-tight ${large ? "text-2xl sm:text-3xl" : "text-base sm:text-lg"}`}
          style={{ fontFamily: "'Playfair Display', Georgia, serif", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
        >
          {product.name}
        </h3>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION
───────────────────────────────────────────── */
export default function Selection() {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@400;500;600&display=swap');`}</style>

      <section
        className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
        style={{ background: "#f4f0e6", fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        {/* Dot texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(160,140,95,0.22) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-14">
            <div>
             
              <h2
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-none tracking-tight text-gray-900"
               
              >
                The{" "}
                <em className="not-italic font-bold text-red-600" style={{  fontStyle: "italic" }}>
                  Selection
                </em>
              </h2>
            </div>
           
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {products.map((p) => (
              <ProductCard key={p.name} product={p} large={p.large} onClick={() => setSelected(p)} />
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-10 flex justify-center">
            <a
              href="/fresh"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-[#f4f0e6] transition-colors duration-200"
            >
              Browse full catalogue →
            </a>
          </div>
        </div>
      </section>

      {selected && <Modal product={selected} onClose={() => setSelected(null)} />}
    </>
  );
}