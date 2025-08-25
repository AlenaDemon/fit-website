import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  server: {
    host: '0.0.0.0',
    port: 3000, // для dev
  },
  preview: {
    host: '0.0.0.0', 
    port: 3001, // для preview
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})