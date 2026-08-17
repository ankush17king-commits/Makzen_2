import { Star } from "lucide-react";
import useReveal from "../hooks/useReveal";

const reviews = [
  {
    quote: "Finally found a healthy snack that doesn't taste like cardboard. The Cheese & Peri Peri is insanely good.",
    name: "Aarav",
    location: "Mumbai",
  },
  {
    quote: "The crunch is addictive. I finished the entire pack during one movie.",
    name: "Riya",
    location: "Delhi",
  },
  {
    quote: "Perfect evening snack. The flavour is actually amazing.",
    name: "Karan",
    location: "Bengaluru",
  },
  {
    quote: "Ordered the combo pack for the office. It didn't survive the week.",
    name: "Sneha",
    location: "Pune",
  },
];

export default function Testimonials() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="text-center mb-12">
        <p className="eyebrow text-deep-orange mb-2">Reviews</p>
        <h2 className="font-display font-extrabold text-3xl md:text-5xl text-charcoal">Love at First Crunch</h2>
        <p className="text-xs text-charcoal/40 mt-3">Sample reviews shown for illustration — replace with real customer reviews.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {reviews.map((r) => (
          <div key={r.name} className="bg-beige/60 rounded-xl2 p-6 flex flex-col gap-3">
            <div className="flex text-saffron">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="fill-saffron" />
              ))}
            </div>
            <p className="text-sm text-charcoal/75 leading-relaxed flex-1">"{r.quote}"</p>
            <p className="text-xs font-bold text-charcoal">
              — {r.name}, <span className="font-normal text-charcoal/50">{r.location}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
