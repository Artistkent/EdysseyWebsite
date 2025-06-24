// app/components/FAQ.tsx
"use client";


import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa6";

const faqs = [
  {
    question: "When does Edyssey launch?",
    answer: "We're planning an early-access rollout for waitlist members later this year. Sign up to be the first in line!",
  },
  {
    question: "Is it free to use?",
    answer: "Yes! The core platform is free for students, with optional premium quests and community upgrades.",
  },
  {
    question: "Can my school or club join early?",
    answer: "Absolutely. We're onboarding partner schools and youth organisations. Contact us to learn more.",
  },
  {
    question: "Is the $EDY token real money?",
    answer: "$EDY is a utility token that can be used on-platform or exchanged for real-world perks. Full tokenomics coming soon.",
  },
  {
    question: "What devices will it support?",
    answer: "Edyssey works on mobile, tablet, and desktop — all you need is a browser and an internet connection.",
  },
];

export default function FAQ() {

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
          Got Questions? We’ve Got Answers.
        </h2>
        <div className="space-y-4">
          {faqs.map((item, idx) => (
           <Disclosure as="div" key={idx}>
  {({ open }) => (
    <>
      <DisclosureButton className="flex justify-between w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-left text-gray-800 font-medium">
        {item.question}
        <FaChevronDown className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </DisclosureButton>
      <DisclosurePanel className="px-4 py-3 bg-white text-sm text-gray-700 border-t border-gray-200">
        {item.answer}
      </DisclosurePanel>
    </>
  )}
</Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}
