import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@jd': path.resolve(__dirname, 'src/apps/jd-solutions'),
      '@split-frame': path.resolve(__dirname, 'src/apps/split-frame'),
      '@site': path.resolve(__dirname, 'src'),
    },
  },
});
