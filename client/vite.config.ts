import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { URL, fileURLToPath } from 'url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000
  },
  preview: {
    port: 3000
  }
})
