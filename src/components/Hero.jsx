import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Makhana from "./Makhana";
import { productImages } from "../assets/images";

const heroPhoto = productImages["cheese-peri-peri"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-10 md:pt-16 pb-16 md:pb-24 grid md:grid-cols-2 gap-10 md:gap-8 items-center">
        {/* Left: copy */}
        <div className="relative z-10 text-center md:text-left">
          <p className="eyebrow text-deep-orange animate-fadeUp" style={{ animationDelay: "0.05s" }}>
            Premium Roasted Makhana
          </p>
          <h1
            className="font-display font-black text-charcoal leading-[0.98] mt-4 animate-fadeUp"
            style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)", animationDelay: "0.15s" }}
          >
            Crunch
            <br />
            that makes
            <br />
            <span className="text-saffron">sense.</span>
          </h1>
          <p
            className="mt-6 text-charcoal/70 text-lg max-w-md mx-auto md:mx-0 animate-fadeUp"
            style={{ animationDelay: "0.3s" }}
          >
            Light, crunchy and packed with flavour. Meet Makzen — roasted makhana
            made for smarter everyday snacking.
          </p>
          <div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fadeUp"
            style={{ animationDelay: "0.45s" }}
          >
            <Link to="/shop" className="btn-primary rounded-full px-8 py-4 text-sm inline-flex items-center justify-center gap-2">
              Shop Makhana <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="btn-outline rounded-full px-8 py-4 text-sm inline-flex items-center justify-center">
              Explore Our Story
            </Link>
          </div>
        </div>

        {/* Right: product visual */}
        <div className="relative flex items-center justify-center h-[380px] sm:h-[440px] md:h-[520px]">
          <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-beige/80 blur-[2px]" />
          <div className="absolute w-[220px] h-[220px] md:w-[300px] md:h-[300px] rounded-full bg-saffron/10" />

          <div className="relative z-10 animate-fadeUp drop-shadow-[0_40px_60px_rgba(39,35,31,0.25)]" style={{ animationDelay: "0.2s" }}>
            <img src={heroPhoto} alt="Makzen Cheese & Peri Peri roasted makhana pouch, 60g" className="w-[240px] sm:w-[280px] md:w-[340px] h-auto" />
          </div>

          {/* floating badges */}
          <span className="absolute top-6 left-2 md:left-0 bg-cream shadow-card rounded-full px-4 py-2 text-xs font-bold text-forest animate-float">
            ROASTED
          </span>
          <span
            className="absolute bottom-16 left-0 md:-left-4 bg-cream shadow-card rounded-full px-4 py-2 text-xs font-bold text-deep-orange animate-floatSlow"
            style={{ animationDelay: "1s" }}
          >
            CRUNCHY
          </span>
          <span
            className="absolute top-20 right-0 md:-right-2 bg-cream shadow-card rounded-full px-4 py-2 text-xs font-bold text-saffron animate-float"
            style={{ animationDelay: "2s" }}
          >
            FLAVOURFUL
          </span>

          {/* floating makhana pieces */}
          <Makhana size={34} className="absolute bottom-6 right-8 animate-floatSlow" />
          <Makhana size={24} className="absolute top-4 right-16 animate-float" style={{ animationDelay: "0.6s" }} />
          <Makhana size={28} className="absolute bottom-24 left-10 animate-float" style={{ animationDelay: "1.4s" }} />
        </div>
      </div>
    </section>
  );
}
