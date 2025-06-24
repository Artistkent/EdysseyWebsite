// app/components/WhyItMatters.tsx

const values = [
  {
    title: "Personalisation Meets Culture",
    boldLine: "AI Tutors speak your language—literally and culturally.",
    description:
      "Our tutors adapt not only to your learning style, but also to your regional stories, dialects, and traditions. It's global learning with a local voice.",
  },
  {
    title: "Education That Feels Like a Game",
    boldLine:
      "Retention skyrockets when learning is fun, interactive, and rewarding.",
    description:
      "Quests, XP, and characters transform learning into an RPG that keeps students engaged, motivated, and curious.",
  },
  {
    title: "Earn While You Learn",
    boldLine:
      "We turn schoolwork into economic opportunity, even in underserved regions.",
    description:
      "With blockchain rewards and DAO incentives, students gain value from their effort — not just grades, but tokens, visibility, and voice.",
  },
];

export default function WhyItMatters() {
  return (
    <section className="bg-indigo-950 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
          Not Just Another EdTech App — A Movement to Redefine Learning
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {values.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-green-300 font-medium mb-2">
                {item.boldLine}
              </p>
              <p className="text-sm text-white/90">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
