import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

const isLibrary = process.env.npm_lifecycle_event === 'build:lib';

export default defineConfig({
  plugins: isLibrary
    ? [react()]
    : [
        react(),
        laravel({
          input: [
            'resources/css/app.css', 
            'resources/js/app.js',
            'resources/js/vendor/incodiy/realments/index.jsx',
          ],
          refresh: true,
        }),
      ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/js'),
    },
  },
  build: isLibrary
    ? {
        lib: {
          entry: path.resolve(__dirname, 'resources/js/vendor/incodiy/realments/index.jsx'),
          name: 'Realments',
          fileName: (format) => `realments.${format}.js`,
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
        outDir: 'dist', // atau 'dist' kalau untuk distribusi package
        emptyOutDir: true,
        cssCodeSplit: true,
        manifest: false, // nonaktifkan manifest.json
      }
    : undefined,
});
