import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base must match the GitHub repo name for Pages
export default defineConfig({
  base: '/the-grind/',
  plugins: [react()],
});
