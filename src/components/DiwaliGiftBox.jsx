import Deepak from "./Deepak";

export default function DiwaliGiftBox({ size = 200, className = "" }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: (size * 340) / 300 }}
    >
      <svg
        viewBox="0 0 300 340"
        width="100%"
        height="100%"
        role="img"
        aria-label="Makzen Diwali Royal Celebration Gift Box"
      >
        <defs>
          <linearGradient id="boxGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8B0000" />
            <stop offset="40%" stopColor="#670510" />
            <stop offset="100%" stopColor="#3B0308" />
          </linearGradient>

          <linearGradient id="lidGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A51424" />
            <stop offset="100%" stopColor="#750612" />
          </linearGradient>

          <linearGradient id="goldRibbon" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFEAA7" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          <filter id="boxShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#27231F" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Drop shadow underneath */}
        <ellipse cx="150" cy="320" rx="100" ry="14" fill="#27231F" opacity="0.2" />

        <g filter="url(#boxShadow)">
          {/* Main Box Body */}
          <rect
            x="45"
            y="125"
            width="210"
            height="180"
            rx="12"
            fill="url(#boxGrad)"
          />

          {/* Intricate Gold Border Pattern on Box */}
          <rect
            x="53"
            y="133"
            width="194"
            height="164"
            rx="8"
            fill="none"
            stroke="#FBBF24"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.8"
          />

          {/* Box Lid */}
          <rect
            x="36"
            y="95"
            width="228"
            height="40"
            rx="8"
            fill="url(#lidGrad)"
            stroke="#D97706"
            strokeWidth="1.5"
          />

          {/* Vertical Gold Ribbon */}
          <rect x="135" y="95" width="30" height="210" fill="url(#goldRibbon)" />
          {/* Horizontal Gold Ribbon on Box Body */}
          <rect x="45" y="200" width="210" height="26" fill="url(#goldRibbon)" />

          {/* Festive Bow on Lid */}
          {/* Left loop */}
          <path
            d="M150 96 C110 55 90 75 140 92 Z"
            fill="url(#goldRibbon)"
            stroke="#92400E"
            strokeWidth="1"
          />
          {/* Right loop */}
          <path
            d="M150 96 C190 55 210 75 160 92 Z"
            fill="url(#goldRibbon)"
            stroke="#92400E"
            strokeWidth="1"
          />
          {/* Ribbon Tails */}
          <path
            d="M142 96 L120 120 L132 120 L146 100 Z"
            fill="url(#goldRibbon)"
          />
          <path
            d="M158 96 L180 120 L168 120 L154 100 Z"
            fill="url(#goldRibbon)"
          />
          {/* Center Bow Knot */}
          <ellipse cx="150" cy="94" rx="11" ry="9" fill="#FDE047" stroke="#B45309" strokeWidth="1" />

          {/* Golden Medallion / Label */}
          <circle cx="150" cy="213" r="32" fill="#1C060B" stroke="#FDE047" strokeWidth="2.5" />
          <circle cx="150" cy="213" r="28" fill="none" stroke="#D97706" strokeWidth="1" strokeDasharray="3 2" />

          <text
            x="150"
            y="206"
            textAnchor="middle"
            fill="#FDE047"
            fontSize="10"
            fontWeight="bold"
            letterSpacing="0.1em"
            fontFamily="'Inter', sans-serif"
          >
            MAKZEN
          </text>
          <text
            x="150"
            y="218"
            textAnchor="middle"
            fill="#FFF8EC"
            fontSize="8"
            fontWeight="bold"
            letterSpacing="0.08em"
            fontFamily="'Inter', sans-serif"
          >
            DIWALI
          </text>
          <text
            x="150"
            y="228"
            textAnchor="middle"
            fill="#FB8500"
            fontSize="7"
            fontWeight="600"
            fontFamily="'Inter', sans-serif"
          >
            ROYAL BOX
          </text>

          {/* Corner golden mandala accents */}
          <circle cx="70" cy="155" r="4" fill="#FDE047" opacity="0.6" />
          <circle cx="230" cy="155" r="4" fill="#FDE047" opacity="0.6" />
          <circle cx="70" cy="285" r="4" fill="#FDE047" opacity="0.6" />
          <circle cx="230" cy="285" r="4" fill="#FDE047" opacity="0.6" />
        </g>
      </svg>

      {/* Floating Deepak atop the gift box */}
      <div className="absolute -top-3 right-6 pointer-events-none transform rotate-3">
        <Deepak size={38} flameSpeed="fast" />
      </div>
    </div>
  );
}
