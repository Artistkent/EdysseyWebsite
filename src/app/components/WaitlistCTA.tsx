// app/components/WaitlistCTA.tsx
import { motion } from "framer-motion";


export default function WaitlistCTA() {
  return (
    <section id="WaitlistCTA" className="bg-purple-700 text-white py-20 px-6 text-center">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Be among the first to shape the future of education.
        </h2>
        <p className="mb-8 text-white/90">
          No spam. Just early perks and insider updates.
        </p>
        <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  type="submit" className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-full hover:bg-yellow-300 transition">
          Join the Waitlist
        </motion.button>
      </div>
    </section>
  );
}
