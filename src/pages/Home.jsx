import { useEffect } from "react";
import Hero from "../components/Hero";
import DiwaliOfferBanner from "../components/DiwaliOfferBanner";
import Benefits from "../components/Benefits";
import ProductGrid from "../components/ProductGrid";
import FlavourFinder from "../components/FlavourFinder";
import FeaturedProduct from "../components/FeaturedProduct";
import WhyMakhana from "../components/WhyMakhana";
import BrandStory from "../components/BrandStory";
import HowItWorks from "../components/HowItWorks";
import InstagramGrid from "../components/InstagramGrid";
import FAQ from "../components/FAQ";
import Newsletter from "../components/Newsletter";
import { useStore } from "../context/StoreContext";

export default function Home() {
  const { products } = useStore();

  useEffect(() => {
    document.title = "Makzen — Premium Roasted Makhana | Shubh Deepavali!";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Discover Makzen premium roasted makhana — bold flavours, satisfying crunch and Diwali festive offers with free delivery on orders above ₹500.");
  }, []);

  return (
    <>
      <Hero />
      <DiwaliOfferBanner />
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
      <InstagramGrid />
      <FAQ />
      <Newsletter />
    </>
  );
}
