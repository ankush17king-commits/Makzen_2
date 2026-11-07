import { useState } from "react";
import { Link } from "react-router-dom";
import { Gift, Truck, Sparkles, Copy, Check, ArrowRight } from "lucide-react";
import Deepak from "./Deepak";
import { useDiwali } from "../context/DiwaliContext";
import { useStore } from "../context/StoreContext";

export default function DiwaliOfferBanner() {
  const { isDiwaliActive, formattedTimer, litCount, lightDiya } = useDiwali();
  const { applyCoupon, appliedCoupon, addToCart, showToast } = useStore();
  const [copied, setCopied] = useState(false);

  if (!isDiwaliActive) return null;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText("DIWALI20");
    applyCoupon("DIWALI20");
    setCopied(true);
    showToast("🎉 Coupon 'DIWALI20' copied & applied for 20% OFF!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddGiftBox = () => {
    addToCart("diwali-gift-box", 1);
  };

  return (
    <section
      id="diwali-offers"
      className="relative overflow-hidden py-12 md:py-16 bg-gradient-to-b from-[#1C060B] via-[#2A0910] to-[#140306] text-cream"
    >
      {/* Background ambient glow & decorative floating sparkles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Top Header with Diyas & Wishes */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Deepak size={32} flameSpeed="fast" />
            <span className="eyebrow text-diwali-gold tracking-widest text-xs font-bold">
              3-DAY FESTIVE DHAMAKA • SHUBH DEEPAVALI
            </span>
            <Deepak size={32} flameSpeed="fast" />
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-gold-gradient tracking-tight">
            Best Diwali Offers & Wishes
          </h2>

          <p className="mt-3 text-cream/80 text-base md:text-lg font-body leading-relaxed">
            Light up your festive celebrations with wholesome, guilt-free roasted makhana crunch.
            Enjoy India's best festive perks for the next 3 days!
          </p>

          {/* Festive Countdown Timer Pill */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-amber-500/15 border border-diwali-gold/40 shadow-inner">
            <span className="text-xs uppercase tracking-wider text-amber-200 font-semibold">Festive Sale Ends In:</span>
            <span className="font-mono font-bold text-diwali-gold text-sm tracking-wider">
              {formattedTimer}
            </span>
          </div>
        </div>

        {/* 3 Core Diwali Offers Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Offer 1: Free Delivery Above ₹500 */}
          <div className="bg-white/5 border border-amber-500/25 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm hover:border-diwali-gold/60 transition-all duration-300">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Truck size={120} />
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-charcoal mb-4 shadow-md">
              <Truck size={24} />
            </div>
            <span className="eyebrow text-diwali-gold text-[10px]">DIWALI OFFER #1</span>
            <h3 className="font-display font-bold text-xl text-cream mt-1">
              FREE Delivery on Orders &gt; ₹500
            </h3>
            <p className="text-sm text-cream/75 mt-2 leading-relaxed">
              Standard ₹49 shipping is 100% waived off on every order of ₹500 or more anywhere across India!
            </p>
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center text-xs text-amber-300 font-semibold">
              <Check size={14} className="mr-1.5 text-diwali-gold" /> Applied automatically at checkout
            </div>
          </div>

          {/* Offer 2: Flat 20% OFF */}
          <div className="bg-gradient-to-b from-amber-500/20 to-red-900/30 border-2 border-diwali-gold rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm shadow-diya">
            <div className="absolute top-3 right-3 bg-diwali-gold text-charcoal font-black text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full shadow">
              MOST POPULAR
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-diwali-gold to-amber-600 flex items-center justify-center text-charcoal mb-4 shadow-md">
              <Sparkles size={24} />
            </div>
            <span className="eyebrow text-diwali-gold text-[10px]">DIWALI OFFER #2</span>
            <h3 className="font-display font-bold text-xl text-cream mt-1">
              FLAT 20% OFF Everything
            </h3>
            <p className="text-sm text-cream/75 mt-2 leading-relaxed">
              Save 20% across our entire roasted makhana catalogue and festive gift boxes.
            </p>

            {/* Coupon Code Pill */}
            <div className="mt-4 flex items-center justify-between bg-black/40 border border-diwali-gold/50 rounded-xl p-2 px-3">
              <div>
                <span className="text-[10px] text-cream/60 uppercase block">Coupon Code</span>
                <span className="font-mono font-bold text-diwali-gold text-base tracking-wider">DIWALI20</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="btn-diwali rounded-lg px-3 py-1.5 text-xs font-bold inline-flex items-center gap-1.5"
              >
                {copied || appliedCoupon?.code === "DIWALI20" ? (
                  <>
                    <Check size={14} /> Applied!
                  </>
                ) : (
                  <>
                    <Copy size={13} /> Copy & Apply
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Offer 3: Free Handcrafted Diya */}
          <div className="bg-white/5 border border-amber-500/25 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm hover:border-diwali-gold/60 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-cream mb-4 shadow-md">
              <Deepak size={28} glow={false} />
            </div>
            <span className="eyebrow text-diwali-gold text-[10px]">DIWALI OFFER #3</span>
            <h3 className="font-display font-bold text-xl text-cream mt-1">
              Free Handcrafted Diya & Gift Box
            </h3>
            <p className="text-sm text-cream/75 mt-2 leading-relaxed">
              Every festive order above ₹500 includes an auspicious decorative terracotta/brass Diya and luxury festive packaging!
            </p>
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center text-xs text-amber-300 font-semibold">
              <Gift size={14} className="mr-1.5 text-diwali-gold" /> Included free inside every ₹500+ order
            </div>
          </div>
        </div>

        {/* Featured Limited Edition Diwali Royal Gift Box Card */}
        <div className="bg-gradient-to-r from-[#3B0E17] via-[#2A0910] to-[#3B0E17] border border-diwali-gold/50 rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-diwali-gold/15 text-diwali-gold px-3 py-1 rounded-full text-xs font-bold border border-diwali-gold/30 mb-3">
              <Gift size={14} /> LIMITED FESTIVE EDITION
            </div>
            <h3 className="font-display font-black text-2xl md:text-3xl text-cream">
              Diwali Royal Celebration Box (4-Pack)
            </h3>
            <p className="text-cream/80 text-sm md:text-base mt-2 max-w-xl">
              All 4 signature roasted flavours (Cheese & Peri Peri, Rock Salted, Peri Peri Punch, Cream & Onion) + handcrafted decorative festive Diya packed in a royal golden gift box.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4 justify-center lg:justify-start">
              <div className="flex items-baseline gap-2">
                <span className="font-display font-black text-2xl md:text-3xl text-diwali-gold">
                  ₹649
                </span>
                <span className="text-cream/50 line-through text-sm">₹899</span>
                <span className="text-xs bg-red-600/40 text-red-200 px-2 py-0.5 rounded-full font-bold">
                  28% OFF
                </span>
              </div>
              <span className="text-xs text-amber-300 font-semibold flex items-center gap-1 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                <Truck size={13} /> FREE Delivery Included
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              onClick={handleAddGiftBox}
              className="btn-diwali rounded-full px-6 py-3.5 text-sm font-bold flex items-center justify-center gap-2"
            >
              <Gift size={16} /> Add Gift Box to Cart
            </button>
            <Link
              to="/product/diwali-gift-box"
              className="rounded-full px-6 py-3.5 text-sm font-bold border border-cream/30 hover:bg-white/10 text-cream flex items-center justify-center gap-1.5 transition-colors"
            >
              View Details <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Community Diya Wishes Counter & Interactive Light Button */}
        <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-cream/70">
          <div className="flex items-center gap-2">
            <Deepak size={24} interactive={true} onLight={lightDiya} />
            <span>
              <strong className="text-diwali-gold">{litCount.toLocaleString()}</strong> festive lamps lit by Makzen shoppers!
            </span>
          </div>
          <span className="hidden sm:inline text-cream/30">•</span>
          <button
            onClick={lightDiya}
            className="hover:text-diwali-gold text-cream/90 underline underline-offset-4 font-semibold transition-colors flex items-center gap-1"
          >
            Click here to light your Diya & spread prosperity! ✨
          </button>
        </div>
      </div>
    </section>
  );
}
