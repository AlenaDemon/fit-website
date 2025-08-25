import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  server: {
    host: '0.0.0.0',
    port: 10000
  },
  preview: {
    host: '0.0.0.0', 
    port: 10000
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})