import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, } from "path";
const path = require('path')
const fs = require('fs')
export default defineConfig(({ command, mode }) => {
  // https://vitejs.dev/config/#environment-variables
  //https://vitejs.dev/config/#base
  //加载环境变量，打包路由路径
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // 打包路径生产、开发/gitpages
    base: env.VITE_BASEURL,
    plugins: [react()],
    // 配置路径
    resolve: {
      alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
    },
    // vite.config.ts设置代理
    //https代理https://www.it610.com/article/1404045715889508352.html
    //代理路径
    server: {
      https: true,
      proxy: {
        // '/api': 'http://localhost:3003'
        '/cweb/': {
          // 开发、发布、gitpages
          target: 'https://localhost:3003/cweb',
          secure: false,//不检测https的合法性
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/cweb/, "")
        },
      },
    }
  }
})


