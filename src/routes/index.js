import React from 'react'
import { useRoutes } from 'react-router-dom'
import {
  Home, 
  Page404
} from '../pages'

function AppRouter() {
  const Router = useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '*',
      element: <Page404 />
    }
  ])
  return Router
}

export default AppRouter;