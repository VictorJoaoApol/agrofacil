// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

// ordem importa: tokens -> layout -> componentes -> auth
import './styles/tokens.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/auth.css'

import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { ThemeProvider } from './features/theme/ThemeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

/* Ponto de entrada principal da aplicação React no DOM */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Habilita o roteamento baseado no histórico do navegador */}
    <BrowserRouter>
      {/* Provê o tema da aplicação (claro/escuro) para toda a árvore de componentes */}
      <ThemeProvider>
        {/* Captura e trata erros não mapeados na renderização da interface */}
        <ErrorBoundary>
          {/* Gerencia e provê o estado de autenticação e sessão do usuário */}
          <AuthProvider>
            <App />
          </AuthProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)