export function InstagramIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function YoutubeIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="5.5" width="20" height="13" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.5 9.5L15 12L10.5 14.5V9.5Z" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M13.8 8.2h1.4V5.9h-1.7c-1.9 0-3 1.1-3 3v1.4h-1.6v2.5h1.6V18h2.5v-5.2h1.8l.4-2.5h-2.2V9c0-.5.2-.8.8-.8Z"
        fill="currentColor"
      />
    </svg>
  );
}
