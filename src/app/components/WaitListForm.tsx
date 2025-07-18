'use client';

import { useState } from 'react';

export default function WaitlistForm() {
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
    <section className="bg-white text-gray-900 py-16 px-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-200">
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
            className="w-full bg-primary text-secondary font-semibold py-3 rounded-lg hover:bg-yellow-400 transition"
          >
            Join Waitlist
          </button>

          {/* Consent */}
          <p className="text-xs text-center text-gray-500 mt-4">
            By joining the waitlist, you agree to receive updates about Edyssey.
          </p>
        </form>
      </div>
    </section>
  );
}
