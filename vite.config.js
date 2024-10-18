import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 3000, // Use Render's PORT
    host: '0.0.0.0', // Allow access from outside
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your backend's local address
        changeOrigin: true,
      },
    },
  },
})
