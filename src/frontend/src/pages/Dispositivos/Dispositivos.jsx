// pages/Dispositivos/Dispositivos.jsx
// Cada sessão é uma área do Painel (mesma fonte: features/areas). Criar uma sessão aqui
// cria a área lá, e uma área criada no Painel aparece aqui.
import { useState } from 'react'
import Accordion from '../../components/ui/Accordion.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import Button from '../../components/ui/Button.jsx'
import DeviceItem from '../../components/devices/DeviceItem.jsx'
import SessaoModal from '../../components/devices/SessaoModal.jsx'
import useAsync from '../../hooks/useAsync'
import { adicionarDispositivos, criarSessao, listarSessoes } from '../../features/device/devicesService.js'

export default function Dispositivos() {
  const { status, data: sessoes, recarregar, setData } = useAsync(listarSessoes)
  const [criando, setCriando] = useState(false)
  const [alvo, setAlvo] = useState(null)             // sessão que vai receber sensores
  const [recemCriada, setRecemCriada] = useState(null)

  // insere a sessão devolvida pelo service ou substitui a que já existe
  const guardar = (sessao) =>
    setData((lista) =>
      lista.some((s) => s.id === sessao.id)
        ? lista.map((s) => (s.id === sessao.id ? sessao : s))
        : [...lista, sessao],
    )

  if (status === 'loading') return <p className="text-body" role="status">Carregando dispositivos...</p>

  if (status === 'error') {
    return (
      <EmptyState
        title="Não foi possível carregar"
        text="Verifique sua conexão e tente novamente."
        action={<Button variant="highlight" onClick={recarregar}>Tentar de novo</Button>}
      />
    )
  }

  const modais = (
    <>
      {/* Nova sessão: todos os passos */}
      <SessaoModal
        open={criando}
        onClose={() => setCriando(false)}
        titulo="Nova sessão"
        salvar={criarSessao}
        onSalvo={(sessao) => { guardar(sessao); setRecemCriada(sessao.id) }}
      />

      {/* Adicionar sensores a uma sessão existente: o mesmo modal, só com o passo de sensores */}
      <SessaoModal
        open={alvo !== null}
        onClose={() => setAlvo(null)}
        titulo={alvo ? `Adicionar sensores · ${alvo.nome}` : 'Adicionar sensores'}
        passos={['sensores']}
        rotuloSalvar="Adicionar"
        salvar={(dados) => adicionarDispositivos(alvo.id, dados.sensores)}
        onSalvo={guardar}
      />
    </>
  )

  if (sessoes.length === 0) {
    return (
      <>
        <EmptyState
          title="Nenhuma sessão criada"
          text="Crie uma sessão e escolha os sensores que ela vai usar."
          action={<Button onClick={() => setCriando(true)}>Nova sessão</Button>}
        />
        {modais}
      </>
    )
  }

  return (
    <>
      <h1 className="sr-only">Dispositivos</h1>

      <div className="dispositivos__acoes">
        <Button variant="highlight" onClick={() => setCriando(true)}>Nova sessão</Button>
      </div>

      <div className="accordion-list">
        {sessoes.map((s, i) => {
          const online = s.dispositivos.filter((d) => d.online).length

          return (
            <Accordion
              key={s.id}
              title={s.nome}
              meta={s.dispositivos.length > 0 ? `${online} de ${s.dispositivos.length} online` : 'Sem dispositivos'}
              defaultOpen={i === 0 || s.id === recemCriada}
            >
              {s.dispositivos.length > 0 ? (
                <ul className="device-list">
                  {s.dispositivos.map((d) => <DeviceItem key={d.id} {...d} />)}
                </ul>
              ) : (
                <p className="sessao__vazio text-body">Nenhum dispositivo nesta sessão.</p>
              )}

              <div className="sessao__acoes">
                <Button variant="highlight" onClick={() => setAlvo(s)}>Adicionar sensores</Button>
              </div>
            </Accordion>
          )
        })}
      </div>

      {modais}
    </>
  )
}
