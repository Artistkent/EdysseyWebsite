// app/components/WhyItMatters.tsx

const values = [
  {
    title: "AI Tutors with Cultural Identity",
    boldLine: "AI Tutors speak your language—literally and culturally.",
    description:
      "Our tutors don't just personalise by level; they reflect your language, region, and stories. Think Superman teaching science, or an African queen explaining leadership.",
  },
  {
    title: "Learning That Feels Like a Game",
    boldLine: "Retention skyrockets when learning is fun, interactive, and rewarding.",
    description:
      "RPG quests, XP, and world-building bring subjects to life. Students become players, leaders, and creators of their own educational story.",
  },
  {
    title: "Earn While You Learn",
    boldLine: "We turn schoolwork into economic opportunity, even in underserved regions.",
    description:
      " $EDY tokens reward not just grades, but creativity, effort, and collaboration — and unlock scholarships, internships, and economic value.",
  },
  {
    title: "Built for the Future of Learning",
    boldLine: "Empowering every learner and educator with tools that grow with their ambitions.",
    description:
      " From smart dashboards for schools to creator tools for teachers, Edyssey is built to scale from village classrooms to global universities.",
  },
];

export default function WhyItMatters() {
  return (
    <section className="bg-indigo-950 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
          Why Edyssey is More Than an App — It&apos;s a Cultural, Educational, and Economic Shift
        </h2>

        {/* 1 col on mobile, 2 on md, 4 on lg+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-green-300 font-medium mb-2">{item.boldLine}</p>
              <p className="text-sm text-white/90">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
