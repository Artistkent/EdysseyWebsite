// app/components/Benefits.tsx
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface BenefitCardProps {
  title: string;
  description: ReactNode;
  visualLabel: string;
}

function BenefitCard({ title, description, visualLabel }: BenefitCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 shadow-md">
      {/* Placeholder for visual */}
      <div className="w-full md:w-1/3 h-40 bg-indigo-300/30 rounded-lg flex items-center justify-center text-white text-sm italic">
        {visualLabel}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <div className="text-white/90 text-sm space-y-2">{description}</div>
      </div>
    </div>
  );
}

export default function Benefits() {
  return (
    <section className="bg-gradient-to-b from-indigo-800 to-purple-800 py-20 px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10">
          Why Students and Educators Love Edyssey
        </h2>

        <BenefitCard
          title="AI-Powered, Culturally-Aware Tutors"
          visualLabel="Animated tutor avatars"
          description={
            <>
              <p>
                Personalised learning powered by AI tutors based on fictional figures, cultural icons, and regional personalities.
              </p>
              <ul className="list-disc list-inside pl-2">
                <li>Adapts to your learning style and EHCP needs</li>
                <li>Teaches with storytelling — e.g., learn law from Ronaldo or science from an African goddess</li>
                <li>Supports multiple languages and formats</li>
              </ul>
            </>
          }
        />

        <BenefitCard
          title="Gamified Learning – Turn Lessons into Quests"
          visualLabel="Quest carousel preview"
          description={
            <>
              <p>Make learning feel like an RPG with XP, missions, and badges.</p>
              <ul className="list-disc list-inside pl-2">
                <li>Interactive mini-quests and world-building adventures</li>
                <li>Reinforce real-world knowledge and soft skills</li>
                <li>Create your own missions, earn NFTs and rewards</li>
              </ul>
            </>
          }
        />

        <BenefitCard
          title="Web3 Backbone – Rewards, Community, Governance"
          visualLabel="Token flow loop"
          description={
            <>
              <p>Blockchain rewards for real-world learning and platform governance.</p>
              <ul className="list-disc list-inside pl-2">
                <li>Earn $EDY tokens for learning and creating</li>
                <li>Use tokens for school fees, events, and merch</li>
                <li>Vote on platform features via DAO</li>
              </ul>
            </>
          }
        />

        <BenefitCard
          title="Real-Time Data & Insights"
          visualLabel="Stakeholder dashboard tabs"
          description={
            <>
              <p>Actionable data for students, teachers, schools, and creators.</p>
              <ul className="list-disc list-inside pl-2">
                <li>Students track progress and unlock scholarships</li>
                <li>Teachers identify learning gaps and automate tasks</li>
                <li>Schools monitor trends, apply for grants, and improve curriculum</li>
                <li>Creators see what content works and monetise impact</li>
              </ul>
            </>
          }
        />
      </div>
    </section>
  );
}
