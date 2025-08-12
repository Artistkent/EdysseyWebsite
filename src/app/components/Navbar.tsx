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
  const [isMobile, setIsMobile] = useState(false);

  const [heroInView, setHeroInView] = useState(false);
const [footerInView, setFooterInView] = useState(false);



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

  if (!linkRect.width || !linkRect.height) {
  // nav link not measurable (e.g., hidden on mobile)
  const margin = 20;
  return {
    dock: { x: 0, y: 0 }, // unused on mobile
    float: { x: window.innerWidth - fabRect.width - margin,
             y: window.innerHeight - fabRect.height - margin },
  };
}

  // Center FAB over the nav link
  const dockX = linkRect.left + (linkRect.width - fabRect.width) / 2;
  const dockY = linkRect.top + (linkRect.height - fabRect.height) / 2;

  // Bottom-right with a nice margin
  const margin = 40;
  const floatX = window.innerWidth - fabRect.width - margin;
  const floatY = window.innerHeight - fabRect.height - margin/2;

  return { dock: { x: dockX, y: dockY }, float: { x: floatX, y: floatY } };
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

  const rect = navbar.getBoundingClientRect();
  // sample just *below* the navbar so we don't hit the sticky element
  const x = Math.min(rect.left + 10, window.innerWidth - 1);
  const y = Math.min(rect.bottom + 1, window.innerHeight - 1);

  const elem = document.elementFromPoint(x, y) as HTMLElement | null;
  if (!elem) return 'light';

  const bg = getComputedStyle(elem).backgroundColor;
  if (!bg || bg === 'transparent') return 'light';

  const rgb = bg.match(/\d+/g)?.map(Number);
  if (!rgb || rgb.length < 3) return 'light';

  const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
  return brightness > 151 ? 'light' : 'dark';
}, []);



const triggerId = 'hero';




//MOBILE CODES
// Compute the floating position of the FAB
useEffect(() => {
  const mq = window.matchMedia('(max-width: 767px)'); // Tailwind md breakpoint
  const update = () => setIsMobile(mq.matches);
  update();
  // Safari fallback for older addListener/removeListener
  if (mq.addEventListener) {
    mq.addEventListener('change', update);
  } else {
    mq.addListener(update);
  }
  return () => {
    if (mq.removeEventListener) {
      mq.removeEventListener('change', update);
    } else {
      mq.removeListener(update);
    }
  };
}, []);


// Compute the floating position of the FAB
const computeFloat = useCallback(() => {
  const el = fabRef.current;
  if (!el) return { x: 0, y: 0 };
  const r = el.getBoundingClientRect();
  const margin = 20;
  return {
    x: window.innerWidth - r.width - margin,
    y: window.innerHeight - r.height - margin,
  };
}, []);

// Handle mobile FAB docking logic

useLayoutEffect(() => {
  setShowFab(true);

  // MOBILE: always float bottom-right; don't hide navbar link
  if (isMobile) {
    requestAnimationFrame(() => {
      setFabPos(computeFloat());
      const waitlistNav = document.getElementById('WaitlistCTAnavid');
      if (waitlistNav) {
        waitlistNav.style.visibility = 'visible';
        waitlistNav.style.pointerEvents = 'auto';
      }
      setFabReady(true);
    });
    return; // <-- skip docking logic entirely
  }

  // DESKTOP: your existing docking placement...
  const place = () => {
    const targets = computeTargets();
    if (!targets) return;
    const triggerEl = document.getElementById(triggerId);
    const navH = document.getElementById('nav')?.clientHeight ?? 0;
    let inView = true;
    if (triggerEl) {
      const r = triggerEl.getBoundingClientRect();
      inView = r.top < window.innerHeight && r.bottom > navH;
    }
    setFabPos(inView ? targets.dock : targets.float);
    const waitlistNav = document.getElementById('WaitlistCTAnavid');
    if (waitlistNav) {
      waitlistNav.style.visibility = inView ? 'hidden' : 'hidden';
      waitlistNav.style.pointerEvents = inView ? 'none' : 'auto';
    }
    setFabReady(true);
  };
  place();
  requestAnimationFrame(place);
}, [computeTargets, computeFloat, triggerId, isMobile]);


// Handle desktop FAB docking logic

useEffect(() => {
  if (isMobile) return;

  const navH = document.getElementById('nav')?.clientHeight ?? 0;
  const io = new IntersectionObserver(
    (entries) => {
      let heroSeen = heroInView;   // fallback to current state
      let footerSeen = footerInView;

      for (const entry of entries) {
        if (entry.target.id === 'hero') {
          heroSeen = entry.isIntersecting;
          setHeroInView(entry.isIntersecting);
        } else if (entry.target.id === 'footer') {
          footerSeen = entry.isIntersecting;
          setFooterInView(entry.isIntersecting);
        }
      }

      const dockNow = heroSeen || footerSeen;

      setShowFab(true);
      requestAnimationFrame(() => {
        const targets = computeTargets();
        if (!targets) return;

        const waitlistNav = document.getElementById('WaitlistCTAnavid');
        if (waitlistNav) {
          waitlistNav.style.visibility = 'hidden';
          waitlistNav.style.pointerEvents = 'none';
        }

        setFabPos(dockNow ? targets.dock : targets.float);
      });
    },
    { root: null, rootMargin: `-${navH}px 0px 0px 0px`, threshold: 0 }
  );

  const heroEl = document.getElementById('hero');
  const footerEl = document.getElementById('footer');
  if (heroEl) io.observe(heroEl);
  if (footerEl) io.observe(footerEl);

  return () => io.disconnect();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [computeTargets, isMobile]);




// Handle window resize

useEffect(() => {
  const onResize = () => {
    if (isMobile) {
      setFabPos(computeFloat());
      return;
    }
    const targets = computeTargets();
    if (!targets) return;
    const dockNow = heroInView || footerInView;
    setFabPos(dockNow ? targets.dock : targets.float);
  };

  requestAnimationFrame(onResize);
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}, [computeTargets, computeFloat, isMobile, heroInView, footerInView]);


// Handle scroll events RAF

useEffect(() => {
  let rAF = 0;
  let idleTimer: number | undefined;

  // refs to avoid re-render thrash
  const last = {
    isScrolling: false,
    scrolled: false,
    isDark: false,
  };

  const measure = () => {
    // 1) scrolled
    const navbar = document.querySelector('nav') as HTMLElement | null;
    const navbarHeight = navbar?.clientHeight || 0;
    const nextScrolled = window.scrollY > (navbarHeight / 3);
    if (nextScrolled !== last.scrolled) {
      last.scrolled = nextScrolled;
      setScrolled(nextScrolled);
    }

    // 2) background brightness (throttle this!)
    const brightness = getBackgroundBehindNavbar(); // keep it, but see tip below to lighten it
    const nextIsDark = brightness === 'dark';
    if (nextIsDark !== last.isDark) {
      last.isDark = nextIsDark;
      setIsDarkBg(nextIsDark);
    }

    // 3) isScrolling glow flag (auto-clear after 160ms)
    if (!last.isScrolling) {
      last.isScrolling = true;
      setIsScrolling(true);
    }
    if (idleTimer) window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(() => {
      last.isScrolling = false;
      setIsScrolling(false);
    }, 160);

    rAF = 0; // finished
  };

  const onScroll = () => {
    if (rAF) return;
    rAF = requestAnimationFrame(measure);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  // run once on mount
  onScroll();

  return () => {
    window.removeEventListener('scroll', onScroll);
    if (rAF) cancelAnimationFrame(rAF);
    if (idleTimer) window.clearTimeout(idleTimer);
  };
}, [getBackgroundBehindNavbar]);



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
  className="shadow-lg backdrop-blur bg-black/80 hover:bg-black/70 navbarGroupClass px-4 py-1.5 md:px-6 md:py-3 rounded-full will-change-transform text-sm font-medium text-white hover:text-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
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
