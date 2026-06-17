import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Serve the project-root `assets/` folder as static files (audio, etc.)
  publicDir: 'assets',
})
