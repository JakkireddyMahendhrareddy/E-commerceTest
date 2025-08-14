// Deployment Configuration
export default {
  // Production build settings
  build: {
    // Output directory
    outDir: 'dist',
    
    // Source maps (disabled for production)
    sourcemap: false,
    
    // Minification
    minify: 'terser',
    
    // Chunk splitting for better caching
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
  
  // Environment variables
  env: {
    // Production API URL
    VITE_API_URL: 'https://e-commercebackend-1-k8yl.onrender.com',
    
    // App configuration
    VITE_APP_NAME: 'NXT Trendz',
    VITE_APP_VERSION: '1.0.0'
  },
  
  // Server configuration for different environments
  server: {
    development: {
      port: 3000,
      host: 'localhost'
    },
    production: {
      port: 4173,
      host: '0.0.0.0'
    }
  }
};
