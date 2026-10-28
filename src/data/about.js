import { MessageSquareText, ReceiptText, Eye, MapPin } from 'lucide-react';

// TODO(client): founding year, owner's story and team size, then rewrite this in their words
export const story = [
  'DSY Automotive is an independent garage at 88–90 Chorlton Road, in Old Trafford. We look after everyday cars for local drivers: MOTs, servicing, repairs, diagnostics and tyres.',
  'We keep things simple. You tell us what the car is doing, we find the cause, and we tell you the price before we pick up a spanner.',
];

export const workshop = [
  'The workshop sits behind the roller shutters under our yellow sign, next to the Chorlton Road car accessories shop.',
  'Inside we have the kit to test, diagnose and repair most makes, plus a tyre bay for new and part worn tyres.', // TODO(client): confirm equipment (lifts, MOT bay)
];

// "Why choose us": honest, non-numeric points only
export const reasons = [
  { icon: ReceiptText, title: 'We quote before we fix', text: 'No surprise bills. You get the price first, and we call you if anything else turns up.' },
  { icon: MessageSquareText, title: 'Plain English, no jargon', text: 'We explain what is wrong, what it means for you and what can wait.' },
  { icon: Eye, title: 'Old parts shown on request', text: 'Ask and we keep the parts we replaced, so you can see the wear for yourself.' },
  { icon: MapPin, title: 'Local and easy to reach', text: 'On Chorlton Road in Old Trafford, close to Hulme, Stretford and Whalley Range.' },
];

export const process = [
  { title: 'Book or call', text: 'Use the form or ring us. Tell us what the car is doing.' },
  { title: 'We diagnose and quote', text: 'We find the fault and give you a clear price before any work.' },
  { title: 'Drive away', text: 'We do the agreed work, test the car and talk you through it.' },
];
