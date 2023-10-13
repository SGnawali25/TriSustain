import react from '@vitejs/plugin-react'

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
        target: "https://trisustain.vercel.app/",
        changeOrigin: true,
      },
    }
  }
}