// Shown only while features.mot is true (see site.js).
// TODO(client): confirm the test classes carried out (Class 4 assumed) and whether retests are free within 10 working days.
export const mot = {
  intro:
    'DSY Automotive is an MOT Centre on Chorlton Road. Book your car in for its MOT, and if anything fails, we explain why and quote for the repair before doing any work.',
  checks: [
    'Lights, indicators and reflectors',
    'Brakes, steering and suspension',
    'Tyres and wheels, including tread depth',
    'Seat belts, seats and the horn',
    'Windscreen, wipers and washers',
    'Exhaust, fuel system and emissions',
    'Body condition, mirrors and number plates',
  ],
  steps: [
    { title: 'Book your test', text: 'Call or book online. Your MOT can be done up to a month (minus a day) before it runs out and you keep the same renewal date.' },
    { title: 'We test the car', text: 'The test follows the official DVSA checks. We tell you the result when it is done.' },
    { title: 'Pass, or a clear quote', text: 'If it passes, you get your certificate. If it fails, we explain each item and quote before any repair.' },
  ],
  faqs: [
    { q: 'When is my MOT due?', a: 'Cars need their first MOT three years after first registration, then every year. You can check the date on the GOV.UK MOT history service with your registration.' },
    { q: 'Can I get my MOT done early?', a: 'Yes. You can have it up to a month (minus a day) before the expiry date and keep the same renewal date.' },
    { q: 'What happens if my car fails?', a: 'We tell you what failed and why, and quote for the repair. You decide whether we carry out the work.' },
    { q: 'Can I drive my car if the MOT has run out?', a: 'Only to a pre-booked MOT test or to have repairs done to fix a failure. Otherwise it is illegal to drive it.' },
  ],
};
