import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  
  server: {
    watch: {
      usePolling: true, // Ensures file changes are detected
    },
    host: true, // Allows access from network
    port: 5173, // Default Vite port (change if needed)
    strictPort: true, // Ensures it doesn't switch ports
    open: true, // Opens browser on server start
  },
  
})
