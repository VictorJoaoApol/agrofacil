// hooks/useAsync.js
import { useCallback, useEffect, useState } from 'react'

/**
 * Carrega dados de uma função de serviço que devolve { ok, message, data }.
 * `request` precisa ser estável (função importada do service, não uma arrow
 * criada dentro do componente).
 *
 * Devolve: status ('loading' | 'ready' | 'error'), data, message,
 * recarregar() e setData(valor | (anterior) => novo).
 */

/* Hook utilitário para gerenciamento de requisições assíncronas com controle de estado, recarregamento e atualização local */
export default function useAsync(request) {
  /* Estado consolidado contendo status da requisição, dados retornados e mensagem de erro */
  const [estado, setEstado] = useState({ status: 'loading', data: null, message: '' })
  
  /* Contador de tentativas para disparar reexecuções do efeito de carregamento */
  const [tentativa, setTentativa] = useState(0)

  /* Efeito assíncrono para execução da requisição com flag de limpeza para evitar atualização em componentes desmontados */
  useEffect(() => {
    let ativo = true

    request()
      .then((res) => {
        if (!ativo) return
        setEstado(
          res.ok
            ? { status: 'ready', data: res.data, message: '' }
            : { status: 'error', data: null, message: res.message },
        )
      })
      .catch(() => {
        if (ativo) setEstado({ status: 'error', data: null, message: 'Não foi possível carregar.' })
      })

    return () => {
      ativo = false
    }
  }, [request, tentativa])

  /* Função memorizada para redefinir o estado para carregando e forçar uma nova chamada */
  const recarregar = useCallback(() => {
    setEstado((e) => ({ ...e, status: 'loading' }))
    setTentativa((t) => t + 1)
  }, [])

  /* Função memorizada para atualização manual/otimista do estado de dados local */
  const setData = useCallback((atualizar) => {
    setEstado((e) => ({
      ...e,
      data: typeof atualizar === 'function' ? atualizar(e.data) : atualizar,
    }))
  }, [])

  return { status: estado.status, data: estado.data, message: estado.message, recarregar, setData }
}