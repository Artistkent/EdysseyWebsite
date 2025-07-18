import { motion } from "framer-motion";

// app/components/Hero.tsx
export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary to-primary-500 text-white py-20 px-6 text-center">
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
  className="bg-secondary text-white font-semibold py-3 px-6 rounded-full hover:bg-primary transition">
          Join the Waitlist for Early Access
        </motion.a>
        <motion.a
  href="#about"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}  className="border border-white py-3 px-6 rounded-full hover:bg-white hover:text-black transition">
          See How It Works
        </motion.a>
      </div>
      {/* Placeholder visual */}
      <div className="mt-12">
        <div className="w-full max-w-xl mx-auto h-64 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center">
        <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.5 }}
  className="w-full max-w-xl mx-auto h-64 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center"
>
          <span className="text-white text-xl">[Animated Preview Placeholder]</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
