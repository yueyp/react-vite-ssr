# React + TypeScript + Vite + ssr

## 使用vite初始化一个react+typescript项目
> 参考文档：https://cn.vitejs.dev/guide/

### 项目创建

使用命令：
```
pnpm create vite
```
选择 `React` 和 `TypeScript`

### 动态路由增加

`Vite` 支持使用特殊的 `import.meta.glob` 函数从文件系统导入多个模块：
```
// 导入pages下所有有-page.tsx的文件
const pages = import.meta.glob('./pages/**/-page.tsx');
```
从而自动生成所有的路由，详情可见`src/create-router.tsx`