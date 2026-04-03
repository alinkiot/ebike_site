import { Zap, Palette, Leaf, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Zap,
    title: "Premium Components",
    description: "We've rethought every single component from the ground up, carefully selected it, and consistently refined it.",
  },
  {
    icon: Palette,
    title: "Elegant Design",
    description: "Very modern ebikes, with an elegant look but still robust and stable. Clean aesthetics meet cutting-edge technology.",
  },
  {
    icon: Leaf,
    title: "Green Power",
    description: "Zero emissions, responsibly sourced materials, and a commitment to a greener future for urban mobility.",
  },
  {
    icon: Target,
    title: "Go Beyond",
    description: "We want to give you the tools to go a little further than ever before. This time, beyond.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-2">The Deruiz difference</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-black">Why choose Deruiz</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <div className="flex justify-center mb-4">
                <f.icon size={36} strokeWidth={1.5} className="text-black" />
              </div>
              <h3 className="text-sm font-bold tracking-wide uppercase mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
