// Responsive <picture> for an entry from src/data/images.js. Files are built by `npm run images`.
const WIDTHS = [640, 1024, 1600, 2400];

const srcset = (img, ext) =>
  [...WIDTHS.filter((w) => w < img.width), img.width].map((w) => `/photos/${img.id}-${w}.${ext} ${w}w`).join(', ');

export default function Picture({ image, sizes = '100vw', priority = false, className = '', alt }) {
  return (
    <picture>
      <source type="image/avif" srcSet={srcset(image, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(image, 'webp')} sizes={sizes} />
      <img
        src={`/photos/${image.id}-${Math.min(1024, image.width)}.webp`}
        alt={alt ?? image.alt}
        width={image.width}
        height={image.height}
        style={{ objectPosition: image.focal }}
        className={`object-cover ${className}`}
        {...(priority ? { fetchpriority: 'high' } : { loading: 'lazy', decoding: 'async' })}
      />
    </picture>
  );
}
