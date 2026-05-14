"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative bg-[#1A1A2E] text-white overflow-hidden font-sans">
      {/* Grain Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top Red Accent Line */}
      <div className="h-[3px] bg-[#e63946] w-full" />

      {/* Main Content */}
      <div className="w-full mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-8 relative z-10">
        {/* Brand + Tagline */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 pb-14 border-b border-white/10 mb-14">
          {/* Logo & Brand */}
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 flex-shrink-0">
              <Image
                src="/alwafa.png"
                alt="Al Wafa Fruits"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold tracking-tighter leading-none">
                alwafa<span className="text-[#e63946]">fruits</span>
              </div>
             
            </div>
          </div>

          {/* Tagline */}
          <p className="text-base md:text-lg leading-relaxed text-white/60 max-w-md lg:text-right">
            Curating the world's finest fruits with care, integrity, and uncompromising quality — 
            delivered fresh from farm to your table.
          </p>
        </div>

        {/* Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 pb-16">
          {/* Column 1: Company */}
          <div>
            <h4 className="uppercase text-[#e63946] text-xs lg:text-lg tracking-[3px] font-semibold mb-8">
              Company
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Services', href: '/services' },
                { label: 'Fresh Produce', href: '/fresh' },
                { label: 'Contact Us', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-200 text-[15px]"
                  >
                    <span className="block w-4 h-px bg-[#e63946] group-hover:w-6 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: What We Do */}
          <div>
            <h4 className="uppercase text-[#e63946] text-xs lg:text-lg tracking-[3px] font-semibold mb-8">
              What We Do
            </h4>
            <ul className="space-y-4">
              {[
                'Wholesale Supply',
                'Cold-chain Logistics',
                'Gift Hampers',
                'Corporate Gifting',
                'Custom Sourcing',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-white/70 text-[15px]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e63946]/60 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="uppercase text-[#e63946] text-xs lg:text-lg tracking-[3px] font-semibold mb-8">
              Contact Us
            </h4>

            <div className="space-y-8">
              {/* Office */}
              <div>
                <p className="uppercase text-xs tracking-widest text-white/40 mb-2">Office</p>
                <p className="text-white/70 leading-relaxed">
                  Citadel Tower, Business Bay<br />
                  Plot No.62, Office 2105-E-505<br />
                  Dubai, United Arab Emirates
                </p>
              </div>

              {/* Phone */}
              <div>
                <p className="uppercase text-xs tracking-widest text-white/40 mb-3">Call</p>
                <div className="space-y-1.5">
                  <a
                    href="tel:+971526995266"
                    className="block text-white/70 hover:text-white transition-colors"
                  >
                    +971 52 699 5266
                  </a>
                  <a
                    href="tel:+971553316210"
                    className="block text-white/70 hover:text-white transition-colors"
                  >
                    +971 55 331 6210
                  </a>
                </div>
              </div>

              {/* Email */}
              <div>
                <p className="uppercase text-xs tracking-widest text-white/40 mb-2">Email</p>
                <a
                  href="mailto:hello@alwafafruits.com"
                  className="text-white/70 hover:text-[#e63946] transition-colors"
                >
                  hello@alwafafruits.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-white/30">
          <p>© {new Date().getFullYear()} Rooh Al Wafa Trading L.L.C. All Rights Reserved.</p>
         
        </div>
      </div>
    </footer>
  );
}