import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, Minus, Plus, Heart, Truck, ShieldCheck, RefreshCcw } from "lucide-react";
import ProductImage from "../components/ProductImage";
import Makhana from "../components/Makhana";
import ProductCard from "../components/ProductCard";
import { getProductById, products } from "../data/products";
import { useStore } from "../context/StoreContext";

const tabs = ["Description", "Ingredients", "FAQ"];

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, getProduct, addToCart, wishlist, toggleWishlist } = useStore();
  const product = getProduct(id);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("Description");

  useEffect(() => {
    if (product) document.title = `${product.name} — Makzen`;
    window.scrollTo({ top: 0 });
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">Product not found</h1>
        <p className="text-charcoal/60 mb-6">This flavour may have been retired or the link is incorrect.</p>
        <Link to="/shop" className="btn-primary rounded-full px-6 py-3 text-sm">
          Back to Shop
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);
  const relatedFallback = related.length ? related : products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
      <div className="text-xs text-charcoal/50 mb-6 flex gap-1.5">
        <Link to="/" className="hover:text-saffron">Home</Link> /
        <Link to="/shop" className="hover:text-saffron">Shop</Link> /
        <span className="text-charcoal">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        {/* Images */}
        <div>
          <div className="relative bg-beige/50 rounded-xl2 flex items-center justify-center py-16 mb-4">
            {product.inStock === false ? (
              <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                OUT OF STOCK
              </span>
            ) : (
              discount > 0 && (
                <span className="absolute top-4 left-4 bg-forest text-cream text-xs font-bold px-3 py-1.5 rounded-full">
                  {discount}% OFF
                </span>
              )
            )}
            <div className={product.inStock === false ? "opacity-60 grayscale-[30%]" : ""}>
              <ProductImage product={product} size={280} />
            </div>
            <Makhana size={26} className="absolute bottom-6 right-8 animate-float" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-beige/40 rounded-lg py-5 flex items-center justify-center border-2 border-transparent hover:border-saffron cursor-pointer transition-colors">
                <ProductImage product={product} size={70} />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="eyebrow text-deep-orange mb-2">{product.category}</p>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-charcoal mb-3">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-saffron">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} className={i < Math.round(product.rating) ? "fill-saffron" : "text-charcoal/15"} />
              ))}
            </div>
            <span className="text-sm text-charcoal/60">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <span className="font-bold text-3xl text-charcoal">₹{product.price}</span>
            {product.mrp > product.price && (
              <span className="text-charcoal/40 line-through text-lg">₹{product.mrp}</span>
            )}
          </div>
          <p className="text-xs text-charcoal/45 mb-6">Inclusive of all taxes • {product.weight} pouch</p>

          <p className="text-charcoal/70 leading-relaxed mb-6">{product.tagline}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {product.highlights.map((h) => (
              <span key={h} className="text-xs font-semibold bg-beige/70 text-charcoal/70 px-3 py-1.5 rounded-full">
                {h}
              </span>
            ))}
          </div>

          {product.inStock !== false ? (
            <>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-charcoal/15 rounded-full">
                  <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3.5 hover:text-saffron">
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center font-semibold">{qty}</span>
                  <button aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)} className="p-3.5 hover:text-saffron">
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  aria-pressed={isWishlisted}
                  className="w-12 h-12 rounded-full border border-charcoal/15 flex items-center justify-center hover:border-saffron transition-colors"
                >
                  <Heart size={18} className={isWishlisted ? "fill-saffron text-saffron" : "text-charcoal/50"} />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button onClick={() => addToCart(product.id, qty)} className="btn-primary rounded-full px-8 py-4 text-sm flex-1">
                  ADD TO CART
                </button>
                <button
                  onClick={() => { addToCart(product.id, qty); navigate("/cart"); }}
                  className="btn-outline rounded-full px-8 py-4 text-sm flex-1"
                >
                  BUY IT NOW
                </button>
              </div>
            </>
          ) : (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-8">
              <p className="font-bold text-red-700 text-sm">Currently Out of Stock</p>
              <p className="text-xs text-red-600/80 mt-0.5">We are roasting a fresh batch! Please check back soon.</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 text-center border-t border-charcoal/10 pt-6">
            <div className="flex flex-col items-center gap-1.5">
              <Truck size={18} className="text-forest" />
              <span className="text-[11px] text-charcoal/60 leading-tight">Free shipping above ₹599</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <ShieldCheck size={18} className="text-forest" />
              <span className="text-[11px] text-charcoal/60 leading-tight">Quality checked & sealed</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <RefreshCcw size={18} className="text-forest" />
              <span className="text-[11px] text-charcoal/60 leading-tight">7-day easy returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16 max-w-3xl">
        <div className="flex gap-6 border-b border-charcoal/10">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 text-sm font-bold transition-colors relative ${
                tab === t ? "text-saffron" : "text-charcoal/40 hover:text-charcoal"
              }`}
            >
              {t}
              {tab === t && <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-saffron rounded-full" />}
            </button>
          ))}
        </div>
        <div className="py-6 text-charcoal/70 leading-relaxed text-sm">
          {tab === "Description" && <p>{product.description}</p>}
          {tab === "Ingredients" && <p>{product.ingredients}</p>}
          {tab === "FAQ" && (
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-charcoal mb-1">Is this product roasted or fried?</p>
                <p>Roasted, never fried — always.</p>
              </div>
              <div>
                <p className="font-semibold text-charcoal mb-1">How long does it stay fresh once opened?</p>
                <p>Reseal the pouch tightly and enjoy within a few days for the best crunch.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      <div className="mt-16">
        <h2 className="font-display font-bold text-2xl md:text-3xl mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {relatedFallback.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
