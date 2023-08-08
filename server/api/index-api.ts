import express from 'express';
import { apiPostsRouter } from './posts';

/**
 * express中的路由代表 请求与服务器处理函数之间的映射关系
 * 每当一个请求到达服务器之后，需要先经过路由的匹配，只有匹配成功之后，才会调用对应的处理函数。
 * 在匹配时，会按照路由的顺序进行匹配，如果请求类型和请求的 URL 同时匹配成功，则 Express 会将这次请求，转交给对应的 function 函数进行处理。
 */
export const apiIndexRouter = express.Router();

apiIndexRouter.use('/posts', apiPostsRouter)                     