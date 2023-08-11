# React + TypeScript + Vite + ssr

### 一、使用vite初始化一个react+typescript项目
> 参考文档：https://cn.vitejs.dev/guide/

使用命令：
```
pnpm create vite
```
选择 `React` 和 `TypeScript`

### 二、动态路由增加

`Vite` 支持使用特殊的 `import.meta.glob` 函数从文件系统导入多个模块：
```
// 导入pages下所有有-page.tsx的文件
const pages = import.meta.glob('./pages/**/-page.tsx');
```
从而自动生成所有的路由，详情可见`src/create-router.tsx`

### 三、初始化server目录
> 参考文档： https://cn.vitejs.dev/guide/ssr.html

使用一个服务端的`npm`库，如`express`，`koa`等库 
* 完成`api`接口监听
* 实现对`vitejs`的静态构建进行接管
* 准备适当的服务端`mock`数据

最后在`package.json`中添加启动命令
```
ts-node-dev -P ./server/tsconfig.server.json --respawn --transpile-only server/index.ts
```
`ts-node-dev`能直接执行`ts`文件，并且支持监听文件重新执行。

`-P` 指定`tsconfig`文件位置，默认情况下`ts-node`会查找项目下的`tsconfig.json`文件，如果是其它的，则需要通过该参数指定。

`--respawn` 启用了监听重启的能力

`--transpile-only` 提供了更快的编译速度

### 四、对前端页面进行初步的服务端渲染
> 参考文档：https://reactrouter.com/en/main/guides/ssr

### 五. 在服务端进行数据请求
* 服务端的axios实例，cookie和header的处理
* 拆分客户端和服务端axios的实例
* 数据预请求函数

## 六. css样式的直出，styled-components的样式的直出，避免页面样式闪动

相关资料：
https://styled-components.com/docs/advanced#server-side-rendering

## 七. title的直出，meta标签的直出

react-helmet-async