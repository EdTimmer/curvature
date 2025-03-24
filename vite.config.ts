import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // You can define a path to a file with global variables or mixins here
        additionalData: `
         @use "./src/styles/variables.scss" as *;
        `
      }
    }
  }
})
