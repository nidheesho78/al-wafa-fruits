

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import Sidebar from './SideMenu';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Fresh', path: '/fresh' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        } ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
          <div className="flex justify-between items-center">

            {/* Logo — using width/height like reference (no fill + relative wrapper) */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logoo.png"
                alt="Al Wafa Fruits Logo"
                width={200}
                height={200}
                className="object-cover w-[120px] h-[60px] sm:w-[160px] sm:h-[80px]"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 lg:gap-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;

                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`relative text-sm lg:text-lg font-medium transition-colors cursor-pointer group
                      ${isScrolled ? 'text-slate-700' : 'text-white/90'}
                      ${isActive ? (isScrolled ? 'text-slate-900' : 'text-white') : ''}`}
                  >
                    {link.name}

                    {/* Active + Hover Underline */}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2.5px] bg-[#e63946] transition-all duration-300
                        ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    />
                  </Link>
                );
              })}

              <Link
                href="/contact"
                className="ml-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-full transition-all active:scale-95 cursor-pointer"
              >
                Get in touch
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`md:hidden p-2 ${isScrolled ? 'text-slate-900' : 'text-white'} cursor-pointer`}
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}