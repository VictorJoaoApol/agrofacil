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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ErrorBoundary>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
