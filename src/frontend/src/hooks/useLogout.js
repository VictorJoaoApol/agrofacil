import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import useAuth from './useAuth'

// Fluxo único de "Sair", usado pela Sidebar e pela página de Perfil.
export default function useLogout() {
  const { deslogar } = useAuth()
  const navigate = useNavigate()
  const [saindo, setSaindo] = useState(false)
  const [erro, setErro] = useState('')

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
