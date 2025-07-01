'use client';

import { useEffect, useState, useCallback } from 'react';
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
  const [isDarkBg, setIsDarkBg] = useState(false);

  

// Handle scroll event to change navbar style
  useEffect(() => {
  const handleScroll = () => {
    const navbar = document.querySelector('nav');
    const navbarHeight = navbar?.clientHeight || 0;
    setScrolled(window.scrollY > (navbarHeight/3)); // Adjust threshold as needed
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Show a debug dot at the specified coordinates
// function showDebugDot(x: number, y: number) {
//   const dot = document.createElement('div');
//   dot.style.position = 'fixed';
//   dot.style.left = `${x - 4}px`; // Center the dot
//   dot.style.top = `${y - 4}px`;
//   dot.style.width = '8px';
//   dot.style.height = '8px';
//   dot.style.backgroundColor = 'red';
//   dot.style.borderRadius = '50%';
//   dot.style.zIndex = '9999';
//   dot.style.pointerEvents = 'none';
//   dot.style.boxShadow = '0 0 6px 2px rgba(255,0,0,0.6)';
//   dot.className = 'debug-dot';

//   document.body.appendChild(dot);

//   // Remove after 2 seconds
//   setTimeout(() => {
//     dot.remove();
//   }, 2000);
// }

// Function to determine background brightness at a specific Y position

const getBackgroundBehindNavbar = useCallback((navbarId = 'nav'): 'light' | 'dark' => {
  const navbar = document.getElementById(navbarId);
  if (!navbar) return 'light';

  const navbarHeight = navbar?.clientHeight || 0;

  const rect = navbar.getBoundingClientRect();
  const y = rect.bottom - (navbarHeight/2); // Just below the navbar
  console.log('Checking background at Y position:', y);
  const x = 10;

 // showDebugDot(x, y);

  let elem = document.elementFromPoint(x, y);

  // If the point returns the navbar itself (because it's sticky), we search deeper
  while (elem && elem.classList.contains("navbarGroupClass")) {
    const originalElem = elem as HTMLElement;
    originalElem.style.pointerEvents = 'none';// Temporarily ignore the navbar
    elem = document.elementFromPoint(x, y);
    console.log('Found element at point:', elem);
    originalElem.style.removeProperty('pointer-events');
  }

  if (!elem) return 'light';

  const style = window.getComputedStyle(elem);
  const bgColor = style.backgroundColor;
  console.log('Background behind navbar:', bgColor);

  if (!bgColor || bgColor === 'transparent') return 'light';

  const rgb = bgColor.match(/\d+/g)?.map(Number);
  if (!rgb || rgb.length < 3) return 'light';

  const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
   console.log('Calculated brightness:', brightness);
  return brightness > 151 ? 'light' : 'dark';
}, []);


// Check background brightness on scroll
useEffect(() => {
  const handleScroll = () => {
    const brightness = getBackgroundBehindNavbar();
    setIsDarkBg(brightness === 'dark');
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // initial run
  return () => window.removeEventListener('scroll', handleScroll);
}, [getBackgroundBehindNavbar]);



  return (
    <nav id='nav' className="navbarGroupClass sticky top-0 z-50 bg-white/10 backdrop-blur border-b border-white/20">
      <div className="navbarGroupClass max-w-6xl mx-auto px-4 py-1 flex justify-between items-center">
        {/* Brand */}
        <div className=' navbarGroupClass flex items-center  rounded-full'>
        <a href="#" className="navbarGroupClass flex flex-col m-1 items-center bg-gradient-to-r from-[#e1b353] via-[#7b7e3a] to-[#e1b353] bg-clip-text text-transparent text-xs transition-transform duration-300 transform hover:scale-110 font-[cursive] font-extrabold">
          
             <Image
      src="/EdLogoEdit.png"
      width={40}
      height={10}
      alt="logo"
      className='navbarGroupClass transition-transform duration-300 transform hover:scale-110'
    />
         
        </a>
        </div>

        {/* Desktop Links */}
        <div className="navbarGroupClass hidden md:flex gap-6 items-center cursor-pointer">
          {navLinks.map((link) => (
           
            <a
              key={link.href}
              href={link.href}
              className={`navbarGroupClass px-4 py-1.5 rounded-2xl transition-all duration-300 transform text-sm font-bold hover:scale-110  ${scrolled ? '' : ''}
              ${isDarkBg ? 'text-white hover:text-white/70 ' : 'text-black hover:text-black/70'}`}
            >
              {link.label}
            </a>
           
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="navbarGroupClass md:hidden text-white text-xl"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes className={`navbarGroupClass ${isDarkBg ? 'text-white hover:text-white/70 ' : 'text-black hover:text-black/70'}`} /> : <FaBars className={`navbarGroupClass ${isDarkBg ? 'text-white hover:text-white/70 ' : 'text-black hover:text-black/70'}`} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="navbarGroupClass md:hidden px-6 py-4 space-y-4 bg-white/10 backdrop-blur"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`navbarGroupClass block  hover:text-white transition text-sm font-medium  hover:scale-101  ${scrolled ? '' : ''}
              ${isDarkBg ? 'text-white hover:text-white/70 ' : 'text-black hover:text-black/70'}`}
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
