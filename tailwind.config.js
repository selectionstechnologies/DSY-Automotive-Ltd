/** @type {import('tailwindcss').Config} */
// Colours come from the CSS variables in src/index.css (RGB channels, so opacity modifiers work)
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: token('bg'),
        surface: { DEFAULT: token('surface'), 2: token('surface-2') },
        line: { DEFAULT: token('line'), strong: token('line-strong') },
        ink: token('text'),
        muted: token('text-muted'),
        charcoal: token('charcoal'),
        brand: { DEFAULT: token('brand'), strong: token('brand-strong'), ink: token('brand-ink') },
        accent: { DEFAULT: token('accent'), strong: token('accent-strong') },
        info: token('info'),
        success: token('success'),
        danger: token('danger'),
      },
      fontFamily: {
        heading: ['Archivo', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
      borderRadius: {
        ui: '6px',
        card: '12px',
        media: '20px',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        hover: 'var(--shadow-hover)',
      },
      transitionDuration: {
        DEFAULT: '250ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
