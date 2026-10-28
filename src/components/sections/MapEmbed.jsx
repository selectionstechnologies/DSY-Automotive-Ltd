import { useState } from 'react';
import { MapPin, Map, ExternalLink } from 'lucide-react';
import { business, addressLine } from '../../data/site';

// Click-to-load: Google Maps sets cookies, so the iframe only loads after the visitor asks for it (UK GDPR/PECR)
export default function MapEmbed({ className = 'h-80 lg:h-full lg:min-h-[24rem]' }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className={`overflow-hidden rounded-media border border-line ${className}`}>
        <iframe
          title={`Map showing ${business.name}, ${addressLine}`}
          src={business.mapEmbed}
          className="h-full min-h-[20rem] w-full border-0"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-media border border-line bg-surface-2 p-8 text-center ${className}`}>
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgb(var(--line))_1px,transparent_1px),linear-gradient(90deg,rgb(var(--line))_1px,transparent_1px)] [background-size:32px_32px]" aria-hidden="true" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-ink shadow-card">
        <MapPin className="h-7 w-7" aria-hidden="true" />
      </span>
      <p className="relative max-w-xs font-semibold text-ink">{addressLine}</p>
      <div className="relative flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={() => setLoaded(true)} className="btn-dark">
          <Map className="h-5 w-5" aria-hidden="true" />
          Load map
        </button>
        <a href={business.mapLink} target="_blank" rel="noopener noreferrer" className="btn-outline">
          Open in Google Maps
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      <p className="relative max-w-xs text-xs text-muted">Loading the map lets Google set cookies.</p>
    </div>
  );
}
