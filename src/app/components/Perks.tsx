// app/components/Perks.tsx

import Image from "next/image";

const perks = [
  "Free access to our MVP platform",
  "Be the first to shape how quests, rewards, and tutors evolve",
  "Get direct influence through our student DAO",
  "Early token airdrops or staking bonuses",
  "Founding Member Certificate NFT",
  "Priority for internships, scholarships, and community leadership roles",
];

export default function Perks() {
  return (
    <section className="relative text-white py-20 px-6">

{/* Background image with gradient mask */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/perksback.png"
          alt="Perks background"
          fill
          priority
          className="object-cover opacity-100"
        />
        {/* Gradient overlay for fade effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Get More Than Just Access
        </h2>

        <ul className="grid sm:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
          {perks.map((perk, index) => (
            <li
              key={index}
              className="flex items-start gap-3 p-4 bg-white/10 border border-white/20 rounded-xl"
            >
              <span className="text-green-300 text-xl">✔</span>
              <p className="text-white/90 text-sm">{perk}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
