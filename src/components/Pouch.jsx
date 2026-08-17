const ACCENTS = {
  saffron: { top: "#E88912", bottom: "#C9650A", label: "#174A35" },
  "deep-orange": { top: "#C9650A", bottom: "#9A4D08", label: "#FFF8EC" },
  forest: { top: "#1F5C42", bottom: "#123726", label: "#FFF8EC" },
};

// Illustrated stand-up pouch used as a placeholder for real packaging photography.
// Swap for the real product photo by replacing this component's usage in ProductCard / pages.
export default function Pouch({ accent = "saffron", name = "Cheese & Peri Peri", weight = "60g", size = 320, className = "" }) {
  const c = ACCENTS[accent] || ACCENTS.saffron;
  const uid = name.replace(/\s+/g, "-").toLowerCase();

  return (
    <svg
      viewBox="0 0 320 400"
      width={size}
      height={(size * 400) / 320}
      className={className}
      role="img"
      aria-label={`Makzen ${name} ${weight} pouch illustration`}
    >
      <defs>
        <linearGradient id={`grad-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.top} />
          <stop offset="100%" stopColor={c.bottom} />
        </linearGradient>
        <linearGradient id={`sheen-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`window-${uid}`}>
          <ellipse cx="160" cy="205" rx="78" ry="62" />
        </clipPath>
      </defs>

      {/* pouch body */}
      <path
        d="M60 60
           C60 40 75 26 96 26
           L224 26
           C245 26 260 40 260 60
           L268 330
           C270 358 250 382 214 382
           L106 382
           C70 382 50 358 52 330
           Z"
        fill={`url(#grad-${uid})`}
      />

      {/* top seal */}
      <path d="M84 26 L236 26 L244 52 L76 52 Z" fill={c.bottom} opacity="0.9" />
      <rect x="76" y="46" width="168" height="10" rx="4" fill="#3a2c1c" opacity="0.18" />

      {/* side gussets */}
      <path d="M60 60 C50 120 48 260 60 330" stroke="#000" strokeOpacity="0.08" strokeWidth="6" fill="none" />
      <path d="M260 60 C270 120 272 260 260 330" stroke="#000" strokeOpacity="0.08" strokeWidth="6" fill="none" />

      {/* die-cut window */}
      <ellipse cx="160" cy="205" rx="82" ry="66" fill="#fff8ec" opacity="0.9" />
      <g clipPath={`url(#window-${uid})`}>
        <rect x="78" y="140" width="164" height="130" fill="#F5EBDD" />
        {[
          [125, 175], [160, 165], [195, 180], [140, 205], [175, 210],
          [205, 205], [120, 230], [155, 235], [190, 232], [210, 165],
        ].map(([mx, my], i) => (
          <g key={i} transform={`translate(${mx} ${my}) rotate(${(i * 37) % 360})`}>
            <ellipse rx="16" ry="12" fill="#E8B564" />
            <ellipse rx="16" ry="12" fill="none" stroke="#C9650A" strokeOpacity="0.35" strokeWidth="1.5" />
            <circle cx="-4" cy="-2" r="1.6" fill="#9A4D08" opacity="0.5" />
            <circle cx="5" cy="3" r="1.4" fill="#9A4D08" opacity="0.5" />
          </g>
        ))}
      </g>
      <ellipse cx="160" cy="205" rx="82" ry="66" fill="none" stroke="#FFF8EC" strokeWidth="5" />

      {/* wordmark */}
      <text x="160" y="100" textAnchor="middle" fontFamily="'Playfair Display', serif" fontWeight="800" fontSize="34" fill={c.label}>
        MAKZEN
      </text>
      <text x="160" y="120" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" letterSpacing="2" fontSize="10" fill={c.label} opacity="0.85">
        ROASTED MAKHANA
      </text>

      {/* flavour + weight */}
      <text x="160" y="305" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="15" fill={c.label}>
        {name}
      </text>
      <rect x="130" y="322" width="60" height="20" rx="10" fill={c.label} opacity="0.16" />
      <text x="160" y="336" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="11" fill={c.label}>
        {weight}
      </text>

      {/* sheen */}
      <path d="M70 60 C90 150 90 260 70 330 L100 330 C110 250 110 140 100 60 Z" fill={`url(#sheen-${uid})`} />
    </svg>
  );
}
