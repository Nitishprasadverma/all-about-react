import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Useful for some file systems
    },
    hmr: true, // Ensures HMR is enabled
  },
});