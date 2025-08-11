'use client';

import { useLayoutEffect, useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image'
import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Perks', href: '#perks' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Join Waitlist', href: '#WaitlistCTA' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const [heroInView, setHeroInView] = useState(false);
const [footerInView, setFooterInView] = useState(false);
const isDocked = heroInView || footerInView; // <-- dock when hero OR footer visible


  const fabRef = useRef<HTMLAnchorElement | null>(null);
const [fabPos, setFabPos] = useState({ x: 0, y: 0 });  // pixels from top-left
const [fabReady, setFabReady] = useState(false);

useEffect(() => {
  let timeoutId: number | undefined;

  const onScroll = () => {
    setIsScrolling(true);
    if (timeoutId) window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => setIsScrolling(false), 160); // fade after ~0.16s idle
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  return () => {
    window.removeEventListener('scroll', onScroll);
    if (timeoutId) window.clearTimeout(timeoutId);
  };
}, []);

const computeTargets = useCallback(() => {
  const navLink = document.getElementById('WaitlistCTAnavid');
  const fabEl = fabRef.current;


  
  if (!navLink || !fabEl) return null;

  const linkRect = navLink.getBoundingClientRect();
  const fabRect = fabEl.getBoundingClientRect();

  // Center FAB over the nav link
  const dockX = linkRect.left + (linkRect.width - fabRect.width) / 2;
  const dockY = linkRect.top + (linkRect.height - fabRect.height) / 2;

  // Bottom-right with a nice margin
  const margin = 20;
  const floatX = window.innerWidth - fabRect.width - margin;
  const floatY = window.innerHeight - fabRect.height - margin;

  return { dock: { x: dockX, y: dockY }, float: { x: floatX, y: floatY } };
}, []);




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
//   dot.style.left = `${x}px`; // Center the dot
//   dot.style.top = `${y}px`;
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

//  showDebugDot(x, y);

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
  //  console.log('Calculated brightness:', brightness);
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

const triggerId = 'hero';



useLayoutEffect(() => {
  // Mount FAB hidden, compute initial position (dock or float), then reveal.
  setShowFab(true);

  const place = () => {
    const targets = computeTargets();
    if (!targets) return;

    const triggerEl = document.getElementById(triggerId);
    const navH = document.getElementById('nav')?.clientHeight ?? 0;

    let inView = true; // default
    if (triggerEl) {
      const r = triggerEl.getBoundingClientRect();
      inView = r.top < window.innerHeight && r.bottom > navH;
    }

    setFabPos(inView ? targets.dock : targets.float);

    // Hide the real nav link when docked (but keep layout!)
    const waitlistNav = document.getElementById('WaitlistCTAnavid');
    if (waitlistNav) {
      waitlistNav.style.visibility = inView ? 'hidden' : 'visible';
      waitlistNav.style.pointerEvents = inView ? 'none' : 'auto';
    }

    setFabReady(true);
  };

  // Run once before first paint; if layout hasn’t settled, queue to next frame
  place();
  requestAnimationFrame(place);
}, [computeTargets, triggerId]);

useEffect(() => {
  const navH = document.getElementById('nav')?.clientHeight ?? 0;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.target.id === 'hero') {
          setHeroInView(entry.isIntersecting);
        } else if (entry.target.id === 'footer') {
          setFooterInView(entry.isIntersecting);
        }
      }

      // Ensure FAB is rendered, then measure next frame
      setShowFab(true);
      requestAnimationFrame(() => {
        const targets = computeTargets();
        if (!targets) return;

        // Hide the real nav link while docked (keep layout)
        const waitlistNav = document.getElementById('WaitlistCTAnavid');
        if (waitlistNav) {
          const dock = heroInView || footerInView;
          waitlistNav.style.visibility = dock ? 'hidden' : 'hidden';
          waitlistNav.style.pointerEvents = dock ? 'none' : 'auto';
        }

        const dockNow = heroInView || footerInView;
        setFabPos(dockNow ? targets.dock : targets.float);
      });
    },
    {
      root: null,
      rootMargin: `-${navH}px 0px 0px 0px`, // account for sticky nav at top
      threshold: 0,
    }
  );

  const heroEl = document.getElementById('hero');
  const footerEl = document.getElementById('footer');
  if (heroEl) io.observe(heroEl);
  if (footerEl) io.observe(footerEl);

  return () => io.disconnect();
}, [computeTargets, heroInView, footerInView]);




useEffect(() => {
  const onResize = () => {
    const targets = computeTargets();
    if (!targets) return;
    setFabPos(isDocked ? targets.dock : targets.float);
  };

  requestAnimationFrame(onResize);
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}, [computeTargets, isDocked]);




  return (
    <>
    <nav id='nav' className="navbarGroupClass sticky top-0 z-50  backdrop-blur border-b border-white/20">
      <div className="navbarGroupClass max-w-6xl mx-auto px-4 py-1 flex justify-between items-center">
        {/* Brand */}
        <div className=' navbarGroupClass flex items-center  rounded-full'>
        <a href="#" className="navbarGroupClass flex flex-row m-1 items-center bg-gradient-to-r from-[#e1b353] via-[#7b7e3a] to-[#e1b353] bg-clip-text text-transparent text-xs transition-transform duration-300 transform hover:scale-110 font-extrabold">
          
             <Image
      src="/EdLogoEdit.png"
      width={40}
      height={10}
      alt="logo"
      className='navbarGroupClass transition-transform duration-300 transform hover:scale-110'
    />

    EDDYSEY
         
        </a>
        </div>

        {/* Desktop Links */}
        <div className="navbarGroupClass hidden md:flex gap-6 items-center cursor-pointer">
          {navLinks.map((link) => (
           
            <a
              key={link.href}
              href={link.href}
              id={link.href.slice(1) + "navid"} // Append "navid" to the ID
              className={`navbarGroupClass px-4 py-1.5 rounded-2xl transition-all duration-300 transform text-sm font-medium hover:scale-110  ${scrolled ? '' : ''}
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
                className={`navbarGroupClass block  hover:text-white transition text-sm font  hover:scale-101  ${scrolled ? '' : ''}
              ${isDarkBg ? 'text-white hover:text-white/70 ' : 'text-black hover:text-black/70'}`}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>

<AnimatePresence>
 {showFab && !isOpen && (
  <motion.a
  ref={fabRef}
  href="#WaitlistCTA"
  initial={false}
  animate={{
    x: fabPos.x,
    y: fabPos.y,
    opacity: fabReady ? 1 : 0,
    // Glow when scrolling, subtle shadow when idle
    boxShadow: isScrolling
      ? '0 0 18px 6px rgba(225,179,83,0.45), 0 0 42px 12px rgba(225,179,83,0.22)'
      : '0 8px 24px rgba(0,0,0,0.35)',
    // Optional: slight scale bump on scroll
    scale: isScrolling ? 1.03 : 1
  }}
  transition={fabReady
    ? { type: 'spring', stiffness: 300, damping: 22 }
    : { duration: 0 }
  }
  style={{ position: 'fixed', top: 0, left: 0, zIndex: 60, visibility: fabReady ? 'visible' : 'hidden' }}
  className="shadow-lg backdrop-blur bg-black/80 hover:bg-black/70 navbarGroupClass px-4 py-1.5 md:px-6 md:py-3 rounded-full text-sm font-medium text-white hover:text-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
  aria-label="Join Waitlist"
  id="WaitlistCTAnavidBottom"
>
  Join Waitlist
</motion.a>

)}
</AnimatePresence>

</>
  );
}
