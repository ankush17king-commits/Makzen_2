import { Link } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import ProductImage from "./ProductImage";
import { useStore } from "../context/StoreContext";

export default function CartDrawer() {
  const { cart, isCartOpen, setCartOpen, updateQty, removeFromCart, subtotal } = useStore();
  const freeShippingLeft = Math.max(0, 599 - subtotal);

  return (
    <>
      <div
        className={`fixed inset-0 bg-charcoal/40 z-50 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setCartOpen(false)}
        aria-hidden={!isCartOpen}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-cream z-50 shadow-pouch transition-transform duration-400 ease-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!isCartOpen}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-charcoal/10">
          <h2 className="font-display font-bold text-xl flex items-center gap-2">
            <ShoppingBag size={18} /> Your Cart
          </h2>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart" className="hover:text-saffron">
            <X size={22} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-beige flex items-center justify-center">
              <ShoppingBag size={26} className="text-charcoal/40" />
            </div>
            <p className="font-semibold text-charcoal">Your cart is empty</p>
            <p className="text-sm text-charcoal/50">Looks like you haven't added any crunch yet.</p>
            <Link
              to="/shop"
              onClick={() => setCartOpen(false)}
              className="btn-primary rounded-full px-6 py-3 text-sm mt-2"
            >
              Shop Makhana
            </Link>
          </div>
        ) : (
          <>
            <div className="px-3 py-2 bg-saffron/10 text-center text-xs font-semibold text-deep-orange">
              {freeShippingLeft > 0
                ? `Add ₹${freeShippingLeft} more for FREE shipping!`
                : "You've unlocked FREE shipping!"}
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              {cart.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-3">
                  <div className="bg-beige/60 rounded-lg shrink-0 flex items-center justify-center w-20 h-20">
                    <ProductImage product={product} size={54} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{product.name}</p>
                    <p className="text-xs text-charcoal/50">{product.weight}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-charcoal/15 rounded-full">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => updateQty(product.id, qty - 1)}
                          className="p-1.5 hover:text-saffron"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold">{qty}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => updateQty(product.id, qty + 1)}
                          className="p-1.5 hover:text-saffron"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-bold text-sm">₹{product.price * qty}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    aria-label={`Remove ${product.name} from cart`}
                    className="text-charcoal/30 hover:text-deep-orange self-start"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-charcoal/10 px-5 py-5 space-y-4">
              <div className="flex items-center justify-between font-semibold">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <Link
                to="/cart"
                onClick={() => setCartOpen(false)}
                className="btn-primary rounded-full w-full py-4 text-sm block text-center"
              >
                PROCEED TO CHECKOUT
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
