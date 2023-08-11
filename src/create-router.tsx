import type { FunctionComponent } from 'react';
import type { ActionFunction, LoaderFunction, RouteObject } from 'react-router-dom'


export function createRouter() {
  const pages = import.meta.glob('./pages/**/-page.tsx');

  const routes: RouteObject[] = [];

  Object.keys(pages).forEach(path => {
    const match = /\.\/pages(.*)\/-page\.tsx$/.exec(path);
    if (match) {
      const name = match[1];
      if (name.toLocaleLowerCase() !== name) {
        console.error(new Error(`请使用小写路径为该路径进行命名:/pages${name}`));
        return;
      }

      let routerPath = name.replace(/\/index$/, '');
      if (routerPath === '/index') {
        routerPath = '';
      }

      routerPath = routerPath.replace(/^\//, '');

      routes.push({
        path: `/${routerPath}`,
        errorElement: <div>出错了</div>,
        async lazy() {
          const t = (await (pages[path]())) as { 
            default: FunctionComponent<unknown>,
            loader?: LoaderFunction,
            action?: ActionFunction, };
          return {
            Component: t.default,
            loader: t.loader,
            action: t.action
          };
        },
      });
    }
  });

  routes.sort((a, b) => ((b.path?.length ?? 0) - (a.path?.length ?? 0)));

  /**
   * 404 页面
   */
  // const NotFoundComp = loadable(async () => import('./pages/error/404/page'), {
  //   fallback: <div />,
  // });
  // routes.push({
  //   path: '*',
  //   errorElement: <div>出错了</div>,
  //   element: <NotFoundComp />,
  // });

  return {
    routes,
  };
}
