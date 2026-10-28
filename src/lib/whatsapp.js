import { business } from '../data/site';

// Empty string when no WhatsApp number is set; callers hide WhatsApp links in that case
export const waLink = (text = '') =>
  business.whatsapp ? `https://wa.me/${business.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}` : '';

export const smsLink = (text = '') => `sms:${business.phoneIntl.replace(/\s/g, '')}?&body=${encodeURIComponent(text)}`;
