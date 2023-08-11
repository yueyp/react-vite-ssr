import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createRouter } from './create-router.tsx'
import { RouterProvider, createBrowserRouter, matchRoutes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

async function render() {

  const { routes } = createRouter();

  const lazyMatches = matchRoutes(
    routes,
    window.location
  )?.filter((m) => m.route.lazy)

  // Load the lazy matches and update the routes before creating your router
  // so we can hydrate the SSR-rendered content synchronously
  if (lazyMatches && lazyMatches.length > 0) {
    await Promise.all(
      lazyMatches.map(async (m) => {
        const routeModule = await m.route.lazy()
        Object.assign(m.route, {
          ...routeModule,
          lazy: undefined
        })
      })
    )
  }

  const router = createBrowserRouter(routes, {
    basename: '/',
  });

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <HelmetProvider>
        <App>
          <RouterProvider router={router} />
        </App>
      </HelmetProvider>
    </React.StrictMode>,
  )
}

render();