import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },

  build: {
    // Raise the warning limit — framer-motion is intentionally large
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Split stable vendor code into separate cacheable chunks.
        // When app code changes, these chunks stay the same → CDN cache hits.
        manualChunks: {
          'react-vendor':  ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'icons':         ['lucide-react'],
        },
      },
    },
  },
})
