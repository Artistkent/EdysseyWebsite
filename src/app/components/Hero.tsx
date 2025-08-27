import { motion } from "framer-motion";
import Image from "next/image";
import LogosMarquee from "./LogosMarquee";

// app/components/Hero.tsx
export default function Hero() {
  return (
    <section id="hero" className="relative text-white py-20 px-0 pb-4 text-center">

      <div className="px-6">

{/* Background image with gradient mask */}
      <div className="absolute inset-0 -z-50">
        <Image
          src="/images/hero.png" // replace with your file path (e.g. /hero-bg.png in public folder)
          alt="Hero background"
          fill
          priority
          className="object-cover opacity-100"
        />
        {/* Gradient overlay for fade effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/40 to-transparent" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Reimagine Education: Learn, Play, and Earn with AI Tutors and Web3 Rewards
      </h1>
      <p className="max-w-2xl mx-auto text-lg mb-8">
        Meet Edyssey — a gamified learning platform where stories teach, quests build skills, and your schoolwork earns you real-world rewards.
      </p>
      <div className="flex justify-center gap-4">
        <motion.a
  href="#WaitlistCTA"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }} 
  className="bg-primary text-black font-semibold text-base py-2 px-4 rounded-full hover:bg-primary/80 transition">
          Join the Waitlist for Early Access
        </motion.a>
        <motion.a
  href="#about"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}  className="border border-white py-2 px-4 font-semibold text-base rounded-full hover:bg-white hover:text-black transition">
          See How It Works
        </motion.a>
      </div>

      </div>

{/* Placeholder visual */}
      <div className="mt-50">
        <LogosMarquee />
      </div>

    </section>
  );
}
