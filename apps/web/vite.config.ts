import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const axelDevOrigin = (env.AXEL_DEV_ORIGIN || process.env.AXEL_DEV_ORIGIN || '').replace(/\/$/, '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@jd': path.resolve(__dirname, 'src/apps/jd-solutions'),
        '@site': path.resolve(__dirname, 'src'),
      },
    },
    server: axelDevOrigin
      ? {
          proxy: {
            '/axel': {
              target: axelDevOrigin,
              changeOrigin: true,
              // Preserve the /axel prefix when forwarding to the local Axel server.
            },
          },
        }
      : undefined,
  };
});
