
const features: { num: string; title: string; description: string }[] = [
  {
    num: "01",
    title: "Premium Components",
    description: "We've rethought every single component from the ground up, carefully selected it, and consistently refined it.",
  },
  {
    num: "02",
    title: "Elegant Design",
    description: "Very modern ebikes, with an elegant look but still robust and stable. Clean aesthetics meet cutting-edge technology.",
  },
  {
    num: "03",
    title: "Green Power",
    description: "Zero emissions, responsibly sourced materials, and a commitment to a greener future for urban mobility.",
  },
  {
    num: "04",
    title: "Go Beyond",
    description: "We want to give you the tools to go a little further than ever before. This time, beyond.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500 mb-3">The Deruiz difference</p>
          <h2 className="font-serif-display text-4xl sm:text-5xl text-white">Why choose Deruiz</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {features.map((f) => (
            <div key={f.num} className="px-8 py-8 first:pl-0 last:pr-0 group">
              <span className="text-5xl font-bold text-white/10 group-hover:text-yellow-400 transition-colors duration-500 block mb-6">{f.num}</span>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-3 text-white">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
