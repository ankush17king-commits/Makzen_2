import { useDiwali } from "../context/DiwaliContext";
import Deepak from "./Deepak";

export default function AnnouncementBar({ onOpenWishes = null }) {
  const { isDiwaliActive, formattedTimer } = useDiwali();

  const diwaliItems = [
    "✨ SHUBH DEEPAVALI! FREE DELIVERY ON ALL ORDERS ABOVE ₹500",
    "💥 BEST DIWALI OFFER: 20% OFF WITH CODE 'DIWALI20'",
    `⏳ FESTIVE SALE ENDS IN: ${formattedTimer}`,
    "🎁 FREE HANDCRAFTED DIYA & GIFT BOX ON ORDERS > ₹500",
    "🪔 ROASTED, NEVER FRIED • 100% GUILT-FREE CRUNCH",
  ];

  const standardItems = [
    "FREE SHIPPING ON ORDERS ABOVE ₹500",
    "ROASTED, NEVER FRIED",
    "MADE FOR BETTER SNACKING",
  ];

  const items = isDiwaliActive ? diwaliItems : standardItems;

  return (
    <div
      className={`text-xs md:text-[13px] font-semibold tracking-wide transition-colors relative z-40 ${
        isDiwaliActive
          ? "bg-gradient-to-r from-[#2B070E] via-[#5C141E] to-[#2B070E] text-amber-100 border-b border-amber-400/25 shadow-sm"
          : "bg-forest text-cream"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
        {/* Left Diya on Diwali */}
        {isDiwaliActive && (
          <div className="hidden sm:flex items-center gap-1.5 shrink-0 pl-1">
            <Deepak size={20} glow={false} flameSpeed="fast" />
            <span className="text-[11px] font-bold text-diwali-gold uppercase tracking-wider">
              Diwali Dhamaka
            </span>
          </div>
        )}

        {/* Ticker / Announcement Items */}
        <div className="flex-1 flex items-center justify-center gap-4 text-center overflow-x-auto py-0.5">
          {items.map((item, i) => (
            <span key={item + i} className="flex items-center gap-3 shrink-0">
              {i > 0 && (
                <span className={isDiwaliActive ? "text-diwali-gold animate-pulse" : "text-saffron"}>
                  ✦
                </span>
              )}
              <span className="tracking-wide">{item}</span>
            </span>
          ))}
        </div>

        {/* Right Action / Diya */}
        {isDiwaliActive && (
          <div className="hidden sm:flex items-center gap-2 shrink-0 pr-1">
            {onOpenWishes && (
              <button
                onClick={onOpenWishes}
                className="text-[11px] bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 px-2.5 py-0.5 rounded-full border border-amber-400/40 transition-colors flex items-center gap-1"
              >
                <span>🪔</span> Wishes & Offer
              </button>
            )}
            <Deepak size={20} glow={false} flameSpeed="fast" />
          </div>
        )}
      </div>
    </div>
  );
}
