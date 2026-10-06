// hooks/useLogout.js
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import useAuth from './useAuth'

// Fluxo único de "Sair", usado pela Sidebar e pela página de Perfil.

/* Hook customizado reutilizável para encerramento de sessão do usuário e redirecionamento para o login */
export default function useLogout() {
  /* Resgata a função de deslogar do contexto global de autenticação */
  const { deslogar } = useAuth()
  const navigate = useNavigate()
  
  /* Estado indicativo de processamento da requisição de encerramento da sessão */
  const [saindo, setSaindo] = useState(false)
  
  /* Estado para armazenar eventuais mensagens de erro ocorridas ao tentar sair */
  const [erro, setErro] = useState('')

  /* Função memorizada para executar o logout no servidor, limpar estado local e redirecionar a rota */
  const sair = useCallback(async () => {
    setErro('')
    setSaindo(true)
    try {
      await deslogar()
      navigate('/login', { replace: true }) // replace: o botão voltar não retorna ao app
    } catch (err) {
      setErro(err.message || 'Não foi possível sair.')
      setSaindo(false)
    }
  }, [deslogar, navigate])

  return { sair, saindo, erro }
}