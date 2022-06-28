1. 创建储存变量的文件（以`.env`开头)，对应的 "scripts",(文件内变量必须以`VITE`开头)

   - .env.development (开发环境) 

     ` "dev": "vite  --mode development ",`

     ```
     # 开发环境development
     ENV = 'production'
     VITE_BASEURL = '/'
     VITE__URL='/cweb'
     ```

   - .env.production（生产环境) 

     ` "build": "tsc && vite build  --mode production",`

     ```
     #生产环境
     ENV="production"
     VITE_BASEURL = '/'
     VITE__URL='生产服务器地址'
     ```

   - .env.gitpages(GithubPage) 

     `"gitpage": "tsc && vite build  --mode gitpages",`
     
     ```
     #gitpage
     VITE_BASEURL = '/test-workflow/'
     VITE__URL='连接GitHubpage服务器地址'
     ```

2. 在axios请求的配置：

   ```js
   import axios from "axios";
   // 实例化axios
   const __ENV__ = import.meta.env  
   const http = axios.create({
       baseURL: __ENV__.VITE__URL,
       timeout: 5000,
       // 携带凭证
       withCredentials: false
   })
   ```

3. vite.config.ts配置

   ```js
   import { defineConfig, loadEnv } from 'vite'
   import react from '@vitejs/plugin-react'
   import { resolve, } from "path";
   export default defineConfig(({ command, mode }) => {
     // https://vitejs.dev/config/#environment-variables
     //https://vitejs.dev/config/#base
     //加载环境变量，打包路由路径
     const env = loadEnv(mode, process.cwd(), '')
     return {
       // 打包路径生产、开发/gitpages
       base: env.VITE_BASEURL,
       plugins: [react()],
         xxx......
     }
   })
   ```

   

