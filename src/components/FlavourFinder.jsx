import { Link } from "react-router-dom";
import useReveal from "../hooks/useReveal";

const categories = [
  { emoji: "🌶️", name: "Spicy", desc: "Peri Peri & Masala", bg: "bg-deep-orange" },
  { emoji: "🧀", name: "Cheesy", desc: "Cheese & Creamy flavours", bg: "bg-saffron" },
  { emoji: "🌿", name: "Fresh", desc: "Pudina & herb flavours", bg: "bg-forest" },
  { emoji: "🧂", name: "Classic", desc: "Salted & simple", bg: "bg-charcoal" },
];

export default function FlavourFinder() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal bg-beige/60 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12">
          <p className="eyebrow text-deep-orange mb-2">Shop by Flavour</p>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-charcoal">Find Your Crunch</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className={`${cat.bg} relative rounded-xl2 p-6 h-44 md:h-56 flex flex-col justify-end text-cream overflow-hidden group transition-transform duration-300 hover:-translate-y-1.5 shadow-card`}
            >
              <span className="absolute top-5 right-5 text-4xl md:text-5xl opacity-90 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                {cat.emoji}
              </span>
              <h3 className="font-display font-bold text-xl md:text-2xl">{cat.name}</h3>
              <p className="text-xs md:text-sm opacity-80 mt-1">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
