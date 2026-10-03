import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const port = Number(process.env.PORT) || 5173;
const basePath = process.env.BASE_PATH || '/';

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
    // Split the bundle into smaller pieces for faster loading
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React — always needed immediately
          'react-vendor': ['react', 'react-dom'],
          // Routing — needed on every page but separate from React
          'router': ['wouter'],
          // i18n — only needed after first render
          'i18n': ['react-i18next', 'i18next'],
          // Icons — large library, split out
          'icons': ['lucide-react'],
          // UI primitives
          'ui': [
            '@radix-ui/react-tooltip',
            '@radix-ui/react-dialog',
            '@radix-ui/react-slot',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
          ],
          // Data layer
          'query': ['@tanstack/react-query'],
        },
      },
    },
    // Raise the warning threshold slightly since we've already split
    chunkSizeWarningLimit: 300,
  },
  server: {
    port,
    strictPort: false,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
