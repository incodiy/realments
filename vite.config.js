// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  publicDir: false, // Disable publicDir untuk hindari konflik saat outDir ada di dalam public
  build: {
    outDir: 'public/vendor/realments/js',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'resources/js/realments/index.jsx'),
      output: {
        entryFileNames: 'realments.js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/js/realments'),
    }
  }
});
