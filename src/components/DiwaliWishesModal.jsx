import { useState } from "react";
import { X, Sparkles, Gift, Check, ArrowRight, Flame } from "lucide-react";
import Deepak from "./Deepak";
import { useDiwali } from "../context/DiwaliContext";
import { useStore } from "../context/StoreContext";
import { Link } from "react-router-dom";

export default function DiwaliWishesModal({ isOpen, onClose }) {
  const { isDiwaliActive, formattedTimer, litCount, lightDiya } = useDiwali();
  const { applyCoupon, appliedCoupon } = useStore();
  const [copied, setCopied] = useState(false);
  const [justLit, setJustLit] = useState(false);

  if (!isOpen || !isDiwaliActive) return null;

  const handleLightDiya = () => {
    lightDiya();
    setJustLit(true);
    setTimeout(() => setJustLit(false), 2000);
  };

  const handleApplyOffer = () => {
    applyCoupon("DIWALI20");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm animate-fadeUp">
      <div
        className="relative w-full max-w-lg bg-gradient-to-b from-[#2D0B12] via-[#1F070B] to-[#140407] text-cream rounded-2xl p-6 sm:p-8 shadow-2xl border border-diwali-gold/30 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Happy Diwali Greetings and Festive Offer"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-cream/70 hover:text-diwali-gold transition-colors p-1 rounded-full hover:bg-white/10"
          aria-label="Close Diwali Wishes"
        >
          <X size={20} />
        </button>

        {/* Festive Golden Top Pattern / Diyas */}
        <div className="flex items-center justify-center gap-4 mb-3">
          <Deepak size={36} flameSpeed="fast" />
          <div className="text-center">
            <span className="eyebrow text-diwali-gold tracking-widest text-[11px] block">
              ✨ 3-DAY FESTIVE CELEBRATION ✨
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-gold-gradient mt-1">
              शुभ दीपावली
            </h2>
          </div>
          <Deepak size={36} flameSpeed="fast" />
        </div>

        {/* Heartfelt Wishes */}
        <p className="text-center text-cream/90 text-sm sm:text-base leading-relaxed mt-2 font-display italic">
          "May the divine glow of lamps illuminate your journey with boundless joy, prosperity, good health, and guilt-free crunch!"
        </p>

        {/* Interactive Diya Lighting Area */}
        <div className="my-5 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-diwali-gold/30 text-center relative overflow-hidden">
          <div className="flex flex-col items-center justify-center">
            <div className="relative cursor-pointer" onClick={handleLightDiya}>
              <Deepak size={68} interactive={true} flameSpeed="normal" onLight={handleLightDiya} />
              {justLit && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-diwali-gold text-charcoal font-bold text-xs px-2.5 py-0.5 rounded-full shadow-lg animate-bounce">
                  ✨ Diya Lit! Blessings to you! ✨
                </div>
              )}
            </div>

            <button
              onClick={handleLightDiya}
              className="mt-2.5 text-xs font-bold text-diwali-gold hover:text-amber-300 flex items-center gap-1.5 transition-colors bg-diwali-gold/10 px-3 py-1 rounded-full border border-diwali-gold/30"
            >
              <Flame size={14} className="text-amber-400" />
              Click Diya to Spread Light • {litCount.toLocaleString()} Diyas Lit
            </button>
          </div>
        </div>

        {/* BEST DIWALI OFFER HIGHLIGHT */}
        <div className="bg-diwali-maroon/60 rounded-xl p-4 border border-amber-500/40 space-y-3">
          <div className="flex items-center justify-between text-xs text-amber-300 font-semibold">
            <span className="flex items-center gap-1">
              <Gift size={14} /> BEST DIWALI OFFER
            </span>
            <span className="bg-amber-400/20 px-2 py-0.5 rounded text-[11px] font-mono">
              Ends in: {formattedTimer}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-white/5 rounded-lg p-2.5 border border-white/10">
              <span className="text-diwali-gold font-bold text-base block">FREE DELIVERY</span>
              <span className="text-cream/70 text-[11px]">On all orders above ₹500</span>
            </div>
            <div className="bg-white/5 rounded-lg p-2.5 border border-white/10">
              <span className="text-diwali-gold font-bold text-base block">FLAT 20% OFF</span>
              <span className="text-cream/70 text-[11px]">Use Code: DIWALI20</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button
              onClick={handleApplyOffer}
              className="flex-1 btn-diwali rounded-full py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2"
            >
              {appliedCoupon?.code === "DIWALI20" ? (
                <>
                  <Check size={14} /> Coupon DIWALI20 Applied!
                </>
              ) : copied ? (
                <>
                  <Check size={14} /> Applied! 20% OFF Ready
                </>
              ) : (
                <>
                  <Sparkles size={14} /> Apply Coupon DIWALI20
                </>
              )}
            </button>

            <Link
              to="/shop"
              onClick={onClose}
              className="rounded-full py-2.5 px-4 text-xs font-bold text-cream border border-cream/30 hover:bg-white/10 flex items-center justify-center gap-1.5 transition-colors"
            >
              Shop Festive Packs <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-[11px] text-cream/50 mt-3">
          🪔 Shubh Deepavali from team Makzen. Free brass/terracotta Diya included with every ₹500+ order!
        </p>
      </div>
    </div>
  );
}
