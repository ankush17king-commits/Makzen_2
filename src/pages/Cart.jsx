import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, Lock } from "lucide-react";
import ProductImage from "../components/ProductImage";
import { useStore } from "../context/StoreContext";

export default function Cart() {
  const { cart, updateQty, removeFromCart, subtotal, showToast } = useStore();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const shipping = subtotal >= 599 || subtotal === 0 ? 0 : 49;
  const total = subtotal + shipping;

  useEffect(() => {
    document.title = "Your Cart — Makzen";
  }, []);

  const handleCheckout = () => {
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      showToast("This is a demo checkout — connect a payment gateway to accept real orders.");
    }, 900);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-beige flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={30} className="text-charcoal/40" />
        </div>
        <h1 className="font-display text-3xl font-bold mb-3">Your cart is empty</h1>
        <p className="text-charcoal/60 mb-8">Looks like you haven't added any crunch yet.</p>
        <Link to="/shop" className="btn-primary rounded-full px-8 py-4 text-sm">
          Shop Makhana
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16">
      <h1 className="font-display font-extrabold text-3xl md:text-4xl mb-10">Your Cart</h1>

      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <div className="space-y-5">
          {cart.map(({ product, qty }) => (
            <div key={product.id} className="flex gap-4 bg-beige/40 rounded-xl2 p-4">
              <div className="bg-cream rounded-lg shrink-0 flex items-center justify-center w-24 h-24">
                <ProductImage product={product} size={64} />
              </div>
              <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <Link to={`/product/${product.id}`} className="font-display font-bold hover:text-saffron">
                    {product.name}
                  </Link>
                  <p className="text-xs text-charcoal/50 mt-1">{product.weight}</p>
                  <p className="font-bold text-sm mt-2 sm:hidden">₹{product.price * qty}</p>
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex items-center border border-charcoal/15 rounded-full bg-cream">
                    <button aria-label="Decrease quantity" onClick={() => updateQty(product.id, qty - 1)} className="p-2.5 hover:text-saffron">
                      <Minus size={13} />
                    </button>
                    <span className="w-7 text-center text-sm font-semibold">{qty}</span>
                    <button aria-label="Increase quantity" onClick={() => updateQty(product.id, qty + 1)} className="p-2.5 hover:text-saffron">
                      <Plus size={13} />
                    </button>
                  </div>
                  <span className="font-bold hidden sm:block w-16 text-right">₹{product.price * qty}</span>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    aria-label={`Remove ${product.name}`}
                    className="text-charcoal/30 hover:text-deep-orange"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-beige/60 rounded-xl2 p-6 h-fit sticky top-24">
          <h2 className="font-display font-bold text-xl mb-5">Order Summary</h2>
          <div className="space-y-3 text-sm text-charcoal/70">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-charcoal">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-charcoal">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
            </div>
          </div>
          <div className="border-t border-charcoal/10 my-4" />
          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={placing}
            className="btn-primary rounded-full w-full py-4 text-sm inline-flex items-center justify-center gap-2 disabled:opacity-70"
          >
            <Lock size={14} /> {placing ? "Processing..." : "PROCEED TO CHECKOUT"}
          </button>
          <p className="text-[11px] text-charcoal/45 text-center mt-3">
            Secure checkout — demo UI, ready to connect to a payment gateway.
          </p>
        </div>
      </div>
    </div>
  );
}
