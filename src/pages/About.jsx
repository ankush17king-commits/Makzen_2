import { useEffect } from "react";
import BrandStory from "../components/BrandStory";
import WhyMakhana from "../components/WhyMakhana";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";

export default function About() {
  useEffect(() => {
    document.title = "Our Story — Makzen";
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, []);

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-14 md:pt-20 pb-4 text-center">
        <p className="eyebrow text-deep-orange mb-3">About Makzen</p>
        <h1 className="font-display font-extrabold text-4xl md:text-6xl text-charcoal leading-tight">
          A snack built for how you actually snack.
        </h1>
      </div>
      <BrandStory />
      <HowItWorks />
      <WhyMakhana />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
