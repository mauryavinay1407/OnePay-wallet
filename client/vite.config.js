import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy: {
     '/api/v1' : {
      target:'https://onepay-wallet.onrender.com',
      changeOrigin: true,
      secure: true,
      rewrite: (path) => path.replace(/^\/api\/v1/, '/api/v1')
     }
     },
   },
  plugins: [react()],
})
