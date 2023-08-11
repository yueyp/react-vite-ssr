import { Request, Response } from "express";
import { ViteDevServer } from "vite";
import { readFileSync } from "fs";
import { resolve } from "path";

export interface RenderResult {
  /**
   * 重定向模式下
   */
  redirect?: {
    url: string | null;
    statusCode: number;
  };
  /**
   * 直接返回的模式
   */
  renderData?: {
    content: string;
    statusCode: number;
  };
}

async function renderPage(
  req: Request,
  res: Response,
  vite?: ViteDevServer
): Promise<RenderResult> {
  try {
    let template = "";
    let render: (param: {
      req: Request;
      res: Response;
      template: string;
    }) => Promise<RenderResult>;

    if (vite) {
      // 1. 读取 index.html
      template = readFileSync(resolve(__dirname, "../index.html"), "utf-8");  
      /**
       * 2. 应用 Vite HTML 转换。这将会注入 Vite HMR 客户端，同时也会从 Vite 插件应用 HTML 转换。例如：@vitejs/plugin-react 中的 global preambles
       */
      template = await vite.transformIndexHtml(req.originalUrl, template);
      /**
       * 3. 加载服务器入口。vite.ssrLoadModule 将自动转换你的 ESM 源码使之可以在 Node.js 中运行！无需打包,并提供类似 HMR 的根据情况随时失效。
       */
      render = (
        await vite.ssrLoadModule(resolve(__dirname, "../src/entry-server"))
      ).render;
    } else {
      throw new Error("生产环境未就绪");
    }

    /**
     * 4. 渲染应用的 HTML。这假设 entry-server.js 导出的 `render`函数调用了适当的 SSR 框架 API。例如 ReactDOMServer.renderToString()
     */
    const renderResult = await render({ req, res, template });

    return renderResult;
  } catch (error) {
    // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回你的实际源码中。
    if (vite && error instanceof Error) {
      vite.ssrFixStacktrace(error);
    }
    throw error;
  }
}

export const ssrHandler = (
  req: Request,
  res: Response,
  vite: ViteDevServer
) => {
  (async () => {
    try {
      const result = await renderPage(req, res, vite);
      // 处理重定向
      if (result.redirect) {
        res.redirect(result.redirect.statusCode, result.redirect.url || "");
        return;
      }

      // 6. 返回渲染后的 HTML。
      if (result.renderData) {
        res.setHeader("Content-Type", "text/html");
        res
          .status(result.renderData.statusCode || 200)
          .end(result.renderData.content);
        return;
      }
      throw new Error("渲染异常");
    } catch (error) {
      console.error(error.stack);
      res.status(500).end(error.stack);
    }
  })();
};
