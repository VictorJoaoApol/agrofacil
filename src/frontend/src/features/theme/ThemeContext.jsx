// features/theme/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'

/* Chave utilizada para persistência da preferência do tema no localStorage */
const KEY = 'agrofacil:tema'

/* Contexto para fornecimento global do estado de tema da aplicação */
const ThemeContext = createContext(null)

/* Determina o tema inicial baseado no localStorage ou na preferência do sistema operacional */
function temaInicial() {
  try {
    const salvo = localStorage.getItem(KEY)
    if (salvo === 'light' || salvo === 'dark') return salvo
  } catch {
    // localStorage indisponível: segue a preferência do sistema
  }
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/* Provedor responsável por gerenciar e aplicar o tema (claro/escuro) na aplicação */
export function ThemeProvider({ children }) {
  /* Estado com o tema atual configurado */
  const [tema, setTema] = useState(temaInicial)

  /* Efeito para atualizar o atributo dataset no elemento raiz HTML sempre que o tema mudar */
  useEffect(() => {
    document.documentElement.dataset.theme = tema
  }, [tema])

  // Só persiste quando o usuário escolhe; sem escolha, vale a preferência do sistema.
  /* Alterna entre os temas claro e escuro e salva a preferência no localStorage */
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
/* Hook customizado para consumir os valores e métodos do ThemeContext */
export const useTheme = () => useContext(ThemeContext)