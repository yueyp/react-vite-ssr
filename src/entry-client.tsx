import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createRouter } from './create-router.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'

function render() {

  const { routes } = createRouter();
  const router = createBrowserRouter(routes, {
    basename: '/',
  });
  
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App>
        <RouterProvider router={router}  />
      </App>
    </React.StrictMode>,
  )
}

render();