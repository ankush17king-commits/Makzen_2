import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import ProductImage from "./ProductImage";
import { useStore } from "../context/StoreContext";

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="group relative bg-cream rounded-xl2 shadow-card overflow-hidden flex flex-col">
      <button
        onClick={() => toggleWishlist(product.id)}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={isWishlisted}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-cream/90 shadow-card flex items-center justify-center hover:scale-110 transition-transform"
      >
        <Heart size={16} className={isWishlisted ? "fill-saffron text-saffron" : "text-charcoal/60"} />
      </button>

      {product.inStock === false ? (
        <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
          OUT OF STOCK
        </span>
      ) : (
        discount > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-forest text-cream text-[11px] font-bold px-2.5 py-1 rounded-full">
            {discount}% OFF
          </span>
        )
      )}

      <Link to={`/product/${product.id}`} className="block bg-beige/50 py-8 overflow-hidden relative">
        <div className={`transition-transform duration-500 ease-out group-hover:scale-108 flex justify-center ${product.inStock === false ? "opacity-60 grayscale-[40%]" : ""}`}>
          <ProductImage product={product} size={170} />
        </div>
      </Link>

      <div className="p-4 md:p-5 flex flex-col gap-2 flex-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-bold text-lg leading-snug hover:text-saffron transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-charcoal/60 line-clamp-2 flex-1">{product.tagline}</p>

        <div className="flex items-center gap-1 text-xs text-charcoal/70">
          <Star size={13} className="fill-saffron text-saffron" />
          <span className="font-semibold">{product.rating}</span>
          <span>({product.reviewCount})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-charcoal">₹{product.price}</span>
          {product.mrp > product.price && (
            <span className="text-sm text-charcoal/40 line-through">₹{product.mrp}</span>
          )}
        </div>

        {product.inStock === false ? (
          <button
            disabled
            className="w-full bg-charcoal/10 text-charcoal/40 font-bold rounded-full py-2.5 text-xs mt-1.5 cursor-not-allowed uppercase"
          >
            Out of Stock
          </button>
        ) : (
          <button
            onClick={() => addToCart(product.id, 1)}
            className="btn-primary rounded-full py-2.5 text-xs mt-1.5 uppercase"
          >
            ADD TO CART
          </button>
        )}
      </div>
    </div>
  );
}
