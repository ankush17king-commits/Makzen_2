import Makhana from "./Makhana";
import useReveal from "../hooks/useReveal";

export default function BrandStory() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      <div>
        <p className="eyebrow text-deep-orange mb-3">Our Story</p>
        <h2 className="font-display font-extrabold text-3xl md:text-5xl text-charcoal leading-tight mb-6">
          Snacking, reinvented.
        </h2>
        <div className="space-y-4 text-charcoal/70 leading-relaxed max-w-lg">
          <p>
            Makzen was created with a simple idea — healthy snacking shouldn't
            mean boring snacking.
          </p>
          <p>
            We took the humble makhana and gave it a modern twist: premium
            ingredients, bold flavours and an addictive crunch.
          </p>
          <p>
            From study sessions to office breaks, movie nights to road trips —
            Makzen is made to be the snack you actually look forward to.
          </p>
        </div>
      </div>

      <div className="relative rounded-xl2 bg-beige aspect-[4/5] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, #E8891220 0, transparent 40%), radial-gradient(circle at 80% 70%, #174A3520 0, transparent 45%)"
        }} />
        <div className="grid grid-cols-3 gap-6 relative z-10 p-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <Makhana
              key={i}
              size={44}
              className={i % 2 === 0 ? "animate-float" : "animate-floatSlow"}
              style={{ animationDelay: `${(i % 5) * 0.3}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
