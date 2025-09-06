import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // so Vite binds to 0.0.0.0
allowedHosts: [
      '1abcbd72f82e.ngrok-free.app',
      // 'notenests.netlify.app', // replace with your actual ngrok URL
    ],
  },
})    
