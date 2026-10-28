// Car-care tips. Each post: summary at the top, h2 sections, and a booking CTA (added by the page).
// Section shape: { h, p: [paragraphs], list?: [items] }
export const posts = [
  {
    slug: 'dashboard-warning-lights',
    title: 'Dashboard warning lights: which ones mean stop now',
    description: 'Red, amber or green? A plain guide to the dashboard warning lights that mean pull over now, and the ones that can wait a day or two.',
    date: '2026-10-01',
    readMins: 4,
    summary: 'Red lights usually mean stop as soon as it is safe. Amber lights mean get it checked soon. A flashing engine light means ease off and call a garage. If you are not sure, check the handbook and ring us.',
    sections: [
      {
        h: 'The colour tells you how urgent it is',
        p: [
          'Car makers use a traffic light system. Green or blue lights simply tell you something is on, such as main beam or cruise control. Amber or yellow lights warn you about a fault that needs checking soon. Red lights point to a problem that could damage the engine or make the car unsafe.',
          'Every car is slightly different, so keep the handbook in the glovebox. It shows each symbol for your model and what the maker wants you to do.',
        ],
      },
      {
        h: 'Red lights: pull over as soon as it is safe',
        p: ['If one of these comes on while you are driving, find a safe place to stop, turn the engine off and call for help.'],
        list: [
          'Oil pressure (an old-style oil can). The engine may not be getting enough oil. Driving on can wreck it in minutes.',
          'Engine temperature (a thermometer in liquid). The engine is overheating. Do not open the coolant cap while it is hot.',
          'Brake warning (a circle with an exclamation mark). The fluid may be low or there may be a fault with the brakes.',
          'Battery or charging (a battery symbol). The alternator may have stopped charging, so the car could cut out soon.',
          'Power steering (a steering wheel). Steering may suddenly become very heavy.',
        ],
      },
      {
        h: 'Amber lights: book it in soon',
        p: ['These do not usually mean stop right now, but do not ignore them for weeks. A small fault can turn into a bigger bill.'],
        list: [
          'Engine management (an engine outline). A steady light means a fault has been stored. Book a diagnostic check.',
          'ABS. Your normal brakes still work, but the anti-lock system may not.',
          'Tyre pressure. One or more tyres may be low. Check them at a garage forecourt and look for a puncture.',
          'Glow plug (a coil, on diesels). If it flashes while driving, there may be an engine fault.',
          'Airbag. The airbag may not work in a crash. Get it checked.',
        ],
      },
      {
        h: 'A flashing engine light is different',
        p: [
          'If the engine management light flashes rather than staying on, it often means the engine is misfiring. Unburnt fuel can overheat and damage the catalytic converter, which is expensive to replace.',
          'Ease off the throttle, avoid hard acceleration and get the car checked as soon as you can. If the car shakes badly or loses power, stop and call us.',
        ],
      },
      {
        h: 'What we do when you bring it in',
        p: [
          'We plug in a diagnostic tool and read the fault codes stored by the car. A code tells us which system has a problem, not always which part, so we then test the parts involved to find the real cause.',
          'You get a plain English explanation and a price before any work starts. If you are stuck at the roadside, call us. If anyone is in danger, call 999.',
        ],
      },
    ],
  },
  {
    slug: 'how-often-should-my-car-be-serviced',
    title: 'How often should my car be serviced?',
    description: 'Interim, full or major service? How often your car needs one, what each covers, and why your driving habits matter.',
    date: '2026-09-15',
    readMins: 4,
    summary: 'Most cars need a full service every 12 months or 12,000 miles, whichever comes first. High-mileage drivers may need an interim service every six months. Your handbook or service book has the exact schedule for your car.',
    sections: [
      {
        h: 'The short answer',
        p: [
          'For most cars, plan on a full service once a year or every 12,000 miles, whichever comes first. If you drive a lot, an interim service halfway through the year keeps the oil fresh and catches wear early.',
          'Some newer cars use a variable or long-life schedule and show a reminder on the dashboard. Follow that, but keep in mind that short trips and city driving are harder on a car than motorway miles.',
        ],
      },
      {
        h: 'Interim, full and major services',
        list: [
          'Interim service: oil and oil filter change, plus safety checks on brakes, tyres, lights, wipers and fluids. Good every six months or 6,000 miles if you drive a lot.',
          'Full service: everything in an interim, plus more checks and usually new air and cabin filters, a look at the suspension, steering and exhaust, and a test drive. Once a year for most of us.',
          'Major service: a full service plus items due at longer intervals, such as spark plugs, fuel filter or brake fluid. Usually every second year.',
        ],
        p: ['The exact list depends on the car. We follow the schedule for your make and model and tell you if anything else is due.'],
      },
      {
        h: 'Why your driving matters',
        p: [
          'Lots of short trips around Manchester mean the engine rarely gets fully warm. Moisture and fuel can build up in the oil, so it wears out faster. Stop-start traffic is also hard on brakes and the clutch.',
          'If most of your driving is short local runs, servicing a little more often than the book says is money well spent.',
        ],
      },
      {
        h: 'Does servicing affect my warranty?',
        p: [
          'You do not have to go back to a main dealer to keep your manufacturer warranty. Under UK rules, an independent garage can service your car as long as the work follows the maker schedule and uses suitable parts. Keep the receipts and the stamped service book.',
        ],
      },
      {
        h: 'Signs you should not wait for the next service',
        list: [
          'A warning light on the dashboard',
          'New noises, smells or vibrations',
          'The car pulling to one side',
          'Oil or coolant spots under the car',
        ],
        p: ['Any of these is worth a call. Catching a problem early is almost always cheaper.'],
      },
      {
        h: 'Servicing and the MOT',
        p: [
          'A service and an MOT are not the same. The MOT is a yearly legal check of safety and emissions. A service keeps the car healthy. Doing both at the same visit saves you a trip, and the service often fixes small items before the test.',
        ],
      },
    ],
  },
  {
    slug: 'signs-your-brakes-need-checking',
    title: '5 signs your brakes need checking',
    description: 'Squealing, grinding, a soft pedal, pulling or vibration: five brake warning signs every driver should know, and what each one usually means.',
    date: '2026-08-28',
    readMins: 4,
    summary: 'Get your brakes checked if you hear squealing or grinding, the pedal feels soft, the car pulls to one side, you feel vibration when stopping, or the brake warning light comes on. Most brake problems are cheaper to fix early.',
    sections: [
      {
        h: '1. Squealing or grinding',
        p: [
          'Many brake pads have a small metal tab that squeals when the pad is nearly worn out. It is a built-in reminder. If you hear grinding, the pad may be worn right down and metal is rubbing on the disc. That damages the disc and makes the car take longer to stop.',
          'A light squeak after rain or a car wash is common and often goes after a few stops. A noise that stays is worth a check.',
        ],
      },
      {
        h: '2. A soft or spongy pedal',
        p: [
          'The pedal should feel firm and stop at the same point every time. If it feels spongy, sinks towards the floor, or you have to press harder than usual, there may be air or water in the brake fluid, a leak, or a worn part.',
          'This one is a safety issue. Drive gently and get it checked straight away.',
        ],
      },
      {
        h: '3. The car pulls to one side',
        p: [
          'If the car pulls left or right when you brake, one side may be working harder than the other. A sticking caliper, a worn hose or uneven pad wear are common causes. It can also be a tyre or suspension problem, so it is worth having the whole car looked at.',
        ],
      },
      {
        h: '4. Vibration when stopping',
        p: [
          'A shudder through the pedal or steering wheel when you brake often points to warped or worn discs. It tends to get worse over time and can make the car less stable under heavy braking.',
        ],
      },
      {
        h: '5. The brake warning light',
        p: [
          'A red brake light can mean the handbrake is on, the fluid level is low, or there is a fault in the system. If the handbrake is fully off and the light stays on, stop when it is safe and call us. An amber ABS light means the anti-lock system has a fault, even though the normal brakes still work.',
        ],
      },
      {
        h: 'What a brake check involves',
        p: [
          'We take the wheels off and measure the pads and discs, check the calipers and hoses, and look at the brake fluid. We then tell you what is worn and how much life is left, and only replace what needs replacing. You get a clear quote before any work.',
          'Most makers recommend changing brake fluid every second year. Old fluid absorbs water from the air, which can make the brakes less effective when they get hot.',
        ],
      },
    ],
  },
];

export const getPost = (slug) => posts.find((p) => p.slug === slug);
