import react from '@vitejs/plugin-react'

import { backendUrl } from './config.js';

// https://vitejs.dev/config/
export default {
  build: {
    rollupOptions: {
      external: ['react-dom/client'],
    },
  },
  
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: "http://localhost:4000/",
        changeOrigin: true,
      },
    }
  }
}