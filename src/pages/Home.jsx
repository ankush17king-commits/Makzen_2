import { useEffect } from "react";
import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import ProductGrid from "../components/ProductGrid";
import FlavourFinder from "../components/FlavourFinder";
import FeaturedProduct from "../components/FeaturedProduct";
import WhyMakhana from "../components/WhyMakhana";
import BrandStory from "../components/BrandStory";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import InstagramGrid from "../components/InstagramGrid";
import FAQ from "../components/FAQ";
import Newsletter from "../components/Newsletter";
import { products } from "../data/products";

export default function Home() {
  useEffect(() => {
    document.title = "Makzen — Premium Roasted Makhana | Crunch Better";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Discover Makzen premium roasted makhana — bold flavours, satisfying crunch and better everyday snacking.");
  }, []);

  return (
    <>
      <Hero />
      <Benefits />
      <ProductGrid
        id="bestsellers"
        eyebrow="Shop Bestsellers"
        title="Meet Your New Favourites"
        subtitle="Bold flavours. Serious crunch."
        products={products}
      />
      <FlavourFinder />
      <FeaturedProduct />
      <WhyMakhana />
      <BrandStory />
      <HowItWorks />
      <Testimonials />
      <InstagramGrid />
      <FAQ />
      <Newsletter />
    </>
  );
}
