import { lazy } from 'react'
import { useRoutes, Navigate } from 'react-router'
import { appPages } from './pages'
import AppLayout from '../layouts/AppLayout.jsx'
import AuthLayout from '../layouts/AuthLayout.jsx'
import NotFound from '../pages/NotFound.jsx'
import Login from '../pages/RegistrosUsuarios/Login.jsx'
import Cadastro from '../pages/RegistrosUsuarios/Cadastro.jsx'
import RecuperarSenha from '../pages/RegistrosUsuarios/RecuperarSenha.jsx'

export default function AppRoutes() {
  return useRoutes([
    { path: '/', element: <Navigate to="/app" replace /> },

    {
      element: <AuthLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'login/recuperar-senha', element: <RecuperarSenha /> },
        { path: 'cadastro', element: <Cadastro /> },
      ],
    },

    {
      path: '/app',
      element: <AppLayout />,
      children: appPages.map(({ path, Component }) =>
        path === '' ? { index: true, Component } : { path, Component }
      ),
    },

    ...(import.meta.env.DEV
      ? [{ path: '/teste', Component: lazy(() => import('../pages/Teste.jsx')) }]
      : []),

    { path: '*', element: <NotFound /> },
  ])
}