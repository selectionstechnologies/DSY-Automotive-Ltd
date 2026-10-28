import { useEffect, useState } from 'react';
import { getHours } from '../data/hours';

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

// "17:00" -> "5pm", "09:30" -> "9:30am"
export const fmtTime = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const h12 = h % 12 || 12;
  return m ? `${h12}:${String(m).padStart(2, '0')}${suffix}` : `${h12}${suffix}`;
};

// Weekday name and minutes past midnight in UK time, whatever the visitor's own timezone
export function londonNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (t) => parts.find((p) => p.type === t).value;
  return { day: get('weekday'), minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

// { state: 'open' | 'closed' | 'unknown', day, label }
export function getStatus(date) {
  const { day, minutes } = londonNow(date);
  const h = getHours(day);
  if (!h || h.confirm) return { state: 'unknown', day, label: 'Call to confirm today' };
  if (h.closed) return { state: 'closed', day, label: 'Closed today' };
  const open = toMinutes(h.open);
  const close = toMinutes(h.close);
  if (minutes < open) return { state: 'closed', day, label: `Closed · opens ${fmtTime(h.open)}` };
  if (minutes >= close) return { state: 'closed', day, label: 'Closed for today' };
  return { state: 'open', day, label: `Open now · closes ${fmtTime(h.close)}` };
}

// null during prerender/hydration so server HTML and the first client render match; refreshes every minute
export function useOpenStatus() {
  const [status, setStatus] = useState(null);
  useEffect(() => {
    const tick = () => setStatus(getStatus());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return status;
}

// Today's date as YYYY-MM-DD in UK time, for the booking form's min date
export const todayISO = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());
