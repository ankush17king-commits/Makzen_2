import { Sprout, Flame, Nut, Sparkles } from "lucide-react";
import useReveal from "../hooks/useReveal";

const items = [
  { icon: Sprout, title: "Premium Ingredients" },
  { icon: Flame, title: "Roasted, Never Fried" },
  { icon: Nut, title: "Plant-Based Protein" },
  { icon: Sparkles, title: "Made for Everyday Snacking" },
];

export default function Benefits() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal bg-beige/60 border-y border-charcoal/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
        {items.map(({ icon: Icon, title }) => (
          <div key={title} className="flex flex-col items-center text-center gap-2.5">
            <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-forest shadow-card">
              <Icon size={22} />
            </div>
            <p className="text-xs md:text-sm font-bold text-charcoal leading-tight">{title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
