import { lazy } from 'react'
import { Item, Configuracao, Ponto, Usuario, Notificacao } from '../assets/Icons'
import tarefasImg from '../assets/img/Tarefas.png'
import painelImg from '../assets/img/Painel.png'

export const appPath = (path = '') => (path ? `/app/${path}` : '/app')

// variant: 'home' | 'inner' (padrão) | 'profile'
// menus: onde aparece ('bottom' = barra inferior, máx. 5; 'sidebar' = menu lateral)
export const appPages = [
  { path: '',             label: 'Home',         icon: Item,         variant: 'home',    menus: ['bottom', 'sidebar'], Component: lazy(() => import('../pages/Home/Overview.jsx')) },
  { path: 'tarefas',      label: 'Tarefas',      icon: Ponto,        menus: ['bottom', 'sidebar'], Component: lazy(() => import('../pages/Tarefas/Tarefas.jsx')) },
  { path: 'dispositivos', label: 'Dispositivos', icon: Configuracao, menus: ['bottom', 'sidebar'], Component: lazy(() => import('../pages/Dispositivos/Dispositivos.jsx')) },
  { path: 'painel',       label: 'Painel',       icon: Item,         menus: ['bottom', 'sidebar'], Component: lazy(() => import('../pages/Painel/Painel.jsx')) },
  { path: 'perfil',       label: 'Perfil',       icon: Usuario,      variant: 'profile', menus: ['bottom', 'sidebar'], Component: lazy(() => import('../pages/Perfil/Perfil.jsx')) },
  { path: 'fale-conosco', label: 'Fale Conosco', icon: Notificacao,  menus: ['sidebar'], Component: lazy(() => import('../pages/Home/FaleConosco.jsx')) },
  { path: 'tarefas', label: 'Tarefas', icon: Ponto, menus: ['bottom', 'sidebar'],
  home: { tone: 'green', img: tarefasImg, text: 'Veja suas tarefas, metas e progresso nos seus objetivos' },
  Component: lazy(() => import('../pages/Tarefas/Tarefas.jsx')) },

{ path: 'painel', label: 'Painel', icon: Item, menus: ['bottom', 'sidebar'],
  home: { tone: 'blue', img: painelImg, text: 'Veja informações sobre seu uso de água, áreas de irrigação e o clima!' },
  Component: lazy(() => import('../pages/Painel/Painel.jsx')) },
]

// Página atual pela URL; o prefixo mais longo vence (/app/painel/areas/1 -> Painel)
export function getPage(pathname) {
  const clean = pathname.replace(/\/+$/, '')
  return (
    [...appPages]
      .filter((p) => p.path)
      .sort((a, b) => b.path.length - a.path.length)
      .find((p) => clean === appPath(p.path) || clean.startsWith(appPath(p.path) + '/')) ?? appPages[0]
  )
}