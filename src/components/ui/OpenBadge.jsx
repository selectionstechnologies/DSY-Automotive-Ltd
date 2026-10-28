import { useOpenStatus } from '../../lib/openStatus';

// Live "Open now / Closed" pill in UK time. Hidden while prerendering and on "Call to confirm" days.
// The dot is decorative; the text always carries the status.
export default function OpenBadge({ className = '', tone = 'dark' }) {
  const status = useOpenStatus();
  if (!status || status.state === 'unknown') return null;
  const open = status.state === 'open';
  const text = tone === 'light' ? 'text-white' : 'text-ink';
  return (
    <p className={`inline-flex items-center gap-2 text-sm font-semibold ${text} ${className}`} aria-live="polite">
      <span className={`relative flex h-2.5 w-2.5 rounded-full ${open ? 'bg-success' : 'bg-muted'}`} aria-hidden="true">
        {open && <span className="absolute inset-0 animate-ping rounded-full bg-success/60 motion-reduce:hidden" />}
      </span>
      {status.label}
    </p>
  );
}
