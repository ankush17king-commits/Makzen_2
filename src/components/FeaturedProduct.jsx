import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Minus, Plus } from "lucide-react";
import ProductImage from "./ProductImage";
import Makhana from "./Makhana";
import useReveal from "../hooks/useReveal";
import { useStore } from "../context/StoreContext";
import { getProductById } from "../data/products";

export default function FeaturedProduct() {
  const ref = useReveal();
  const [qty, setQty] = useState(1);
  const { addToCart } = useStore();
  const navigate = useNavigate();
  const product = getProductById("cheese-peri-peri");

  const handleBuyNow = () => {
    addToCart(product.id, qty);
    navigate("/cart");
  };

  return (
    <section ref={ref} className="reveal max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      <div className="relative flex justify-center order-1">
        <div className="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full bg-beige" />
        <ProductImage product={product} size={300} className="relative z-10" />
        <Makhana size={30} className="absolute bottom-8 right-4 md:right-10 animate-float" />
        <Makhana size={22} className="absolute top-8 left-4 md:left-10 animate-floatSlow" />
      </div>

      <div className="order-2">
        <p className="eyebrow text-deep-orange mb-3">The one that started it all</p>
        <h2 className="font-display font-extrabold text-3xl md:text-4xl text-charcoal leading-tight">
          Cheesy. Spicy.
          <br /> Ridiculously crunchy.
        </h2>
        <p className="mt-5 text-charcoal/70 leading-relaxed max-w-md">{product.description}</p>

        <div className="flex items-center gap-2 mt-5">
          <div className="flex text-saffron">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="fill-saffron" />
            ))}
          </div>
          <span className="text-sm text-charcoal/60">{product.rating}/5 from snack lovers</span>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="font-bold text-3xl text-charcoal">₹{product.price}</span>
          <span className="text-charcoal/40 line-through">₹{product.mrp}</span>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex items-center border border-charcoal/15 rounded-full">
            <button
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="p-3 hover:text-saffron"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center font-semibold">{qty}</span>
            <button aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)} className="p-3 hover:text-saffron">
              <Plus size={14} />
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button onClick={() => addToCart(product.id, qty)} className="btn-primary rounded-full px-8 py-4 text-sm">
            ADD TO CART
          </button>
          <button onClick={handleBuyNow} className="btn-outline rounded-full px-8 py-4 text-sm">
            BUY IT NOW
          </button>
        </div>
      </div>
    </section>
  );
}
