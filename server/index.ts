import express from 'express'
import { createServer as createViteServer } from 'vite'
import { apiIndexRouter } from './api/index-api';
import { resolve } from 'path'
import { ssrHandler } from './ssr-utils';

export async function createApp() {
  const app = express();

  // 以中间件模式创建 Vite 应用，并将 appType 配置为 'custom'
  // 这将禁用 Vite 自身的 HTML 服务逻辑
  // 并让上级服务器接管控制
  const vite = await createViteServer({
    root: resolve(__dirname, '../'),
    server: {
      middlewareMode: true
    },
    appType: 'custom',
  });
  app.use(vite.middlewares);

  // 使用app.use()注册路由，并添加统一的访问前缀 /api
  app.use('/api', apiIndexRouter)

  app.get('*', async (req, res) => {
    ssrHandler(req, res, vite);
  });

  return app
}

(async () => {
  // 在50000端口启动Web服务器
  const app = await createApp();
  app.listen(50000, '0.0.0.0', () => {
    console.log('listening in port 50000')
  })

})().catch(console.error)