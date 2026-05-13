'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface PageBannerProps {
  title: string;
  subtitle?: string;
  image?: string;
}

const labelMap: Record<string, string> = {
  about: 'About Us',
  services: 'Services',
  freshness: 'Freshness',
  contact: 'Contact',
  products: 'Products',
};

export default function PageBanner({ title, subtitle, image }: PageBannerProps) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const crumbs = [
    { label: 'Home', href: '/' },
    ...segments.map((seg, i) => ({
      label: labelMap[seg] ?? seg.charAt(0).toUpperCase() + seg.slice(1),
      href: '/' + segments.slice(0, i + 1).join('/'),
    })),
  ];

  const bgImage =
    image ||
    'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1920&auto=format&fit=crop';

  return (
    <section
      className="relative w-full flex items-end overflow-hidden"
      style={{ height: '400px' }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt={title}
          className="w-full h-full object-cover object-center scale-105"
          style={{ filter: 'brightness(0.45)' }}
        />
        {/* Strong bottom gradient so text is always legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-14">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-4 flex-wrap">
          {crumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-2">
              {i < crumbs.length - 1 ? (
                <>
                  <Link
                    href={crumb.href}
                    className="text-white/55 hover:text-white transition-colors text-xs font-semibold uppercase tracking-[0.15em]"
                  >
                    {crumb.label}
                  </Link>
                  <span className="text-white/30 text-xs">›</span>
                </>
              ) : (
                <span className="text-red-500 text-xs font-semibold uppercase tracking-[0.15em]">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.0] tracking-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-white/60 text-base md:text-lg max-w-lg leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Red accent underline — same style as home section labels */}
        <div className="mt-5 flex items-center gap-3">
          <div className="w-10 h-[3px] bg-red-600 rounded-full" />
          <div className="w-3 h-[3px] bg-red-400/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}