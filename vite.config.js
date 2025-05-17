import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/Resources/js/index.jsx'),
      name: 'Realments',
      fileName: (format) => `realments.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'i18next', 'react-i18next'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          i18next: 'i18next',
          'react-i18next': 'ReactI18next'
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  }
});
