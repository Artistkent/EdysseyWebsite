'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image'
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
  const handleScroll = () => {
    const navbar = document.querySelector('nav');
    const navbarHeight = navbar?.clientHeight || 0;
    setScrolled(window.scrollY > (navbarHeight/3)); // Adjust threshold as needed
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  return (
    <nav id='nav' className="sticky top-0 z-50 bg-white/10 backdrop-blur border-b border-white/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <a href="#" className="flex flex-col items-center font-bold bg-gradient-to-r from-[#e1b353] to-[#7b7e3a] bg-clip-text text-transparent tracking-wide text-xs md:text-sm drop-shadow-lg hover:drop-shadow-xl transition-transform duration-300 transform hover:scale-110">
             <Image
      src="/EdLogoEdit.png"
      width={50}
      height={10}
      alt="logo"
      className='drop-shadow-lg hover:drop-shadow-xl transition-transform duration-300 transform hover:scale-110'
    />
          Edyssey
         
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
           
            <a
              key={link.href}
              href={link.href}
              className={`px-4 py-1.5 rounded-2xl hover:text-white transition-colors duration-500 transform text-sm font-bold  ${scrolled ? 'bg-primary text-black hover:bg-primary/70' : 'bg-secondary hover:bg-secondary-500 text-white hover:text-white/80'}`}
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
