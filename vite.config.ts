import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";
export default defineConfig({
  plugins: [react()],
  // 配置路径
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
  },
  // vite.config.ts设置代理
  //代理
  server: {
    proxy: {
      // '/api': 'http://localhost:3003'
      '/cweb': {
        target: 'http://localhost:3003/cweb/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cweb/, ""),
      },
    },
  }

})


