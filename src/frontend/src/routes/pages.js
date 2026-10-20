// routes/pages.js
import { lazy } from 'react'
import imgTarefas from '../assets/img/Tarefas.png'
import imgPainel from '../assets/img/Painel.png'
import { Ajuda, Dispositivos, DispositivosAtivado, Home, HomeAtivado, Tarefas, TarefasAtivado, Configuracao, Painel, PainelAtivado, Perfil, PerfilAtivado, } from '../assets/Icons'

/*
  ÚNICA lista de páginas internas: rotas, barra inferior, Sidebar, títulos da
  Navbar e cards da Home saem daqui. Para criar uma página nova: crie o arquivo
  e adicione UMA entrada abaixo (sem repetir path).

  path     -> vira /app/<path> ('' = /app)
  label    -> nome no menu e título da Navbar
  icon     -> componente de ícone
  variant  -> 'home' | 'inner' (padrão) | 'profile'    (aparência da Navbar)
  menus    -> onde aparece: 'bottom' (barra inferior, máx. 5) e/ou 'sidebar'
  grupo    -> (sidebar) rótulo da seção em que o item aparece; itens seguidos com o mesmo grupo ficam juntos
  home     -> (opcional) cria um card na Home: { tone, img, text }
*/

/* Helper para formatação do caminho absoluto da rota interna */
export const appPath = (path = '') => (path ? `/app/${path}` : '/app')

/* Lista mestra de configuração de rotas e menus da área privada */
export const appPages = [
  {
    path: '',
    label: 'Home',
    grupo: 'Navegação',
    variant: 'home',
    icon: Home,
    iconActive: HomeAtivado,
    menus: ['bottom', 'sidebar'],
    Component: lazy(() => import('../pages/Home/Overview.jsx')),
  },

  {
    path: 'tarefas',
    label: 'Tarefas',
    home: { tone: 'green', img: imgTarefas, text: 'Veja suas tarefas, metas e progresso nos seus objetivos!' },
    grupo: 'Navegação',
    icon: Tarefas,
    iconActive: TarefasAtivado,
    menus: ['bottom', 'sidebar'],
    Component: lazy(() => import('../pages/Tarefas/Tarefas.jsx')),
  },

  {
    path: 'dispositivos',
    label: 'Dispositivos',
    grupo: 'Navegação',
    icon: Dispositivos,
    iconActive: DispositivosAtivado,
    menus: ['bottom', 'sidebar'],
    Component: lazy(() => import('../pages/Dispositivos/Dispositivos.jsx')),
  },

  {
    path: 'painel',
    label: 'Painel',
    home: { tone: 'green', img: imgPainel, text: 'Veja informações sobre seu uso de água, clima e áreas de irrigação!' },
    grupo: 'Navegação',
    icon: Painel,
    iconActive: PainelAtivado,
    menus: ['bottom', 'sidebar'],
    Component: lazy(() => import('../pages/Painel/Painel.jsx')),
  },

  /* Subpáginas (sem menu): abertas por botões do Painel e do Perfil */
  {
    path: 'painel/areas',
    label: 'Áreas de Irrigação',
    Component: lazy(() => import('../pages/Painel/AreasIrrigacao.jsx')),
  },

  {
    path: 'painel/clima',
    label: 'Clima',
    Component: lazy(() => import('../pages/Painel/Clima.jsx')),
  },

  {
    path: 'painel/tempo',
    label: 'Tempo de Irrigação',
    Component: lazy(() => import('../pages/Painel/TempoIrrigacao.jsx')),
  },

  /* Fim das subpáginas */

  {
    path: 'perfil',
    label: 'Perfil',
    grupo: 'Conta',
    variant: 'profile',
    icon: Perfil,
    iconActive: PerfilAtivado,
    menus: ['bottom', 'sidebar'],
    Component: lazy(() => import('../pages/Perfil/Perfil.jsx')),
  },

  {
    path: 'perfil/informacoes',
    label: 'Informações do Usuário',
    Component: lazy(() => import('../pages/Perfil/InformacoesUsuario.jsx')),
  },

  {
    path: 'perfil/quem-somos',
    label: 'Quem nós somos',
    Component: lazy(() => import('../pages/Perfil/QuemSomos.jsx')),
  },

  {
    path: 'fale-conosco',
    label: 'Fale Conosco',
    grupo: 'Suporte',
    icon: Ajuda,
    menus: ['sidebar'],
    Component: lazy(() => import('../pages/Home/FaleConosco.jsx')),
  },
]

/* Filtra as páginas destinadas a um menu específico (ex: 'bottom' ou 'sidebar') */
export const pagesFor = (menu) => appPages.filter((p) => p.menus?.includes(menu))

// Página atual pela URL; o prefixo mais longo vence (/app/painel/areas/1 -> Painel)
/* Retorna o objeto de página correspondente com base no caminho atual da URL */
export function getPage(pathname) {
  const clean = pathname.replace(/\/+$/, '')
  return (
    [...appPages]
      .filter((p) => p.path)
      .sort((a, b) => b.path.length - a.path.length)
      .find((p) => clean === appPath(p.path) || clean.startsWith(appPath(p.path) + '/')) ?? appPages[0]
  )
}