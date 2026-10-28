import { business, features } from './site';

export const faqs = [
  { q: 'How do I book my car in?', a: `Call us on ${business.phone} or use the booking form. We confirm every booking by phone.` },
  { q: 'Do you give a quote before starting work?', a: 'Yes. We find the problem, tell you what it is and what it will cost, and only start once you agree. If we find something else during the job, we call you first.' },
  { q: 'How long will my repair take?', a: 'Quick jobs like an oil change or a battery are often done the same day. Bigger repairs depend on parts. We give you a time estimate with the quote.' },
  { q: 'Can I wait while the work is done?', a: 'For short jobs, often yes. Call ahead and we will tell you if waiting makes sense.' },
  { q: 'Is there parking near Chorlton Road?', a: 'There is space in front of the workshop when it is free. Please check street signs before parking nearby.' }, // TODO(client): confirm parking
  { q: 'Do you work on all makes and models?', a: 'Yes. We work on all makes of car, petrol and diesel.' }, // TODO(client): confirm hybrid/electric
  ...(features.mot ? [{ q: 'Do you do MOTs?', a: 'Yes. We are an MOT Centre. If your car fails, we explain why and quote for the repair.' }] : []),
  { q: 'Can I see the old parts you replaced?', a: 'Yes. Ask when you book and we will keep them for you to see.' },
  // TODO(client): payment methods. Do not list cards or cash until confirmed.
  { q: 'How can I pay?', a: 'Please ask when you book and we will confirm the payment options.' },
  // TODO(client): warranty terms. Do not state a warranty period until confirmed.
  { q: 'Is the work guaranteed?', a: 'Ask us about the guarantee on parts and labour for your job when we give you the quote.' },
];
