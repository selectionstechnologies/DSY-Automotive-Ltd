// "2026-10-01" -> "1 October 2026"
export const fmtDate = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
