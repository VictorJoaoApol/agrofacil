// pages/Tarefas/Tarefas.jsx
import { useEffect, useMemo, useState } from 'react'
import Button from '../../components/ui/Button.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import { listarTarefas, alternarTarefa, criarTarefa } from '../../features/tarefas/tarefasService'

const FILTROS = [
  { id: 'pendentes',  label: 'Pendentes' },
  { id: 'concluidas', label: 'Concluídas' },
]

export default function Tarefas() {
  const [status, setStatus] = useState('loading')   // loading | ready | error
  const [tarefas, setTarefas] = useState([])
  const [filtro, setFiltro] = useState('pendentes')
  const [titulo, setTitulo] = useState('')
  const [erro, setErro] = useState('')

  const carregar = () => {
    setStatus('loading')
    listarTarefas()
      .then((res) => {
        if (!res.ok) throw new Error(res.message)
        setTarefas(res.data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }

  useEffect(carregar, [])

  const total = tarefas.length
  const feitas = tarefas.filter((t) => t.concluida).length
  const pct = total ? Math.round((feitas / total) * 100) : 0

  const visiveis = useMemo(
    () => tarefas.filter((t) => t.concluida === (filtro === 'concluidas')),
    [tarefas, filtro],
  )

  const alternar = async (id) => {
    const marcar = (lista) => lista.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t))
    setTarefas(marcar)                       // otimista
    const res = await alternarTarefa(id)
    if (!res.ok) setTarefas(marcar)          // desfaz
  }

  const adicionar = async (e) => {
    e.preventDefault()
    const res = await criarTarefa({ titulo })
    if (!res.ok) return setErro(res.message)
    setErro('')
    setTitulo('')
    setTarefas((l) => [res.data, ...l])
    setFiltro('pendentes')
  }

  if (status === 'loading') return <p className="text-body" role="status">Carregando tarefas...</p>

  if (status === 'error') {
    return (
      <EmptyState
        title="Não foi possível carregar"
        text="Verifique sua conexão e tente novamente."
        action={<Button onClick={carregar}>Tentar de novo</Button>}
      />
    )
  }

  return (
    <>
      <h1 className="text-title-l tarefas__titulo">Tarefas</h1>

      <section className="painel-card painel-card--green" aria-labelledby="progresso-titulo">
        <h2 id="progresso-titulo" className="text-title-s">Seu progresso</h2>
        <p className="text-body">{feitas} de {total} tarefas concluídas</p>
        <div className="meter" role="progressbar" aria-valuemin={0} aria-valuemax={100}
          aria-valuenow={pct} aria-label="Progresso das tarefas">
          <span className="meter__fill" style={{ width: `${pct}%` }} />
        </div>
      </section>

      <form className="tarefa-form" onSubmit={adicionar}>
        <label className="field tarefa-form__campo">
          <span className="text-body">Nova tarefa</span>
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} maxLength={80}
            aria-invalid={!!erro} aria-describedby={erro ? 'erro-tarefa' : undefined} />
        </label>
        <Button type="submit">Adicionar</Button>
      </form>
      {erro && <p id="erro-tarefa" role="alert" className="text-caption field__erro">{erro}</p>}

      <div className="segmented" role="group" aria-label="Filtrar tarefas">
        {FILTROS.map((f) => (
          <button key={f.id} type="button" className="segmented__btn"
            aria-pressed={filtro === f.id} onClick={() => setFiltro(f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      {visiveis.length === 0 ? (
        <EmptyState
          title={filtro === 'pendentes' ? 'Tudo em dia!' : 'Nenhuma tarefa concluída'}
          text={filtro === 'pendentes' ? 'Você não tem tarefas pendentes.' : 'Conclua uma tarefa para vê-la aqui.'}
        />
      ) : (
        <ul className="tarefa-list">
          {visiveis.map((t) => (
            <li key={t.id} className="tarefa">
              <label className="tarefa__label">
                <input type="checkbox" checked={t.concluida} onChange={() => alternar(t.id)} />
                <span className="tarefa__texto">
                  <span className="text-body tarefa__nome">{t.titulo}</span>
                  <span className="text-caption tarefa__area">{t.area}</span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}