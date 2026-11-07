import { useId, useState } from "react";

export default function Deepak({
  size = 48,
  className = "",
  lit = true,
  glow = true,
  interactive = false,
  flameSpeed = "normal",
  onLight = null,
}) {
  const uid = useId().replace(/:/g, "");
  const [isLit, setIsLit] = useState(lit);
  const [sparkling, setSparkling] = useState(false);

  const handleClick = () => {
    if (!interactive) return;
    if (!isLit) {
      setIsLit(true);
      setSparkling(true);
      setTimeout(() => setSparkling(false), 1200);
      if (onLight) onLight();
    } else if (onLight) {
      setSparkling(true);
      setTimeout(() => setSparkling(false), 1000);
      onLight();
    }
  };

  const flameAnimClass = flameSpeed === "fast" ? "animate-flame-fast" : "animate-flame";

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${
        interactive ? "cursor-pointer group transform transition-transform hover:scale-105 active:scale-95" : ""
      } ${className}`}
      onClick={handleClick}
      role={interactive ? "button" : "img"}
      aria-label={isLit ? "Burning Diwali Diya (Deepak)" : "Unlit Diwali Diya"}
      title={interactive ? (isLit ? "Click to send Diwali blessings!" : "Click to light the Diya!") : "Shubh Deepavali Diya"}
    >
      <svg
        viewBox="0 0 120 90"
        width={size}
        height={(size * 90) / 120}
        className="overflow-visible"
      >
        <defs>
          {/* Flame radiant halo glow */}
          <radialGradient id={`diyaHalo-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.75" />
            <stop offset="45%" stopColor="#FB8500" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#E88912" stopOpacity="0" />
          </radialGradient>

          {/* Flame outer gradient */}
          <linearGradient id={`flameOuter-${uid}`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="40%" stopColor="#FB8500" />
            <stop offset="85%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#FEF08A" />
          </linearGradient>

          {/* Flame inner core */}
          <linearGradient id={`flameInner-${uid}`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="60%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Diya body clay / terracotta & gold gradient */}
          <linearGradient id={`diyaClay-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="25%" stopColor="#B45309" />
            <stop offset="70%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          {/* Oil pool gradient */}
          <radialGradient id={`oilPool-${uid}`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </radialGradient>
        </defs>

        {/* Ambient halo glow */}
        {isLit && glow && (
          <circle
            cx="60"
            cy="24"
            r="32"
            fill={`url(#diyaHalo-${uid})`}
            className="animate-diyaGlow pointer-events-none"
          />
        )}

        {/* FLAME & WICK (Visible when lit) */}
        {isLit ? (
          <g className={`diya-flame-origin ${flameAnimClass}`}>
            {/* Outer flame */}
            <path
              d="M60 42 C46 32 46 16 60 4 C74 16 74 32 60 42 Z"
              fill={`url(#flameOuter-${uid})`}
            />
            {/* Inner bright flame */}
            <path
              d="M60 38 C51 28 52 18 60 9 C68 18 69 28 60 38 Z"
              fill={`url(#flameInner-${uid})`}
            />
            {/* White hot core */}
            <ellipse cx="60" cy="30" rx="3.5" ry="7" fill="#FFFFFF" opacity="0.9" />
          </g>
        ) : (
          /* Smoke / off state hint */
          <path
            d="M60 40 Q58 34 61 28 Q63 22 60 16"
            stroke="#9CA3AF"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            fill="none"
            opacity="0.6"
          />
        )}

        {/* Cotton wick (बाती) */}
        <path
          d="M60 45 Q61 38 60 32"
          stroke={isLit ? "#451A03" : "#1F2937"}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* DIYA CLAY BODY */}
        {/* Base shadow */}
        <ellipse cx="60" cy="85" rx="36" ry="5" fill="#000000" opacity="0.18" />

        {/* Diya pedestal stand */}
        <path
          d="M44 80 L76 80 L79 85 L41 85 Z"
          fill="#5A2308"
        />

        {/* Main Diya Bowl */}
        <path
          d="M16 48 C16 74 38 82 60 82 C82 82 104 74 104 48 C90 56 75 60 60 60 C45 60 30 56 16 48 Z"
          fill={`url(#diyaClay-${uid})`}
        />

        {/* Diya interior oil pool */}
        <ellipse cx="60" cy="48" rx="42" ry="11" fill={`url(#oilPool-${uid})`} />

        {/* Decorative gold rim border */}
        <ellipse
          cx="60"
          cy="48"
          rx="43"
          ry="11"
          fill="none"
          stroke="#FDE047"
          strokeWidth="1.6"
          strokeDasharray="3 3.5"
          opacity="0.9"
        />

        {/* Traditional Diya Spout (चोंच) tip in center */}
        <path
          d="M56 46 L60 41 L64 46 Z"
          fill="#B45309"
        />

        {/* Terracotta body decorative carvings */}
        <path
          d="M28 54 Q60 67 92 54"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="1.2"
          opacity="0.8"
        />
        <circle cx="44" cy="62" r="1.5" fill="#FDE047" opacity="0.85" />
        <circle cx="60" cy="66" r="2" fill="#FDE047" opacity="0.95" />
        <circle cx="76" cy="62" r="1.5" fill="#FDE047" opacity="0.85" />
      </svg>

      {/* Sparkling festive burst on interactive click */}
      {sparkling && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <span className="absolute -top-6 text-sm animate-bounce">✨</span>
          <span className="absolute -top-4 -left-4 text-xs animate-ping">🪔</span>
          <span className="absolute -top-4 -right-4 text-xs animate-ping">✨</span>
        </div>
      )}
    </div>
  );
}
