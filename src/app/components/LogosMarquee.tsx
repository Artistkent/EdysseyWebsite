"use client";

import Image from "next/image";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

type Logo = { src: string; alt: string };

const LOGOS: Logo[] = [
  { src: "/images/AI.png", alt: "AI" },
  { src: "/images/analytics.png", alt: "Analytics" },
  { src: "/images/blockchain.png", alt: "Blockchain" },
  { src: "/images/gamification.png", alt: "Gamification" },
  { src: "/images/fintech.png", alt: "Financial Inclusion" },
];

export default function LogosMarquee() {
  return (
    <div className="relative mx-auto mt-10 w-full overflow-hidden ">
      {/* subtle glass blur backdrop */}
      <div className="absolute inset-0  backdrop-blur-[2px] z-0" />

      <Splide
        aria-label="Featured partners"
        options={{
          type: "loop",
          drag: "free",
          arrows: false,
          pagination: false,
          gap: "2.5rem",
          autoWidth: true,
          focus: "center",
          clones: 2,
          autoScroll: {
            speed: 0.1,
            pauseOnHover: true,
            pauseOnFocus: false,
          },
        }}
        extensions={{ AutoScroll }}
        className="relative z-10"
      >
        {LOGOS.map((logo, i) => (
          <SplideSlide
            key={i}
            className="opacity-100 hover:opacity-80 transition-opacity"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={240}
              height={96}
              className="h-36 w-auto object-contain"
              priority
            />
          </SplideSlide>
        ))}
      </Splide>

      {/* Edge blur overlays */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-gray-900/70 to-transparent backdrop-blur-sm z-20" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-gray-900/70 to-transparent backdrop-blur-sm z-20" />
    </div>
  );
}
