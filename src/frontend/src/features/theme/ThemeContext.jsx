// features/theme/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'

const KEY = 'agrofacil:tema'
const ThemeContext = createContext(null)

function temaInicial() {
  try {
    const salvo = localStorage.getItem(KEY)
    if (salvo === 'light' || salvo === 'dark') return salvo
  } catch {
    // localStorage indisponível: segue a preferência do sistema
  }
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(temaInicial)

  useEffect(() => {
    document.documentElement.dataset.theme = tema
  }, [tema])

  // Só persiste quando o usuário escolhe; sem escolha, vale a preferência do sistema.
  const alternar = () => {
    const proximo = tema === 'dark' ? 'light' : 'dark'
    setTema(proximo)
    try {
      localStorage.setItem(KEY, proximo)
    } catch {
      // sem persistência, o tema vale só nesta sessão
    }
  }

  return <ThemeContext.Provider value={{ tema, alternar }}>{children}</ThemeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext)
