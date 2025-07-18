'use client';
// app/components/WaitlistCTA.tsx
import { motion } from "framer-motion";

import { useState } from 'react';


export default function WaitlistCTA() {


  const [form, setForm] = useState({
    email: '',
    name: '',
    interests: [] as string[],
  });

  const handleCheckboxChange = (value: string) => {
    setForm((prev) => {
      const interests = prev.interests.includes(value)
        ? prev.interests.filter((v) => v !== value)
        : [...prev.interests, value];
      return { ...prev, interests };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    // You can POST this to your /api/join or external service
  };

  const interestOptions = [
    'Programming',
    'Data Science',
    'AI/ML',
    'Design',
    'Business',
    'Languages',
  ];


  return (
    <section id="WaitlistCTA" className="relative z-0 bg-gradient-to-br from-primary-500 to-primary text-white py-20 px-6 text-center pointer-events-none">
      <div className="max-w-xl mx-auto pointer-events-none">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Be among the first to shape the future of education.
        </h2>
        <p className="mb-8 text-white/90">
          No spam. Just early perks and insider updates.
        </p>
        {/* <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  type="submit" className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-full hover:bg-yellow-300 transition">
          Join the Waitlist
        </motion.button> */}

<motion.div
initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
  viewport={{ once: true }}
  className="pointer-events-none"
>
  <div className="relative max-w-xl mx-auto bg-white text-gray-900 p-8 rounded-2xl shadow-md border border-gray-200 z-50 pointer-events-auto">
        <h2 className="text-xl font-semibold mb-2 text-center">
          Be among the first to experience our AI-powered learning platform.
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Get early access to exclusive features and updates.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
              id="email"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name (Optional)
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none"
              placeholder="Enter your name"
              id="name"
            />
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Areas of Interest (Optional)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {interestOptions.map((interest) => (
                <label key={interest} className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.interests.includes(interest)}
                    onChange={() => handleCheckboxChange(interest)}
                    className="accent-primary"
                  />
                  {interest}
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-secondary font-semibold py-3 rounded-lg hover:bg-white hover:shadow-[inset_0_0_6px_var(--color-primary)] transition cursor-pointer"
          >
            Join Waitlist
          </button>

          {/* Consent */}
          <p className="text-xs text-center text-gray-500 mt-4">
            By joining the waitlist, you agree to receive updates about Edyssey.
          </p>
        </form>
      </div>
</motion.div>

      </div>
    </section>
  );
}
