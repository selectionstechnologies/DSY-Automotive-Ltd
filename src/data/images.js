// Single source of truth for every client photo.
// file: master in src/assets/photos/. Responsive files are built into public/photos/ by `npm run images`.
// width/height: the master's size (used for aspect ratio and the largest srcset entry).
// usage: 'hero' | 'about' | 'gallery' | 'service:<slug>' | 'og'
// TODO(client): more real photos needed (workshop, ramp, tyre bay, diagnostics). Only one usable photo was supplied.
export const images = [
  {
    id: 'exterior-signage',
    file: 'exterior-signage.jpg',
    width: 1360,
    height: 1020,
    alt: 'The DSY Automotive garage on Chorlton Road, with its yellow sign and MOT Centre sign above the roller shutters',
    focal: '58% 60%',
    ogCrop: { left: 230, top: 400, width: 820, height: 430 },
    usage: ['hero', 'og', 'gallery', 'about', 'service:mot', 'service:tyres'],
  },
];

export const imageFor = (usage) => images.find((i) => i.usage.includes(usage));
export const galleryImages = images.filter((i) => i.usage.includes('gallery'));
