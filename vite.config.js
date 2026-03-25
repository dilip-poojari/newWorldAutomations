import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/newWorldAutomations/',
  server: {
    port: 3000,
    open: true
  }
})

// Made with Bob
