import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/Monoploly-Vue.js/',
  // build: '../backend/public',
  build: {
    chunkSizeWarningLimit: 3600,
  },
  emptyOutDir: true,
})
