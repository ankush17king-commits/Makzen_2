import { Hand, Flame, Sparkles } from "lucide-react";
import useReveal from "../hooks/useReveal";

const steps = [
  { num: "01", icon: Hand, title: "Select", desc: "Premium makhana carefully selected." },
  { num: "02", icon: Flame, title: "Roast", desc: "Slowly roasted to create the perfect crunch." },
  { num: "03", icon: Sparkles, title: "Flavour", desc: "Coated with bold, delicious seasoning." },
];

export default function HowItWorks() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal bg-beige/60 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="eyebrow text-deep-orange mb-2">Our Process</p>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-charcoal">How We Make It</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 md:gap-6 relative">
          {steps.map(({ num, icon: Icon, title, desc }, i) => (
            <div key={num} className="relative text-center md:text-left">
              <div className="flex items-center gap-4 md:flex-col md:items-start justify-center md:justify-start">
                <span className="font-display text-5xl md:text-6xl font-black text-saffron/25">{num}</span>
                <div className="w-14 h-14 rounded-full bg-cream shadow-card flex items-center justify-center text-forest md:-mt-8 md:ml-2">
                  <Icon size={24} />
                </div>
              </div>
              <h3 className="font-display font-bold text-xl mt-4">{title}</h3>
              <p className="text-sm text-charcoal/60 mt-2 max-w-xs mx-auto md:mx-0">{desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[calc(100%-1rem)] w-[calc(100%-2rem)] border-t-2 border-dashed border-saffron/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
