// SVG wordmark modelled on the shop sign: "DSY" in a yellow block, "AUTOMOTIVE" spaced out beside it.
// tone="light" switches the wordmark text to white for the dark footer.
export default function Logo({ tone = 'dark', className = 'h-10 w-auto' }) {
  const word = tone === 'light' ? 'fill-white' : 'fill-ink';
  return (
    <svg viewBox="0 0 236 48" className={className} role="img" aria-label="DSY Automotive" focusable="false">
      <rect width="72" height="48" rx="8" className="fill-brand" />
      <path d="M0 40h72v0a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8z" className="fill-accent" />
      <text x="36" y="31" textAnchor="middle" className="fill-brand-ink font-heading" fontWeight="800" fontSize="24" letterSpacing="-0.5">
        DSY
      </text>
      <text x="84" y="31" className={`${word} font-heading`} fontWeight="700" fontSize="17" letterSpacing="3.2">
        AUTOMOTIVE
      </text>
    </svg>
  );
}
