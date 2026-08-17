import { Feather, Flame, Leaf, Zap } from "lucide-react";
import useReveal from "../hooks/useReveal";

const benefits = [
  { icon: Feather, title: "Light & Crunchy", desc: "A satisfying snack for any time of day." },
  { icon: Flame, title: "Roasted", desc: "Carefully roasted for that irresistible crunch." },
  { icon: Leaf, title: "Plant-Based", desc: "A naturally plant-based snack." },
  { icon: Zap, title: "Full of Flavour", desc: "Bold seasonings packed into every bite." },
];

export default function WhyMakhana() {
  const ref = useReveal();
  return (
    <section id="why-makhana" ref={ref} className="reveal bg-forest text-cream py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="max-w-xl">
          <p className="eyebrow text-saffron mb-3">Why Makhana?</p>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl mb-5">Why Makhana?</h2>
          <p className="text-cream/75 text-lg leading-relaxed">
            Forget boring snacks. Makhana gives you the crunch you crave without
            feeling like you're reaching for another bag of chips.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-cream/5 border border-cream/10 rounded-xl2 p-6 hover:bg-cream/10 transition-colors">
              <div className="w-11 h-11 rounded-full bg-saffron/20 flex items-center justify-center text-saffron mb-4">
                <Icon size={20} />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{title}</h3>
              <p className="text-sm text-cream/65 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
