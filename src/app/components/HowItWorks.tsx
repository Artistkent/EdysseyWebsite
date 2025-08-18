// app/components/HowItWorks.tsx
'use client';

import Image from 'next/image';

type Step = {
  title: string;
  description: string;
  imageUrl: string; // <-- use any absolute or public path
};

type Props = {
  steps?: Step[];
};

const defaultSteps: Step[] = [
  {
    title: 'Choose Your AI Tutor',
    description:
      'Pick a tutor based on your favourite characters, cultural icons, or creators.',
    imageUrl:
      'images/aitutor.png', // replace me
  },
  {
    title: 'Learn Through Quests',
    description:
      'Each lesson is a gamified mission that builds skills and earns rewards.',
    imageUrl:
      'images/learnquests.png',
  },
  {
    title: 'Earn $EDY Tokens',
    description:
      'Complete challenges, collaborate with peers, and grow your learning community.',
    imageUrl:
      'images/edytokens.png',
  },
  {
    title: 'Use Your Rewards',
    description:
      'Redeem tokens for school supplies, scholarships, events, or even off-platform perks.',
    imageUrl:
      'images/userewards.png',
  },
];

export default function HowItWorks({ steps = defaultSteps }: Props) {
  return (
    <section id="about" className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-900">
          How Edyssey Works 
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-xl hover:shadow-lg transition"
            >
              <div className="mb-4 h-auto w-auto aspect-[3/2] overflow-hidden rounded-xl ring-1 ring-gray-200">
                <Image
                  src={step.imageUrl}
                  alt={step.title}
                  width={80}
                  height={80}
                  className="h-full w-full object-fit"
                  priority={index === 0}
                />
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
