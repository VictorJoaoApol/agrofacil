// routes/index.jsx
import { Navigate, useRoutes } from 'react-router'
import { appPages } from './pages'
import ProtectedRoute from './ProtectedRoute.jsx'
import PublicRoute from './PublicRoute.jsx'
import AppLayout from '../layouts/AppLayout.jsx'
import AuthLayout from '../layouts/AuthLayout.jsx'
import NotFound from '../pages/NotFound.jsx'
import Login from '../pages/RegistrosUsuarios/Login.jsx'
import Cadastro from '../pages/RegistrosUsuarios/Cadastro.jsx'
import RecuperarSenha from '../pages/RegistrosUsuarios/RecuperarSenha.jsx'

export default function AppRoutes() {
  return useRoutes([
    { path: '/', element: <Navigate to="/app" replace /> },

    // Só para quem NÃO está logado (logado é redirecionado para /app)
    {
      element: <PublicRoute />,
      children: [
        {
          element: <AuthLayout />,
          children: [
            { path: 'login', element: <Login /> },
            { path: 'login/recuperar-senha', element: <RecuperarSenha /> },
            { path: 'cadastro', element: <Cadastro /> },
          ],
        },
      ],
    },

    // Só para quem está logado (senão vai para /login)
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: '/app',
          element: <AppLayout />,
          children: appPages.map(({ path, Component }) =>
            path === '' ? { index: true, Component } : { path, Component },
          ),
        },
      ],
    },

    { path: '*', element: <NotFound /> },
  ])
}
