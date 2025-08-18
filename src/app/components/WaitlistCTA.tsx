'use client';
// app/components/WaitlistCTA.tsx
import { motion } from "framer-motion";

import { useState } from 'react';


export default function WaitlistCTA() {


  const [form, setForm] = useState({
  email: "",
  name: "",
  role: "",
  interests: [] as string[],
  earlyAccess: false, // NEW
  botField: "" // honeypot
});


  const handleCheckboxChange = (value: string) => {
    setForm((prev) => {
      const interests = prev.interests.includes(value)
        ? prev.interests.filter((v) => v !== value)
        : [...prev.interests, value];
      return { ...prev, interests };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  console.log(process.env.NEXT_PUBLIC_WAITLIST_WEBHOOK_URL);


   if (form.botField) return;

  try {
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const out = await res.json();
    if (res.ok && out.ok) {
      alert('✅ Success! You’re on the waitlist.');
      setForm({ email:'', name:'', role:'', interests:[], earlyAccess:false, botField:'' });
    } else {
      alert('⚠️ ' + (out.message || 'Error'));
    }
  } catch (err) {
    console.error('Waitlist API error:', err);
    alert('Server error. Please try again.');
  }
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
    <section id="WaitlistCTA" className="lightChildParent relative z-0 bg-gradient-to-br from-primary-500 to-primary text-white py-20 px-6 text-center">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Join the Waitlist — Tell Us Who You Are and Help Shape the Future of Learning
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
  className=""
>
  <div className="lightChild relative max-w-xl mx-auto bg-black text-white p-8 rounded-2xl shadow-md border border-gray-500 z-50 ">
        <h2 className="text-xl font-semibold mb-2 text-center">
          Be among the first to experience our AI-powered learning platform.
        </h2>
        <p className="text-sm text-white/60 mb-6 text-center">
          Get early access to exclusive features and updates.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
  {/* Email */}
  <div className="flex flex-row">
    <label className="block text-sm font-medium mb-1 w-24 p-2" htmlFor="email">
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
  <div className="flex flex-row">
    <label className="block text-sm font-medium mb-1 w-24 p-2" htmlFor="name">
      Name (Optional)
    </label>
    <input
      type="text"
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
      className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      placeholder="Enter your name"
      id="name"
    />
  </div>

  {/* Who Are You? */}
  <div className="flex flex-row">
    <label className="block text-sm font-medium mb-1 w-24 p-2" htmlFor="role">
      Who Are You?
    </label>
    <select
      id="role"
      value={form.role || ""}
      onChange={(e) => setForm({ ...form, role: e.target.value })}
      className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-black"
    >
      <option value="">Select an option</option>
      <option value="Student">Student</option>
      <option value="Parent">Parent</option>
      <option value="Teacher">Teacher</option>
      <option value="School Admin">School Admin</option>
      <option value="Content Creator">Content Creator</option>
      <option value="NGO / Sponsor">NGO / Sponsor</option>
      <option value="Other">Other</option>
    </select>
  </div>

  {/* Interests */}
  <div className="flex flex-row">
    <label className="block text-sm font-medium mb-2 w-24 p-2">
      Areas of Interest (Optional)
    </label>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
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

  {/* Early access toggle */}
<div className="flex items-center justify-between gap-3">
  <span className="text-sm font-medium">
    I want early access to create quests or tutors
  </span>

  <label className="relative inline-flex h-6 w-11 items-center cursor-pointer">
    <input
      type="checkbox"
      className="peer sr-only"
      checked={form.earlyAccess}
      onChange={(e) => setForm({ ...form, earlyAccess: e.target.checked })}
      aria-label="Early access to create quests or tutors"
    />
    {/* Track */}
    <span className="absolute inset-0 rounded-full bg-gray-300 transition-colors peer-checked:bg-primary" />
    {/* Knob */}
    <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
  </label>
</div>

{/* Honeypot (spam trap) */}
<div className="hidden">
  <label>
    Leave this field empty
    <input
      type="text"
      name="botField"
      value={form.botField}
      onChange={(e) => setForm({ ...form, botField: e.target.value })}
      tabIndex={-1}
      autoComplete="off"
    />
  </label>
</div>


  {/* Submit */}
  <button
    type="submit"
    className="w-full bg-primary text-secondary font-semibold py-3 rounded-lg hover:bg-transparent hover:text-white hover:shadow-[inset_0_0_6px_var(--color-primary)] transition cursor-pointer"
  >
    Join Waitlist
  </button>

  {/* Consent */}
  <p className="text-xs text-center text-white-500 mt-4">
    By joining the waitlist, you agree to receive updates about Edyssey.
  </p>
</form>

      </div>
</motion.div>

      </div>
    </section>
  );
}
