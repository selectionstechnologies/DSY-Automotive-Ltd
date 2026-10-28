import { week } from '../../data/hours';
import { useOpenStatus, fmtTime } from '../../lib/openStatus';

const fmtRow = (h) => (h.confirm ? 'Call to confirm' : h.closed ? 'Closed' : `${fmtTime(h.open)} – ${fmtTime(h.close)}`);

// Today's row is highlighted (and marked "Today" in text) once the UK day is known on the client
export default function HoursTable({ compact = false }) {
  const status = useOpenStatus();
  const today = status?.day;
  const pad = compact ? 'px-4 py-3' : 'px-4 py-4 sm:px-6';
  return (
    <div className="card overflow-hidden !shadow-none">
      <table className="w-full text-left text-[15px]">
        <caption className="sr-only">Weekly opening hours</caption>
        <thead className="border-b border-line bg-surface-2">
          <tr>
            <th scope="col" className={`${pad} font-semibold`}>Day</th>
            <th scope="col" className={`${pad} font-semibold`}>Hours</th>
          </tr>
        </thead>
        <tbody>
          {week.map((h) => {
            const isToday = h.day === today;
            return (
              <tr key={h.day} aria-current={isToday ? 'date' : undefined} className={`border-b border-line last:border-0 ${isToday ? 'bg-brand/25' : ''}`}>
                <th scope="row" className={`${pad} font-medium`}>
                  <span className="flex flex-wrap items-center gap-2">
                    {h.day}
                    {isToday && <span className="rounded-sm bg-charcoal px-1.5 py-0.5 text-xs font-semibold text-white">Today</span>}
                  </span>
                </th>
                <td className={`${pad} ${h.confirm || h.closed ? 'text-muted' : ''}`}>
                  {fmtRow(h)}
                  {isToday && status.state !== 'unknown' && (
                    <span className={`ml-2 text-sm font-semibold ${status.state === 'open' ? 'text-success' : 'text-muted'}`}>
                      · {status.state === 'open' ? 'Open now' : 'Closed now'}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
