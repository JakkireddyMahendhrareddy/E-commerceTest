import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // Production build optimizations
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          utils: ['axios', 'js-cookie', 'validator']
        }
      }
    }
  },
  
  // Server configuration for development
  server: {
    port: 3000,
    host: true,
    open: true
  },
  
  // Preview configuration for testing builds
  preview: {
    port: 4173,
    host: true
  },
  
  // Environment variable handling
  define: {
    'process.env': {}
  }
});
