// TODO(client): confirm the full week. Google only shows "closes 5 pm".
// open/close are 24h "HH:MM" in UK time. confirm: true shows "Call to confirm" and hides the open/closed badge.
export const week = [
  { day: 'Monday', open: '09:00', close: '17:00', closed: false },
  { day: 'Tuesday', open: '09:00', close: '17:00', closed: false },
  { day: 'Wednesday', open: '09:00', close: '17:00', closed: false },
  { day: 'Thursday', open: '09:00', close: '17:00', closed: false },
  { day: 'Friday', open: '09:00', close: '17:00', closed: false },
  { day: 'Saturday', open: null, close: null, closed: false, confirm: true },
  { day: 'Sunday', open: null, close: null, closed: false, confirm: true },
];

export const hoursNotes = [
  'Hours can change on bank holidays. Please ring ahead if you are travelling far.',
  'For a quick job, call first and we will tell you the best time to bring the car in.',
];

export const getHours = (day) => week.find((h) => h.day === day);
