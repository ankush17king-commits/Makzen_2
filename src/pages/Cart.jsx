import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, CheckCircle2, MessageSquare, ArrowRight, Truck, ShieldCheck } from "lucide-react";
import ProductImage from "../components/ProductImage";
import { useStore } from "../context/StoreContext";

const STORE_PHONE = "+91 7000909219";
const STORE_WA_NUMBER = "917000909219";

export default function Cart() {
  const { cart, updateQty, removeFromCart, clearCart, subtotal, showToast } = useStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "",
    paymentMethod: "upi_whatsapp", // upi_whatsapp | cod
  });

  const shipping = subtotal >= 599 || subtotal === 0 ? 0 : 49;
  const total = subtotal + shipping;

  useEffect(() => {
    document.title = confirmedOrder ? "Order Confirmed! — Makzen" : "Your Cart — Makzen";
  }, [confirmedOrder]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      showToast("Please fill in your name, phone number, and address.");
      return;
    }

    setPlacing(true);

    setTimeout(() => {
      const orderId = `MKZ-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderDate = new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });

      const paymentMethodLabel =
        formData.paymentMethod === "upi_whatsapp"
          ? "UPI / Online (via WhatsApp)"
          : "Cash on Delivery (COD)";

      const orderDetails = {
        orderId,
        date: orderDate,
        items: [...cart],
        subtotal,
        shipping,
        total,
        customer: { ...formData },
        paymentMethod: paymentMethodLabel,
      };

      const itemsText = cart
        .map((i) => `• ${i.product.name} (x${i.qty}) - ₹${i.product.price * i.qty}`)
        .join("\n");

      const waMessage = encodeURIComponent(
        `*🛒 NEW ORDER PLACED — MAKZEN*\n` +
        `------------------------------------\n` +
        `*Order ID:* #${orderId}\n` +
        `*Date:* ${orderDate}\n` +
        `*Customer Name:* ${formData.name}\n` +
        `*Customer Phone:* ${formData.phone}\n` +
        `*Delivery Address:*\n${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode || "N/A"}\n` +
        `------------------------------------\n` +
        `*Items Ordered:*\n${itemsText}\n` +
        `------------------------------------\n` +
        `*Subtotal:* ₹${subtotal}\n` +
        `*Shipping:* ${shipping === 0 ? "FREE" : `₹${shipping}`}\n` +
        `*Total Amount:* ₹${total}\n` +
        `*Payment Preference:* ${paymentMethodLabel}\n` +
        `------------------------------------\n` +
        `_Please confirm and process this order!_`
      );

      const waUrl = `https://wa.me/${STORE_WA_NUMBER}?text=${waMessage}`;

      setConfirmedOrder({ ...orderDetails, waUrl });
      clearCart();
      setPlacing(false);
      setIsCheckingOut(false);
      showToast("🎉 Order Confirmed! Message generated.");

      // Open WhatsApp chat to send order message
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }, 900);
  };

  if (confirmedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="bg-cream border border-charcoal/10 rounded-2xl p-6 md:p-10 shadow-sm text-center">
          <div className="w-20 h-20 bg-forest/10 text-forest rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-forest" />
          </div>

          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-saffron/20 text-deep-orange mb-3">
            Order Confirmed
          </span>

          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-charcoal mb-2">
            Thank you for your order!
          </h1>
          <p className="text-charcoal/70 mb-6 max-w-md mx-auto">
            Your order <span className="font-bold text-charcoal">#{confirmedOrder.orderId}</span> has been confirmed. Order details have been prepared for WhatsApp (<span className="font-semibold text-charcoal">{STORE_PHONE}</span>).
          </p>

          <div className="p-4 bg-beige/60 rounded-xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                <MessageSquare size={20} />
              </div>
              <div>
                <p className="font-bold text-sm text-charcoal">WhatsApp Order Details Sent</p>
                <p className="text-xs text-charcoal/60">Target: {STORE_PHONE}</p>
              </div>
            </div>
            <a
              href={confirmedOrder.waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase px-5 py-3 rounded-full transition-colors shrink-0 shadow-sm"
            >
              Open WhatsApp Again <ArrowRight size={14} />
            </a>
          </div>

          <div className="text-left border-t border-charcoal/10 pt-6 space-y-5">
            <h2 className="font-bold text-lg text-charcoal">Order Summary</h2>
            
            <div className="space-y-3">
              {confirmedOrder.items.map(({ product, qty }) => (
                <div key={product.id} className="flex justify-between items-center text-sm py-2 border-b border-charcoal/5">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-charcoal">{qty}x</span>
                    <span className="text-charcoal/80">{product.name}</span>
                  </div>
                  <span className="font-bold text-charcoal">₹{product.price * qty}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2 text-sm text-charcoal/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{confirmedOrder.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{confirmedOrder.shipping === 0 ? "FREE" : `₹${confirmedOrder.shipping}`}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-charcoal pt-2 border-t border-charcoal/10">
                <span>Total Amount</span>
                <span>₹{confirmedOrder.total}</span>
              </div>
            </div>

            <div className="bg-beige/40 rounded-xl p-4 text-xs space-y-1 text-charcoal/80">
              <p><span className="font-bold">Customer:</span> {confirmedOrder.customer.name} ({confirmedOrder.customer.phone})</p>
              <p><span className="font-bold">Delivery Address:</span> {confirmedOrder.customer.address}, {confirmedOrder.customer.city}, {confirmedOrder.customer.state} - {confirmedOrder.customer.pincode}</p>
              <p><span className="font-bold">Payment Method:</span> {confirmedOrder.paymentMethod}</p>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              to="/shop"
              className="btn-primary rounded-full px-8 py-3.5 text-sm inline-flex items-center gap-2"
            >
              Continue Shopping <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
      <h1 className="font-display font-extrabold text-3xl md:text-4xl mb-10">
        {isCheckingOut ? "Order Checkout" : "Your Cart"}
      </h1>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10">
        {!isCheckingOut ? (
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
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => updateQty(product.id, qty - 1)}
                        className="p-2.5 hover:text-saffron"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-7 text-center text-sm font-semibold">{qty}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => updateQty(product.id, qty + 1)}
                        className="p-2.5 hover:text-saffron"
                      >
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
        ) : (
          <form onSubmit={handlePlaceOrder} className="bg-beige/40 rounded-xl2 p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal/10">
              <div>
                <h2 className="font-bold text-lg text-charcoal">Delivery & Contact Details</h2>
                <p className="text-xs text-charcoal/60">Your order will be sent to WhatsApp {STORE_PHONE}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsCheckingOut(false)}
                className="text-xs font-semibold text-deep-orange hover:underline"
              >
                Back to Cart
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-charcoal/70 mb-1 block">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-charcoal/15 px-4 py-3 bg-cream outline-none focus:border-saffron text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-charcoal/70 mb-1 block">WhatsApp / Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-charcoal/15 px-4 py-3 bg-cream outline-none focus:border-saffron text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-charcoal/70 mb-1 block">Delivery Address *</label>
              <textarea
                name="address"
                required
                rows={2}
                placeholder="House/Flat No., Street, Landmark"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-charcoal/15 px-4 py-3 bg-cream outline-none focus:border-saffron text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-charcoal/70 mb-1 block">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-charcoal/15 px-3 py-2.5 bg-cream outline-none focus:border-saffron text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-charcoal/70 mb-1 block">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-charcoal/15 px-3 py-2.5 bg-cream outline-none focus:border-saffron text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-charcoal/70 mb-1 block">PIN Code</label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="302001"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-charcoal/15 px-3 py-2.5 bg-cream outline-none focus:border-saffron text-sm"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-charcoal/10">
              <label className="text-xs font-bold text-charcoal/70 mb-2 block">Payment Preference</label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`border rounded-xl p-3.5 flex items-center gap-2.5 cursor-pointer transition-all ${
                    formData.paymentMethod === "upi_whatsapp"
                      ? "border-forest bg-forest/5 text-forest font-semibold"
                      : "border-charcoal/15 bg-cream text-charcoal/70"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi_whatsapp"
                    checked={formData.paymentMethod === "upi_whatsapp"}
                    onChange={handleInputChange}
                    className="accent-forest"
                  />
                  <span className="text-xs sm:text-sm">UPI / Online (WhatsApp)</span>
                </label>

                <label
                  className={`border rounded-xl p-3.5 flex items-center gap-2.5 cursor-pointer transition-all ${
                    formData.paymentMethod === "cod"
                      ? "border-forest bg-forest/5 text-forest font-semibold"
                      : "border-charcoal/15 bg-cream text-charcoal/70"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleInputChange}
                    className="accent-forest"
                  />
                  <span className="text-xs sm:text-sm">Cash on Delivery</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={placing}
              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-full w-full py-4 text-sm inline-flex items-center justify-center gap-2 disabled:opacity-70 mt-4 transition-colors shadow-sm"
            >
              <MessageSquare size={16} />
              {placing ? "Confirming Order..." : `CONFIRM & SEND ORDER VIA WHATSAPP (₹${total})`}
            </button>
          </form>
        )}

        {/* ORDER SUMMARY SIDEBAR */}
        <div className="bg-beige/60 rounded-xl2 p-6 h-fit sticky top-24">
          <h2 className="font-display font-bold text-xl mb-5">Order Summary</h2>
          <div className="space-y-3 text-sm text-charcoal/70">
            <div className="flex justify-between">
              <span>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
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

          {!isCheckingOut && (
            <button
              onClick={() => setIsCheckingOut(true)}
              className="btn-primary rounded-full w-full py-4 text-sm inline-flex items-center justify-center gap-2"
            >
              PROCEED TO CHECKOUT
            </button>
          )}

          <div className="mt-6 space-y-2.5 text-[12px] text-charcoal/65">
            <div className="flex items-center gap-2">
              <Truck size={14} className="text-forest shrink-0" /> Free delivery across India on orders above ₹599.
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare size={14} className="text-[#25D366] shrink-0" /> Orders are directly sent to WhatsApp at {STORE_PHONE}.
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-forest shrink-0" /> Instant confirmation & personal support.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
