import {
  Wrench, Droplet, Gauge, Cog, Timer, TriangleAlert, Disc3, Settings2, MoveVertical,
  CircleDot, Wind, Zap, BatteryCharging, Snowflake, ClipboardCheck,
} from 'lucide-react';
import { features } from './site';

// The shop sign lists: MOT · All Cars Repair · Services · Diagnosing · Tyres, plus "New & Part Worn Tyres".
// onSign: true = shown on the sign. TODO(client): confirm every service without onSign before launch.
// seoName: optional wording for the page title. page: services with their own top-level page (MOT) link there instead of /services/<slug>.
export const groups = [
  'Servicing & Maintenance',
  'Diagnostics & Engine',
  'Brakes, Clutch & Suspension',
  'Tyres & Exhaust',
  'Electrical & A/C',
  ...(features.mot ? ['MOT'] : []),
];

const all = [
  {
    slug: 'car-servicing',
    title: 'Full & Interim Service',
    group: 'Servicing & Maintenance',
    icon: Wrench,
    featured: true,
    onSign: true,
    short: 'Regular servicing to keep your car reliable and your service history up to date.',
    intro:
      'A service is a planned check of the parts that wear out. An interim service covers the basics between full services. A full service goes deeper, with more checks and more parts replaced.',
    signs: [
      'It has been a year or more since the last service',
      'A service light or spanner symbol is showing on the dashboard',
      'You are planning a long trip or getting ready to sell the car',
      'The service book has gaps in it',
    ],
    steps: [
      'We ask about the car and how you use it, then agree the type of service',
      'We change the oil and the right filters, and check fluids, brakes, tyres, lights and steering',
      'We tell you about anything else we find and quote before doing more work',
      'We stamp the service book or give you a printed record',
    ],
    faqs: [
      { q: 'What is the difference between an interim and a full service?', a: 'An interim service is a lighter check, mainly oil, filter and safety checks. A full service adds more checks and replaces more filters and parts. We can tell you which one your car needs.' },
      { q: 'Will servicing here affect my manufacturer warranty?', a: 'In the UK you can have your car serviced by an independent garage without losing the warranty, as long as the work follows the manufacturer schedule and uses suitable parts.' },
      { q: 'Can you service my car at the same time as the MOT?', a: 'Yes. Booking both together saves you a second trip. Mention it when you book.' },
    ],
  },
  {
    slug: 'oil-and-filter-change',
    title: 'Oil & Filter Change',
    group: 'Servicing & Maintenance',
    icon: Droplet,
    short: 'Fresh engine oil and a new oil filter, done properly with the right grade.',
    intro:
      'Engine oil keeps the moving parts from wearing each other down. Over time it breaks down and collects dirt. A change with the correct grade of oil helps the engine last.',
    signs: [
      'The oil warning light comes on',
      'The oil on the dipstick looks dark and thick, or the level is low',
      'The engine sounds louder or rougher than normal',
      'It is past the mileage or date shown on the last service sticker',
    ],
    steps: [
      'We check the handbook for the right oil grade for your engine',
      'We drain the old oil and fit a new oil filter',
      'We refill to the correct level and check for leaks',
      'We reset the service reminder where we can',
    ],
    faqs: [
      { q: 'How long does an oil change take?', a: 'Usually under an hour. Call ahead and you can often wait.' },
      { q: 'Do you use the right oil for my car?', a: 'Yes. We match the oil to the grade and spec in your handbook.' },
      { q: 'Is an oil change the same as a service?', a: 'No. A service includes an oil change plus many other checks. An oil change on its own is a quick top-up between services.' },
    ],
  },
  {
    slug: 'engine-diagnostics',
    title: 'Engine Diagnostics',
    group: 'Diagnostics & Engine',
    icon: Gauge,
    featured: true,
    onSign: true,
    short: 'We read the fault codes and test the car to find the real cause.',
    intro:
      'Modern cars store fault codes when something goes wrong. We read them with a diagnostic tool, then test the parts involved, so you pay to fix the actual problem and not a guess.',
    signs: [
      'The engine management light is on or flashing',
      'The car feels down on power or goes into limp mode',
      'It is using more fuel than usual',
      'It is hard to start, stalls or idles unevenly',
    ],
    steps: [
      'We plug in the diagnostic tool and read the stored fault codes',
      'We check live data and test the suspect parts',
      'We explain what we found in plain English and give you a quote',
      'We only start the repair once you say yes',
    ],
    faqs: [
      { q: 'Does a fault code tell you exactly what is wrong?', a: 'Not always. A code points to the area of the problem. We then test the parts to find the true cause before we quote.' },
      { q: 'Can I keep driving with the engine light on?', a: 'If the light is steady and the car drives normally, get it checked soon. If it is flashing, or the car feels wrong, stop and call us.' },
      { q: 'Do you work on all makes?', a: 'Yes. We work on all makes and models of car.' },
    ],
  },
  {
    slug: 'engine-repairs',
    title: 'Engine Repairs',
    group: 'Diagnostics & Engine',
    icon: Cog,
    featured: true,
    onSign: true, // covered by "All Cars Repair" on the sign
    short: 'From leaks and misfires to bigger jobs, fixed after a clear quote.',
    intro:
      'Engine faults range from a small leak to a major repair. We find the cause first, explain your options and give you a price before any work starts.',
    signs: [
      'Oil or coolant leaking under the car',
      'Knocking, ticking or rattling from the engine',
      'Blue, white or black smoke from the exhaust',
      'The temperature gauge climbing higher than usual',
    ],
    steps: [
      'We inspect and test the engine to find the cause',
      'We explain the repair options and their cost',
      'We carry out the agreed repair and road test the car',
      'Old parts are kept for you to see if you ask',
    ],
    faqs: [
      { q: 'Will you tell me if a repair is not worth it?', a: 'Yes. If the repair costs more than the car is worth to you, we will say so and talk through your options.' },
      { q: 'Can I see the old parts?', a: 'Yes. Ask when you book and we will keep them for you.' },
      { q: 'How long do engine repairs take?', a: 'It depends on the job and parts. We give you a time estimate with the quote.' },
    ],
  },
  {
    slug: 'timing-belt-and-chain',
    title: 'Timing Belt & Chain',
    group: 'Diagnostics & Engine',
    icon: Timer,
    // TODO(client): confirm
    short: 'Belt and chain replacement on schedule, before it fails and damages the engine.',
    intro:
      'The timing belt or chain keeps the engine valves and pistons in step. If a belt snaps, it can cause serious engine damage. Replacing it at the right interval is much cheaper than the repair after.',
    signs: [
      'The car is at or past the replacement mileage or age in the handbook',
      'There is no record of the belt being changed',
      'A rattle from the engine on start-up (often a worn chain)',
      'A squeal or ticking from the front of the engine',
    ],
    steps: [
      'We check the interval for your engine and any past records',
      'We quote for the belt or chain kit, usually with the water pump if it is driven by the belt',
      'We fit the kit and check the timing is spot on',
      'We note the mileage so you know when the next change is due',
    ],
    faqs: [
      { q: 'How do I know if my car has a belt or a chain?', a: 'Give us the registration and we can check. Many cars have a belt that needs changing; chains usually last longer but can wear.' },
      { q: 'Why change the water pump at the same time?', a: 'On many engines the belt drives the pump. Doing both at once saves paying for the same labour twice.' },
      { q: 'How long does it take?', a: 'Usually most of a day, depending on the engine.' },
    ],
  },
  {
    slug: 'warning-lights',
    seoName: 'Warning Light Checks',
    title: 'Warning Lights',
    group: 'Diagnostics & Engine',
    icon: TriangleAlert,
    onSign: true, // covered by "Diagnosing" on the sign
    short: 'A dashboard light is on? We find out what it means and what to do next.',
    intro:
      'Warning lights are the car telling you something has changed. Some can wait a few days, some mean stop now. We read the codes, find the cause and tell you how urgent it is.',
    signs: [
      'An amber light has stayed on after starting the car',
      'A red light comes on while driving',
      'A light comes and goes',
      'The car feels different at the same time as the light appears',
    ],
    steps: [
      'We read the fault codes linked to the light',
      'We test the system involved to confirm the cause',
      'We tell you how urgent it is and quote for the fix',
      'After the repair we clear the codes and check the light stays off',
    ],
    faqs: [
      { q: 'Which warning lights mean I should stop?', a: 'Red lights such as oil pressure, engine temperature or brake warnings mean pull over safely and call us. Our car-care tips article explains the common lights.' },
      { q: 'Can you just turn the light off?', a: 'We can clear a code, but if the fault is still there the light comes back. We would rather fix the cause.' },
      { q: 'Is the check cheap?', a: 'Call us and we will tell you the cost of the check before you bring the car in.' },
    ],
  },
  {
    slug: 'brakes',
    seoName: 'Brake Repairs',
    title: 'Brakes',
    group: 'Brakes, Clutch & Suspension',
    icon: Disc3,
    featured: true,
    // TODO(client): confirm
    short: 'Pads, discs, fluid and brake checks, so you can stop safely every time.',
    intro:
      'Brakes wear every time you use them. We check pads, discs, fluid and hoses, and only replace what needs replacing. You get a clear quote first.',
    signs: [
      'Squealing, grinding or scraping when you brake',
      'The car pulls to one side when braking',
      'The brake pedal feels soft or goes further down',
      'A vibration through the pedal or steering wheel when stopping',
    ],
    steps: [
      'We take the wheels off and check pads, discs, calipers and hoses',
      'We show you or tell you what is worn and how much life is left',
      'We replace the worn parts and bleed the fluid if needed',
      'We road test the car to check the brakes work as they should',
    ],
    faqs: [
      { q: 'Do I always need new discs with new pads?', a: 'No. If the discs are within limits we can fit pads on their own. We measure them and tell you.' },
      { q: 'How often should brake fluid be changed?', a: 'Most makers say every second year. Old fluid absorbs water, which can make the brakes less effective.' },
      { q: 'Is it safe to drive with squeaky brakes?', a: 'Squeaks can be harmless, but grinding usually means metal on metal. Get them checked soon.' },
    ],
  },
  {
    slug: 'clutch-replacement',
    title: 'Clutch Replacement',
    group: 'Brakes, Clutch & Suspension',
    icon: Settings2,
    // TODO(client): confirm
    short: 'Slipping or heavy clutch? We check it and replace it if it has worn out.',
    intro:
      'The clutch connects the engine to the gearbox. It wears over time and gives warning signs before it fails. We confirm the problem, then quote for the right kit for your car.',
    signs: [
      'The engine revs rise but the car does not speed up (slipping)',
      'The pedal feels heavy, spongy or bites very high',
      'Gears are hard to select or crunch',
      'A burning smell after pulling away or on hills',
    ],
    steps: [
      'We road test the car and check the clutch and gear change',
      'We quote for the clutch kit and, if fitted, the flywheel',
      'We fit the new clutch and adjust it',
      'We road test again to check smooth pulling away',
    ],
    faqs: [
      { q: 'How long does a clutch last?', a: 'It depends on how and where you drive. City driving with lots of stop-start wears it faster.' },
      { q: 'Do I need a new flywheel too?', a: 'Some cars have a dual-mass flywheel that wears with the clutch. We check it and tell you before fitting.' },
      { q: 'How long will the car be with you?', a: 'Usually a day. It depends on the car and parts.' },
    ],
  },
  {
    slug: 'suspension-and-steering',
    title: 'Suspension & Steering',
    group: 'Brakes, Clutch & Suspension',
    icon: MoveVertical,
    // TODO(client): confirm
    short: 'Knocks, pulling or a bouncy ride checked and fixed.',
    intro:
      'Suspension and steering keep the tyres on the road and the car going where you point it. Potholes and speed bumps wear the parts out. We find the worn part and replace it.',
    signs: [
      'Knocking or clunking over bumps',
      'The car pulls to one side or the steering wheel is off centre',
      'The car bounces or dips a lot when braking',
      'Uneven wear on the edges of the tyres',
    ],
    steps: [
      'We lift the car and check the springs, shock absorbers, arms and joints',
      'We tell you what is worn and quote for it',
      'We replace the worn parts',
      'We road test the car and advise if a wheel alignment is needed',
    ],
    faqs: [
      { q: 'Can a pothole damage my suspension?', a: 'Yes. A hard hit can break a spring or damage a joint. If the car feels different after a pothole, get it checked.' },
      { q: 'Will worn suspension fail an MOT?', a: 'It can. Broken springs and worn joints are common MOT failures.' },
      { q: 'Do you do wheel alignment?', a: 'Please ask when you book and we will advise.' }, // TODO(client): confirm wheel alignment
    ],
  },
  {
    slug: 'tyres',
    seoName: 'New & Part Worn Tyres',
    title: 'Tyres',
    group: 'Tyres & Exhaust',
    icon: CircleDot,
    featured: true,
    onSign: true, // "Tyres" and "New & Part Worn Tyres" on the sign
    short: 'New and part worn tyres, fitted and balanced.',
    intro:
      'Tyres are the only part of the car touching the road. We supply and fit new and part worn tyres, check the tread and pressures, and balance the wheels.',
    signs: [
      'Tread is close to the legal limit of 1.6mm',
      'Cuts, bulges or cracks in the sidewall',
      'A tyre keeps losing pressure',
      'Vibration through the steering wheel at speed',
    ],
    steps: [
      'We check the tread, sidewalls and pressures on every tyre',
      'We tell you your options, new or part worn, and the price',
      'We fit and balance the tyres',
      'We set the pressures and check the wheel nuts',
    ],
    faqs: [
      { q: 'What is the legal tread depth?', a: 'In the UK it is 1.6mm across the central three-quarters of the tread, all the way round. Many drivers change sooner for better grip in the wet.' },
      { q: 'Are part worn tyres safe?', a: 'Part worn tyres must be checked and marked as part worn by law. We check every one before fitting and tell you how much tread is left.' },
      { q: 'Do you have my tyre size in stock?', a: 'Call us with your size or registration and we will check what we have.' },
    ],
  },
  {
    slug: 'exhaust-repairs',
    title: 'Exhaust Repairs',
    group: 'Tyres & Exhaust',
    icon: Wind,
    // TODO(client): confirm
    short: 'Blowing, rattling or loud exhaust? We repair or replace the damaged section.',
    intro:
      'A damaged exhaust can be noisy, fail the MOT and let fumes into the car. We find the leak or loose part and repair or replace only what is needed.',
    signs: [
      'The car is much louder than usual',
      'Rattling from under the car',
      'A smell of exhaust fumes inside the car',
      'Something hanging down under the car',
    ],
    steps: [
      'We lift the car and inspect the full exhaust system',
      'We find the leak, broken bracket or worn section',
      'We quote, then repair or replace the part',
      'We run the engine and check for leaks',
    ],
    faqs: [
      { q: 'Is a blowing exhaust dangerous?', a: 'It can let fumes into the cabin, so get it checked soon and drive with a window open until then.' },
      { q: 'Will a loud exhaust fail an MOT?', a: 'Yes, leaks and excessive noise are MOT failures.' },
      { q: 'Do I need a whole new exhaust?', a: 'Often not. Many exhausts are made in sections, and we replace only the damaged part.' },
    ],
  },
  {
    slug: 'auto-electrics',
    title: 'Auto Electrics',
    group: 'Electrical & A/C',
    icon: Zap,
    // TODO(client): confirm
    short: 'Lights, windows, starting faults and wiring traced and fixed.',
    intro:
      'Electrical faults can be hard to pin down. We test the circuit step by step to find the fault, rather than swapping parts until it works.',
    signs: [
      'Lights, windows or locks stop working',
      'The car struggles to start or will not start',
      'The battery keeps going flat',
      'Fuses blow again after being replaced',
    ],
    steps: [
      'We read any fault codes and test the circuit',
      'We trace the fault to the part or wire',
      'We quote and carry out the repair',
      'We test everything works before you collect',
    ],
    faqs: [
      { q: 'Why does my battery keep going flat?', a: 'It may be the battery, the alternator not charging, or something draining power when the car is off. We test all three.' },
      { q: 'Can you fix a warning light for the airbag or ABS?', a: 'We can read the codes and find the cause. Call us to talk it through.' },
      { q: 'How long does fault finding take?', a: 'Some faults take minutes, some take longer. We agree a time limit with you before we start.' },
    ],
  },
  {
    slug: 'battery',
    seoName: 'Car Battery Replacement',
    title: 'Battery',
    group: 'Electrical & A/C',
    icon: BatteryCharging,
    // TODO(client): confirm
    short: 'Battery and charging tests, and replacement when it is time.',
    intro:
      'Most car batteries last a few years before they weaken. Cold mornings show up a weak battery fast. We test the battery and charging system, and fit the right replacement if needed.',
    signs: [
      'The engine turns over slowly when starting',
      'The battery light is on',
      'You have needed a jump start',
      'The battery is more than four or five years old',
    ],
    steps: [
      'We test the battery health and the alternator output',
      'We tell you whether it needs charging or replacing',
      'We fit the correct battery for your car',
      'We check the charging system and any stop-start settings',
    ],
    faqs: [
      { q: 'Can you test my battery while I wait?', a: 'Usually yes. Call first and we will tell you a good time.' },
      { q: 'My car has stop-start. Does it need a special battery?', a: 'Yes, usually an AGM or EFB battery. We fit the right type for your car.' },
      { q: 'Can you come to me if the car will not start?', a: 'Call us and we will tell you what we can do.' }, // TODO(client): confirm call-outs
    ],
  },
  {
    slug: 'air-conditioning',
    title: 'Air Conditioning Re-gas',
    group: 'Electrical & A/C',
    icon: Snowflake,
    // TODO(client): confirm
    short: 'A/C not blowing cold? We check it for leaks and re-gas it.',
    intro:
      'Car air conditioning slowly loses gas over time. A re-gas brings back cold air. If it has lost gas quickly, we check for a leak first.',
    signs: [
      'The air is not as cold as it used to be',
      'A musty smell when the A/C is on',
      'The windscreen takes a long time to clear',
      'A/C has not been checked for two years or more',
    ],
    steps: [
      'We check the system and the type of gas your car uses',
      'We remove the old gas and check for leaks',
      'We re-gas to the correct amount',
      'We check the vent temperature',
    ],
    faqs: [
      { q: 'How often should A/C be re-gassed?', a: 'Many makers suggest every second year. Running it regularly, even in winter, helps.' },
      { q: 'Why use the A/C in winter?', a: 'It dries the air and clears a misted windscreen faster.' },
      { q: 'How long does a re-gas take?', a: 'Usually around an hour.' },
    ],
  },
  {
    slug: 'mot-testing',
    title: 'MOT Testing',
    group: 'MOT',
    icon: ClipboardCheck,
    featured: true,
    onSign: true, // MOT Centre / Vehicle Testing Station sign
    page: '/mot',
    short: 'MOT tests on Chorlton Road, with repairs done here if anything fails.',
    intro: 'We are an MOT Centre. Book your test, and if anything fails we can quote and repair it here.',
    signs: [],
    steps: [],
    faqs: [],
  },
];

export const services = all.filter((s) => features.mot || s.group !== 'MOT');

// Services with their own detail page at /services/<slug>
export const detailServices = services.filter((s) => !s.page);

export const getService = (slug) => services.find((s) => s.slug === slug);
export const serviceHref = (s) => s.page ?? `/services/${s.slug}`;
export const featuredServices = services.filter((s) => s.featured).slice(0, 6);

export const relatedServices = (slug, n = 3) => {
  const s = getService(slug);
  const same = detailServices.filter((x) => x.group === s.group && x.slug !== slug);
  const rest = detailServices.filter((x) => x.group !== s.group && x.slug !== slug);
  return [...same, ...rest].slice(0, n);
};
