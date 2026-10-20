// pages/Dispositivos/Dispositivos.jsx
// Cada sessão é uma área do Painel (mesma fonte: features/areas). Criar uma sessão aqui
// cria a área lá, e uma área criada no Painel aparece aqui.
//
// Duas seções:
//   Dispositivos      buscar, registrar e ver onde cada dispositivo está em uso
//   Gerenciar Áreas   sessões com seus dispositivos, criar sessões e editar dispositivos
import { useState } from 'react'
import Accordion from '../../components/ui/Accordion.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import Button from '../../components/ui/Button.jsx'
import DeviceItem from '../../components/devices/DeviceItem.jsx'
import SessaoModal from '../../components/devices/SessaoModal.jsx'
import DispositivoModal from '../../components/devices/DispositivoModal.jsx'
import useAsync from '../../hooks/useAsync'
import {
  adicionarDispositivos, criarSessao, listarSessoes,
  listarDispositivosLivres, buscarDispositivosNovos, registrarDispositivo, editarDispositivo,
} from '../../features/device/devicesService.js'

/* Opções para alternar entre as seções da página */
const SECOES = [
  { id: 'dispositivos', label: 'Dispositivos' },
  { id: 'areas',        label: 'Gerenciar Áreas' },
]

export default function Dispositivos() {
  const { status: statusSessoes, data: sessoes, recarregar: recarregarSessoes, setData: setSessoes } = useAsync(listarSessoes)
  const { status: statusLivres, data: livres, recarregar: recarregarLivres, setData: setLivres } = useAsync(listarDispositivosLivres)

  const [secao, setSecao] = useState('dispositivos')
  const [criando, setCriando] = useState(false)
  const [alvo, setAlvo] = useState(null)             // sessão que vai receber sensores
  const [recemCriada, setRecemCriada] = useState(null)
  const [editando, setEditando] = useState(null)     // dispositivo em edição

  /* Busca de dispositivos novos: null = ainda não buscou */
  const [encontrados, setEncontrados] = useState(null)
  const [buscando, setBuscando] = useState(false)
  const [erroBusca, setErroBusca] = useState('')

  const status =
    statusSessoes === 'error' || statusLivres === 'error' ? 'error'
    : statusSessoes === 'loading' || statusLivres === 'loading' ? 'loading'
    : 'ready'

  const recarregar = () => { recarregarSessoes(); recarregarLivres() }

  // insere a sessão devolvida pelo service ou substitui a que já existe
  const guardar = (sessao) =>
    setSessoes((lista) =>
      lista.some((s) => s.id === sessao.id)
        ? lista.map((s) => (s.id === sessao.id ? sessao : s))
        : [...lista, sessao],
    )

  /* Procura dispositivos ainda não registrados */
  const buscar = async () => {
    setBuscando(true)
    setErroBusca('')
    const res = await buscarDispositivosNovos()
    setBuscando(false)
    if (!res.ok) return setErroBusca(res.message)
    setEncontrados(res.data)
  }

  /* Registra um dispositivo encontrado: ele passa a existir, ainda sem sessão */
  const registrar = async (achado) => {
    const res = await registrarDispositivo(achado)
    if (!res.ok) return setErroBusca(res.message)
    setErroBusca('')
    setLivres((l) => [...l, res.data])
    setEncontrados((l) => l.filter((d) => d.codigo !== achado.codigo))
  }

  /* Propaga um dispositivo editado para as sessões e para a lista de livres */
  const aplicarEdicao = (atual) => {
    setLivres((l) => {
      const sem = l.filter((d) => d.id !== atual.id)
      return atual.areaId == null ? [...sem, atual] : sem
    })
    setSessoes((l) =>
      l.map((s) => {
        const sem = s.dispositivos.filter((d) => d.id !== atual.id)
        if (s.id !== atual.areaId) return { ...s, dispositivos: sem }
        const jaEstava = s.dispositivos.some((d) => d.id === atual.id)
        return {
          ...s,
          dispositivos: jaEstava ? s.dispositivos.map((d) => (d.id === atual.id ? atual : d)) : [...sem, atual],
        }
      }),
    )
  }

  const salvarEdicao = async (dados) => {
    const res = await editarDispositivo(editando.id, dados)
    if (res.ok) aplicarEdicao(res.data)
    return res
  }

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

  /* Todos os dispositivos registrados (em sessões + livres) e o nome da sessão de cada um */
  const todos = [...sessoes.flatMap((s) => s.dispositivos), ...livres].sort((a, b) => a.id - b.id)
  const nomeDaSessao = Object.fromEntries(sessoes.map((s) => [s.id, s.nome]))

  const botaoEditar = (d) => (
    <Button variant="highlight" onClick={() => setEditando(d)}>Editar</Button>
  )

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

      {/* Editar dispositivo (montado só enquanto há um em edição, para o formulário começar do zero) */}
      {editando && (
        <DispositivoModal
          open
          onClose={() => setEditando(null)}
          dispositivo={editando}
          sessoes={sessoes}
          salvar={salvarEdicao}
        />
      )}
    </>
  )

  /* Botões segmentados (Dispositivos x Gerenciar Áreas) */
  const abas = (
    <div className="segmented" role="group" aria-label="Seções de dispositivos">
      {SECOES.map((s) => (
        <button key={s.id} type="button" className="segmented__btn"
          aria-pressed={secao === s.id} onClick={() => setSecao(s.id)}>
          {s.label}
        </button>
      ))}
    </div>
  )

  /* Seção "Dispositivos": buscar, registrar e ver onde cada um está em uso */
  const secaoDispositivos = (
    <>
      <div className="dispositivos__acoes">
        <Button variant="highlight" onClick={buscar} disabled={buscando}>
          {buscando ? 'Buscando...' : 'Buscar dispositivos'}
        </Button>
      </div>

      {erroBusca && <p role="alert" className="text-caption field__error">{erroBusca}</p>}

      {encontrados !== null && (
        <section className="achados" aria-labelledby="achados-titulo">
          <h2 id="achados-titulo" className="text-title-s">Encontrados</h2>
          {encontrados.length === 0 ? (
            <p className="text-body">Nenhum dispositivo novo encontrado.</p>
          ) : (
            <ul className="achados__lista">
              {encontrados.map((d) => (
                <li key={d.codigo} className="achado">
                  <span className="achado__info">
                    <span className="text-body">{d.nome}</span>
                    <span className="text-caption">{d.codigo}</span>
                  </span>
                  <Button onClick={() => registrar(d)}>Registrar</Button>
                </li>
              ))}
            </ul>
          )}
          <Button variant="link" onClick={() => setEncontrados(null)}>Fechar</Button>
        </section>
      )}

      <h2 className="text-title-s">Registrados</h2>
      {todos.length === 0 ? (
        <EmptyState
          title="Nenhum dispositivo registrado"
          text="Busque dispositivos próximos para registrá-los."
        />
      ) : (
        <ul className="device-list">
          {todos.map((d) => {
            const local = nomeDaSessao[d.areaId]
            return (
              <DeviceItem
                key={d.id}
                {...d}
                extra={
                  <>
                  <div>
                    <span className={`badge ${local ? 'badge--uso' : 'badge--livre'} text-caption`}>
                      {local ? `Em uso: ${local}` : 'Disponível'}
                    </span>
                    </div>
                    {botaoEditar(d)}
                  </>
                }
              />
            )
          })}
        </ul>
      )}
    </>
  )

  /* Seção "Gerenciar Áreas": sessões com seus dispositivos, criação de sessões e edição */
  const secaoAreas =
    sessoes.length === 0 ? (
      <EmptyState
        title="Nenhuma sessão criada"
        text="Crie uma sessão e escolha os sensores que ela vai usar."
        action={<Button onClick={() => setCriando(true)}>Nova sessão</Button>}
      />
    ) : (
      <>
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
                    {s.dispositivos.map((d) => (
                      <DeviceItem key={d.id} {...d} extra={botaoEditar(d)} />
                    ))}
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
      </>
    )

  return (
    <>
      <h1 className="sr-only">Dispositivos</h1>

      {abas}

      {secao === 'dispositivos' ? secaoDispositivos : secaoAreas}

      {modais}
    </>
  )
}