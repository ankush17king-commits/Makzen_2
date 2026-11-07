import { Link } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag, Truck, Sparkles, Gift } from "lucide-react";
import ProductImage from "./ProductImage";
import Deepak from "./Deepak";
import { useStore } from "../context/StoreContext";
import { useDiwali } from "../context/DiwaliContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    updateQty,
    removeFromCart,
    subtotal,
    freeShippingThreshold,
    shippingFee,
    discountAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    finalTotal,
  } = useStore();

  const { isDiwaliActive } = useDiwali();

  const threshold = freeShippingThreshold || 500;
  const freeShippingLeft = Math.max(0, threshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / threshold) * 100));

  return (
    <>
      <div
        className={`fixed inset-0 bg-charcoal/95 backdrop-blur-md z-50 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setCartOpen(false)}
        aria-hidden={!isCartOpen}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-[88vw] sm:w-[440px] bg-cream z-50 shadow-pouch transition-transform duration-400 ease-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!isCartOpen}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-charcoal/10 bg-beige/30">
          <h2 className="font-display font-bold text-xl flex items-center gap-2">
            <ShoppingBag size={18} /> Your Cart
            {isDiwaliActive && (
              <span className="text-[10px] bg-amber-500/15 text-deep-orange border border-amber-500/30 px-2 py-0.5 rounded-full font-sans font-bold flex items-center gap-1">
                <Deepak size={14} glow={false} /> Diwali Special
              </span>
            )}
          </h2>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart" className="hover:text-saffron p-1">
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
            {/* FREE SHIPPING PROGRESS BAR */}
            <div className="px-5 py-3 bg-amber-50 border-b border-amber-200/50">
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-charcoal">
                <span className="flex items-center gap-1.5">
                  <Truck size={14} className={freeShippingLeft === 0 ? "text-forest" : "text-deep-orange"} />
                  {freeShippingLeft > 0 ? (
                    <>
                      Add <strong className="text-deep-orange">₹{freeShippingLeft}</strong> more for{" "}
                      <strong className="text-forest">FREE Delivery</strong>!
                    </>
                  ) : (
                    <span className="text-forest font-bold">🎉 You've unlocked FREE Delivery!</span>
                  )}
                </span>
                <span className="text-[11px] text-charcoal/60">Target: ₹{threshold}</span>
              </div>

              {/* Progress bar with Diya milestone */}
              <div className="w-full bg-amber-200/50 h-2 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-forest rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {freeShippingLeft === 0 && (
                <p className="text-[11px] text-forest font-semibold mt-1 flex items-center gap-1">
                  <Gift size={12} /> Free festive Diya included with your ₹500+ Diwali order!
                </p>
              )}
            </div>

            {/* DIWALI OFFER COUPON BANNER IN CART DRAWER */}
            {isDiwaliActive && (
              <div className="mx-4 mt-3 p-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-400/40 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-deep-orange shrink-0" />
                  <div>
                    <span className="font-bold text-deep-orange block">Diwali 20% OFF Offer</span>
                    <span className="text-[11px] text-charcoal/70">
                      {appliedCoupon?.code === "DIWALI20"
                        ? "Applied: Saving 20% on order!"
                        : "Use coupon DIWALI20"}
                    </span>
                  </div>
                </div>

                {appliedCoupon?.code === "DIWALI20" ? (
                  <button
                    onClick={removeCoupon}
                    className="text-[11px] text-red-600 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => applyCoupon("DIWALI20")}
                    className="btn-diwali rounded-full px-3 py-1 text-[11px] font-bold"
                  >
                    Apply
                  </button>
                )}
              </div>
            )}

            {/* CART ITEMS LIST */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {cart.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-3 items-center bg-beige/30 p-2.5 rounded-xl border border-charcoal/5">
                  <div className="bg-beige/60 rounded-lg shrink-0 flex items-center justify-center w-16 h-16 p-1">
                    <ProductImage product={product} size={46} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{product.name}</p>
                    <p className="text-xs text-charcoal/50">{product.weight}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex items-center border border-charcoal/15 rounded-full bg-white">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => updateQty(product.id, qty - 1)}
                          className="p-1 hover:text-saffron"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-5 text-center text-xs font-semibold">{qty}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => updateQty(product.id, qty + 1)}
                          className="p-1 hover:text-saffron"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-bold text-sm text-charcoal">₹{product.price * qty}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    aria-label={`Remove ${product.name} from cart`}
                    className="text-charcoal/30 hover:text-deep-orange p-1 self-start"
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>

            {/* ORDER TOTALS & CHECKOUT */}
            <div className="border-t border-charcoal/10 px-5 py-4 space-y-2.5 bg-beige/20">
              <div className="flex items-center justify-between text-sm text-charcoal/70">
                <span>Subtotal</span>
                <span className="font-semibold text-charcoal">₹{subtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-sm text-forest font-semibold">
                  <span className="flex items-center gap-1">
                    <Sparkles size={13} /> Diwali Discount ({appliedCoupon?.code})
                  </span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-charcoal/70">
                <span>Shipping</span>
                <span className="font-semibold text-charcoal">
                  {shippingFee === 0 ? (
                    <span className="text-forest font-bold">FREE (Orders &gt; ₹500)</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="border-t border-charcoal/10 pt-2 flex items-center justify-between font-bold text-base text-charcoal">
                <span>Total</span>
                <span>₹{finalTotal}</span>
              </div>

              <Link
                to="/cart"
                onClick={() => setCartOpen(false)}
                className="btn-primary rounded-full w-full py-3.5 text-sm block text-center mt-2 shadow-md"
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
