import { business } from '../data/site';
import { waLink, smsLink } from './whatsapp';

const isMobileDevice = () =>
  typeof navigator !== 'undefined' && /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);

// The one place a form submission leaves the site. Swap the body for a fetch() to a real API later;
// callers only rely on the returned { channel, text }.
// lines: [label, value] pairs; empty values are skipped.
export function submitBooking({ heading, lines }) {
  const text = [
    `Hello ${business.name},`,
    heading,
    '',
    ...lines.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
  ].join('\n');

  if (business.whatsapp) {
    window.open(waLink(text), '_blank', 'noopener');
    return { channel: 'whatsapp', text };
  }
  if (isMobileDevice()) {
    window.location.href = smsLink(text);
    return { channel: 'sms', text };
  }
  // Desktop without WhatsApp: the form shows the message to copy, plus a call button
  return { channel: 'copy', text };
}
