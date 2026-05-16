'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface NavLink {
  name: string;
  path: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

export default function Sidebar({ isOpen, onClose, navLinks }: SidebarProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sidebar Panel - White */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full z-[70] md:hidden flex flex-col"
            style={{
              width: 'min(320px, 88vw)',
              background: '#ffffff',
              boxShadow: '12px 0 40px rgba(0,0,0,0.15)',
            }}
          >
            {/* Red Accent Line */}
            <div className="h-[3px] bg-[#e63946] w-full" />

            {/* Header */}
            <div className="px-6 py-6 flex justify-between items-center border-b border-gray-100">
              <Link href="/" onClick={onClose} className="flex items-center gap-3">
                <div className="relative w-11 h-11">
                  <Image
                    src="/logoo.png"
                    alt="Al Wafa Fruits"
                    width={200}
                    height={200}
                   className="object-cover w-[120px] h-[60px] sm:w-[160px] sm:h-[80px]"
                    priority
                  />
                </div>
              </Link>

              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-6 py-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;

                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={onClose}
                    className={`group flex items-center justify-between py-5 border-b border-gray-100 last:border-0 text-lg font-medium transition-all relative
                      ${isActive 
                        ? 'text-gray-900' 
                        : 'text-gray-700 hover:text-gray-900'
                      }`}
                  >
                    <span 
                      className={`relative pb-1 transition-all
                        ${isActive ? 'font-medium' : 'group-hover:translate-x-1'}`}
                      style={{
                        borderBottom: isActive ? '3px solid #e63946' : '3px solid transparent',
                      }}
                    >
                      {link.name}
                    </span>

                    <ChevronRight
                      size={20}
                      className={`transition-colors ${isActive ? 'text-[#e63946]' : 'text-gray-300 group-hover:text-[#e63946]'}`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Get in Touch Button */}
            <div className="p-6 border-t border-gray-100 mt-auto">
              <Link
                href="/contact"
                onClick={onClose}
                className="block w-full text-center bg-[#e63946] hover:bg-[#d12e3a] active:scale-95 transition-all text-white font-semibold py-4 rounded-2xl text-lg shadow-lg shadow-red-200"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}