import { lazy } from 'react'
import { useRoutes, Navigate } from 'react-router'

import { Item, Configuracao, Ponto, Usuario, Notificacao } from '../assets/Icons'
import AppLayout from '../layouts/AppLayout.jsx'
import AuthLayout from '../layouts/AuthLayout.jsx'

import NotFound from '../pages/NotFound.jsx'
import FormLogin from '../components/forms/FormLogin.jsx'
import FormCadastro from '../components/forms/FormCadastro.jsx'
import RecuperarSenha from '../pages/RegistrosUsuarios/RecuperarSenha.jsx'
import Overview from '../pages/Home/Overview.jsx'

// Páginas internas: viram /app/<path> e aparecem no menu automaticamente
export const appPages = [
  { path: 'painel',       label: 'Painel',       icon: Item,         Component: lazy(() => import('../pages/Painel/Painel.jsx')) },
  { path: 'dispositivos', label: 'Dispositivos', icon: Configuracao, Component: lazy(() => import('../pages/Dispositivos/Dispositivos.jsx')) },
  { path: 'tarefas',      label: 'Tarefas',      icon: Ponto,        Component: lazy(() => import('../pages/Tarefas/Tarefas.jsx')) },
  { path: 'perfil',       label: 'Perfil',       icon: Usuario,      Component: lazy(() => import('../pages/Perfil/Perfil.jsx')) },
  { path: 'faleconosco',  label: 'Fale Conosco', icon: Notificacao,  Component: lazy(() => import('../pages/Home/FaleConosco.jsx')) },
]

// Helper para montar links sempre absolutos
export const appPath = (path = '') => (path ? `/app/${path}` : '/app')

export default function AppRoutes() {
  return useRoutes([
    { path: '/', element: <Navigate to="/app" replace /> },

    // Telas públicas
    {
      element: <AuthLayout />,
      children: [
        { path: 'cadastro', element: <FormCadastro /> },
        { path: 'login', element: <FormLogin /> },
        { path: 'login/recuperar-senha', element: <RecuperarSenha /> },
      ],
    },

    // Área do app: só existe dentro de /app
    {
      path: '/app',
      element: <AppLayout />,
      children: [
        { index: true, element: <Overview /> },
        ...appPages.map(({ path, Component }) => ({ path, Component })),
      ],
    },

    // Rotas de teste só em desenvolvimento
    ...(import.meta.env.DEV
      ? [{ path: '/teste', Component: lazy(() => import('../pages/Teste.jsx')) }]
      : []),

    { path: '*', element: <NotFound /> },
  ])
}