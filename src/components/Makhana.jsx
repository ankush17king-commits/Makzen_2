export default function Makhana({ size = 40, className = "", style }) {
  return (
    <svg viewBox="0 0 40 32" width={size} height={(size * 32) / 40} className={className} style={style} aria-hidden="true">
      <ellipse cx="20" cy="16" rx="19" ry="14" fill="#F0C989" />
      <ellipse cx="20" cy="16" rx="19" ry="14" fill="none" stroke="#C9650A" strokeOpacity="0.25" strokeWidth="1.5" />
      <circle cx="13" cy="12" r="1.8" fill="#B4762A" opacity="0.45" />
      <circle cx="26" cy="19" r="1.6" fill="#B4762A" opacity="0.45" />
      <circle cx="22" cy="9" r="1.3" fill="#B4762A" opacity="0.4" />
      <ellipse cx="15" cy="10" rx="5" ry="3" fill="#fff" opacity="0.25" />
    </svg>
  );
}
