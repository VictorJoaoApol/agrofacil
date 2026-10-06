// routes/pages.js
import { lazy } from 'react'
import { Ajuda, IconPlaceholder, Item, Configuracao, Ponto, Usuario } from '../assets/Icons'
import tarefasImg from '../assets/img/Tarefas.png'
import painelImg from '../assets/img/Painel.png'

/*
  ÚNICA lista de páginas internas: rotas, barra inferior, Sidebar, títulos da
  Navbar e cards da Home saem daqui. Para criar uma página nova: crie o arquivo
  e adicione UMA entrada abaixo (sem repetir path).

  path     -> vira /app/<path> ('' = /app)
  label    -> nome no menu e título da Navbar
  icon     -> componente de ícone
  variant  -> 'home' | 'inner' (padrão) | 'profile'   (aparência da Navbar)
  menus    -> onde aparece: 'bottom' (barra inferior, máx. 5) e/ou 'sidebar'
  home     -> (opcional) cria um card na Home: { tone, img, text }
*/
export const appPath = (path = '') => (path ? `/app/${path}` : '/app')

export const appPages = [
  {
    path: '', label: 'Home', variant: 'home',
    icon: IconPlaceholder, // TODO: ícone "casa" (hoje Home e Painel não podem repetir o ícone Item)
    menus: ['bottom', 'sidebar'],
    Component: lazy(() => import('../pages/Home/Overview.jsx')),
  },
  {
    path: 'tarefas', label: 'Tarefas', icon: Ponto, menus: ['bottom', 'sidebar'],
    home: { tone: 'green', img: tarefasImg, text: 'Veja suas tarefas, metas e progresso nos seus objetivos' },
    Component: lazy(() => import('../pages/Tarefas/Tarefas.jsx')),
  },
  {
    path: 'dispositivos', label: 'Dispositivos', icon: Configuracao, menus: ['bottom', 'sidebar'],
    Component: lazy(() => import('../pages/Dispositivos/Dispositivos.jsx')),
  },
  {
    path: 'painel', label: 'Painel', icon: Item, menus: ['bottom', 'sidebar'],
    home: { tone: 'blue', img: painelImg, text: 'Veja informações sobre seu uso de água, áreas de irrigação e o clima!' },
    Component: lazy(() => import('../pages/Painel/Painel.jsx')),
  },
  {
    path: 'perfil', label: 'Perfil', variant: 'profile', icon: Usuario, menus: ['bottom', 'sidebar'],
    Component: lazy(() => import('../pages/Perfil/Perfil.jsx')),
  },
  {
    path: 'fale-conosco', label: 'Fale Conosco', icon: Ajuda, menus: ['sidebar'],
    Component: lazy(() => import('../pages/Home/FaleConosco.jsx')),
  },
]

export const pagesFor = (menu) => appPages.filter((p) => p.menus?.includes(menu))

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
