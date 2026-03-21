import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'es2020',
      // Produce smaller chunks for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            // Split React into its own vendor chunk — cached indefinitely
            react: ['react', 'react-dom'],
          },
        },
      },
      // Inline small assets instead of separate requests
      assetsInlineLimit: 4096,
      // Generate source maps only in dev
      sourcemap: false,
      // Report if any chunk is bigger than 400KB
      chunkSizeWarningLimit: 400,
    },
    css: {
      devSourcemap: true,
    },
  };
});
