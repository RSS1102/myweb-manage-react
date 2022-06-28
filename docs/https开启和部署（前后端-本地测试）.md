1. 前端ssl：（开启Https）

   1. 从腾讯云内申请免费ssl证书（为期一年）地址：https://console.cloud.tencent.com/ssl。
   2. 本服务器是腾讯云服务器选择： Nginx（腾讯云宝塔面板可使用该类型） 下载证书。
   3. 登陆宝塔面板。
   4. 在宝塔内的**“网站”**选项添加**“PHP项目”**，添加自己网站（需要一个域名）。
   5. 选择ssl证书添加，将下载的证书 密钥(KEY) 和 证书(PEM格式) 添加，完成前端ssl。
   6. 选择强制开启**HTTPS**。

2. 后端ssl：

   1. 依然是从服务器申请的免费ssl证书。

   2. 因是Node项目，我选择了**“ 其他 ”**类型证书。

   3. 登陆宝塔面板。

   4. 在宝塔内的**“网站”**选项添加**“Node项目”**。

   5. 选择ssl证书添加，需要先开启外网映射，然后添加一个不同于本服务器部署的项目的域名。

   6. 选择ssl证书添加，将下载的证书 密钥(KEY) 和 证书(PEM格式) 添加，完成前端ssl。

   7. 选择强制开启**HTTPS**。

   8. node代码内：

      ```js
      // HTTPS 模块开启一个服务
      const https = require('https');
      const fs = require('fs')
      const options = {
          key: fs.readFileSync(__dirname + "/util/ssl/xxxx.games.key", 'utf8'),
          cert: fs.readFileSync(__dirname + '/util/ssl/xxxx.games_bundle.crt', 'utf8'),
      };
      
      app.get('/', async (req, res) => {
          res.send("express")
      })
      
      https.createServer(options, app).listen(port, () => {
          console.log(`Example app listening at https://localhost:${port}`)
          // console.log(`Example app listening at http://0.0.0.0:${port}`)
      })
      ```

      添加ssl证书：

      ![1656453052554](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\1656453052554.png)

3. 本地前端请求本地后端https服务，vite配置：

   ```js
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
         https: true,//开启https
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
   
   ```

   

   