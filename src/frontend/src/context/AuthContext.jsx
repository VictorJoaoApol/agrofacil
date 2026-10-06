import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { verificarSessao, logout } from '../services/auth'

// Contexto que guarda o usuário autenticado (ou null, se não houver sessão ativa).
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)

  // Evita que ProtectedRoute redirecione para /login antes de saber a resposta do backend.
  const [carregando, setCarregando] = useState(true)

  // Pergunta ao backend se existe uma sessão ativa. Usada na carga inicial
  // do app (F5) e logo após um login bem-sucedido.
  const checarSessao = useCallback(async () => {
    try {
      const resultado = await verificarSessao()
      setUsuario(resultado.ok && resultado.usuario ? resultado.usuario : null)
    } catch (err) {
      console.error('Erro ao verificar sessão:', err)
      setUsuario(null)
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    checarSessao()
  }, [checarSessao])

  // services/http.js dispara este evento quando qualquer requisição recebe 401:
  // a sessão caiu com o app aberto, então o usuário local é descartado.
  useEffect(() => {
    const aoExpirar = () => setUsuario(null)
    window.addEventListener('auth:expirada', aoExpirar)
    return () => window.removeEventListener('auth:expirada', aoExpirar)
  }, [])

  // Encerra a sessão no backend e, só se der certo, limpa o usuário local.
  const deslogar = useCallback(async () => {
    const resultado = await logout()
    if (!resultado.ok) {
      throw new Error(resultado.message || 'Erro ao sair da conta')
    }
    setUsuario(null)
  }, [])

  const value = useMemo(
    () => ({ usuario, estaAutenticado: !!usuario, carregando, setUsuario, checarSessao, deslogar }),
    [usuario, carregando, checarSessao, deslogar],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Prefira o hook `useAuth` (src/hooks/useAuth.jsx) nos componentes.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuthContext precisa ser usado dentro de um <AuthProvider>.')
  }
  return context
}
