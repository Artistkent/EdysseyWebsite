// app/components/HowItWorks.tsx

const steps = [
  {
    title: "Choose Your AI Tutor",
    description:
      "Pick a tutor based on your favourite characters, cultural icons, or creators.",
    icon: "🧙‍♂️",
  },
  {
    title: "Learn Through Quests",
    description:
      "Each lesson is a gamified mission that builds skills and earns rewards.",
    icon: "🗺️",
  },
  {
    title: "Earn $EDY Tokens",
    description:
      "Complete challenges, collaborate with peers, and grow your learning community.",
    icon: "🪙",
  },
  {
    title: "Use Your Rewards",
    description:
      "Redeem tokens for school supplies, scholarships, events, or even off-platform perks.",
    icon: "🎁",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-900">
          How Edyssey Works (Even Before It Fully Launches)
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-xl hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
