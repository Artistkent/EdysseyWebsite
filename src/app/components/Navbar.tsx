'use client';

import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Perks', href: '#perks' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Join Waitlist', href: '#waitlist' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur border-b border-white/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <a href="#" className="text-xl font-bold text-white tracking-wide">
          Edyssey
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-white transition text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-xl"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-6 pb-4 space-y-4 bg-white/10 backdrop-blur"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-white/80 hover:text-white transition text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
