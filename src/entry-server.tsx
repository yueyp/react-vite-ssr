import express from "express";
import { StaticHandlerContext, StaticRouterProvider, createStaticHandler, createStaticRouter } from 'react-router-dom/server'
import { RenderResult } from '../server/ssr-utils'
import { createRouter } from "./create-router";
import ReactDOMServer from 'react-dom/server'
import App from "./App";
import { createFetchRequest } from "./plugins/fetch-request";
import { ServerStyleSheet } from "styled-components";
import { HelmetProvider, HelmetServerState } from "react-helmet-async";

const { routes } = createRouter()
// 使用createStaticHandler为路由加载数据
const routerHandler = createStaticHandler(routes)

async function renderPage({
    context,
    template
}: {
    context: StaticHandlerContext,
    template: string; // index.html的模板
}): Promise<RenderResult['renderData']> {
    // 创建路由
    const router = createStaticRouter(
        routerHandler.dataRoutes,
        context
    );

    const sheet = new ServerStyleSheet();

    const helmetContext: {
        helmet?: HelmetServerState
    } = {};

    /**
     * 进行渲染
     * context 是createStaticHandler().query()调用返回的上下文，其中包含为请求获取的所有数据。
     */
    const html = ReactDOMServer.renderToString(sheet.collectStyles(
        <App>
            <HelmetProvider context={helmetContext}>
                <StaticRouterProvider router={router} context={context} />
            </HelmetProvider>
        </App>
    ));

    // 5. 注入渲染后的应用程序 HTML 到模板中。
    const content = template.replace('<!--app-html-->', html).replace('<!--server-style-sheet--->', sheet.getStyleTags());

    return {
        content,
        statusCode: context.statusCode,
    }
}

/**
 * 服务端的渲染函数
 * @param param 
 * @returns 
 */
export async function render(param: {
    req: express.Request,
    res: express.Response,
    template: string;
}): Promise<RenderResult> {
    // 将express请求转换为fetch请求
    const fetchRequest = createFetchRequest(param.req);
    // 接收fetch请求执行路由匹配，返回页面上下文相关信息
    const context = await routerHandler.query(fetchRequest);

    // 得到重定向响应，则直接让express处理它
    if (context instanceof Response) {
        return {
            renderData: {
                statusCode: context.status,
                content: '',
            }
        }
    }

    const renderData = await renderPage({ context, template: param.template });
    return {
        renderData
    }
}