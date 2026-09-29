// features/theme/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'

const KEY = 'agrofacil:tema'
const ThemeContext = createContext(null)

function temaInicial() {
  try {
    const salvo = localStorage.getItem(KEY)
    if (salvo === 'light' || salvo === 'dark') return salvo
  } catch {}
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(temaInicial)

  useEffect(() => {
    document.documentElement.dataset.theme = tema
    try { localStorage.setItem(KEY, tema) } catch {}
  }, [tema])

  const alternar = () => setTema((t) => (t === 'dark' ? 'light' : 'dark'))

  return <ThemeContext.Provider value={{ tema, alternar }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)