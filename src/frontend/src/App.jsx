// src/App.jsx
import AppRoutes from './routes' // Gerenciador de navegação e telas da aplicação
import './styles/tokens.css'    // Variáveis globais de design (cores, fontes, espaçamentos)
import './styles/components.css'// Estilos globais e reutilizáveis de componentes

/**
 * Componente Raiz da Aplicação
 * Responsável apenas por carregar os estilos globais e delegar
 * a exibição das telas para o sistema de roteamento.
 */
export default function App() {
  return <AppRoutes />
}