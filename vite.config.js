import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  ssr: {
    // CommonJS packages that Node cannot import by name; bundle them into the prerender build
    noExternal: ['react-helmet-async'],
  },
});
