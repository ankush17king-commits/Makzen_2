import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, SearchX, Sparkles } from "lucide-react";
import ProductCard from "../components/ProductCard";
import Deepak from "../components/Deepak";
import { useStore } from "../context/StoreContext";
import { useDiwali } from "../context/DiwaliContext";

const categories = ["All", "Festive Combos", "Spicy", "Cheesy", "Classic"];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export default function Shop() {
  const { products } = useStore();
  const { isDiwaliActive } = useDiwali();
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [sort, setSort] = useState("featured");
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    document.title = "Shop All Flavours — Makzen";
  }, []);

  useEffect(() => {
    const cat = searchParams.get("category");
    const q = searchParams.get("q");
    if (cat) setCategory(cat);
    if (q !== null) setQuery(q);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q))
      );
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, category, sort, query]);

  const handleCategory = (cat) => {
    setCategory(cat);
    const next = new URLSearchParams(searchParams);
    if (cat === "All") next.delete("category");
    else next.set("category", cat);
    setSearchParams(next);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
      <div className="text-center mb-10">
        <p className="eyebrow text-deep-orange mb-2">Full Collection</p>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-charcoal">Shop All Flavours</h1>
        {query && <p className="text-charcoal/50 mt-3 text-sm">Showing results for "{query}"</p>}
      </div>

      {isDiwaliActive && (
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-[#2A0810] via-[#48101A] to-[#2A0810] text-cream border border-diwali-gold/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <Deepak size={32} flameSpeed="fast" />
            <div>
              <span className="font-display font-bold text-base text-gold-gradient block">
                Diwali Dhamaka Offers Active (3-Day Fest)
              </span>
              <span className="text-xs text-cream/80">
                FREE Delivery on all orders above ₹500 across India • Extra 20% OFF with code <strong className="font-mono text-diwali-gold">DIWALI20</strong>
              </span>
            </div>
          </div>
          <button
            onClick={() => handleCategory("Festive Combos")}
            className="btn-diwali rounded-full px-4 py-2 text-xs font-bold shrink-0 flex items-center gap-1.5"
          >
            <Sparkles size={13} /> View Diwali Gift Boxes
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
                category === cat
                  ? "bg-saffron text-cream border-saffron"
                  : "bg-transparent text-charcoal border-charcoal/15 hover:border-saffron"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <SlidersHorizontal size={15} className="text-charcoal/50" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-cream border border-charcoal/15 rounded-full px-4 py-2 text-xs font-semibold outline-none cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <SearchX size={40} className="text-charcoal/25" />
          <p className="font-semibold text-charcoal">No products found</p>
          <p className="text-sm text-charcoal/50 max-w-xs">
            Try a different flavour category or search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
