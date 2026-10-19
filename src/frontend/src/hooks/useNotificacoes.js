// hooks/useNotificacoes.js
// Preferência "Notificações" do Perfil. Fica no localStorage até existir endpoint de preferências.
import { useState } from 'react'

const KEY = 'agrofacil:notificacoes'

export default function useNotificacoes() {
  const [ativas, setAtivas] = useState(() => {
    try { return localStorage.getItem(KEY) !== 'off' } catch { return true }
  })

  const alternar = () => {
    const proximo = !ativas
    setAtivas(proximo)
    try { localStorage.setItem(KEY, proximo ? 'on' : 'off') } catch { /* vale só nesta sessão */ }
  }

  return { ativas, alternar }
}
