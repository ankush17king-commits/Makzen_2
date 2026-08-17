import { useState } from "react";
import { ChevronDown } from "lucide-react";
import useReveal from "../hooks/useReveal";

const faqs = [
  { q: "What is makhana?", a: "Makhana, also known as fox nuts or lotus seeds, are popped seeds harvested from the lotus plant. They're naturally light, crunchy and a popular base for healthier snacking." },
  { q: "Is Makzen roasted or fried?", a: "All Makzen makhana is slow-roasted, never fried, so you get that satisfying crunch without the deep-fried oiliness." },
  { q: "What flavours does Makzen offer?", a: "We currently offer Cheese & Peri Peri, Classic Salted, Peri Peri Punch, Chatpata Masala, Cream & Onion and Pudina Twist, with more on the way." },
  { q: "How should I store Makzen?", a: "Keep the pouch sealed in a cool, dry place away from direct sunlight. Once opened, reseal tightly and consume within a few days for maximum crunch." },
  { q: "How long does delivery take?", a: "Most orders are delivered within 3–6 business days depending on your location. You'll receive tracking details as soon as your order ships." },
  { q: "Do you offer combo packs?", a: "Yes — combo packs featuring multiple flavours are available on our Shop page, often at a better price than buying individually." },
  { q: "What payment methods do you accept?", a: "We accept UPI, major debit/credit cards, net banking and popular wallets at checkout." },
  { q: "Can I return my order?", a: "Unopened, unused products can be returned within 7 days of delivery. Reach out to our support team to start a return." },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-charcoal/10">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between text-left py-5 gap-4"
      >
        <span className="font-semibold text-charcoal">{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-saffron transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-charcoal/65 leading-relaxed pb-5 pr-8">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal bg-beige/60 py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <p className="eyebrow text-deep-orange mb-2">FAQ</p>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-charcoal">Questions? Answered.</h2>
        </div>
        <div>
          {faqs.map((f) => (
            <FAQItem key={f.q} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
