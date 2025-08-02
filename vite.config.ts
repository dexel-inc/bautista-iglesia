import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from 'path'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Optimizaciones para mejorar LCP
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          i18n: ['react-i18next', 'i18next'],
        }
      }
    },
    // Comprimir assets
    cssCodeSplit: true,
    // Preload de chunks críticos
    modulePreload: {
      polyfill: true
    }
  },
  // Optimizar fuentes y assets
  assetsInclude: ['**/*.woff2', '**/*.woff'],
})
