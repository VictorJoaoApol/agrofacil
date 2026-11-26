// pages/Tarefas/Tarefas.jsx
import { useEffect, useMemo, useState } from 'react';
import TextField from '../../components/ui/TextField.jsx';
import Button from '../../components/ui/Button.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import { listarTarefas, criarTarefa, toggleTarefa } from '../../../../api/src/tarefas.js';



/* Opções para filtragem das tarefas por status */
const FILTROS = [
  { id: 'pendentes',  label: 'Pendentes' },
  { id: 'concluidas', label: 'Concluídas' },
]



/* Página de gerenciamento de tarefas agrícolas (criação, edição e filtragem) */
export default function Tarefas() {

  const [nome_tarefa, setNomeTarefa] = useState('');
  const [tarefas, setTarefas] = useState([]);
  const [filtro, setFiltro] = useState('pendentes');
  const [erro, setErro] = useState();
  const [status, setStatus] = useState('loading');   // loading | ready | error


  /* Busca as tarefas registradas no servidor */
  const carregar = () => {
    setStatus('loading')
    listarTarefas()
      .then((res) => {
        if (!res.ok) throw new Error(res.mensagem)
        setTarefas(res.tarefas)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }


  useEffect(carregar, [])


  /* Métricas gerais de progresso das tarefas */
  const total = tarefas.length
  const feitas = tarefas.filter((t) => (t.esta_feito === 'S')).length
  const pct = total ? Math.round((feitas / total) * 100) : 0


  /* Filtra as tarefas exibidas de acordo com o aba/filtro selecionado */
  const visiveis = useMemo(
    () => tarefas.filter((t) => (t.esta_feito === 'S') === (filtro === 'concluidas')),
    [tarefas, filtro],
  )


  /* Edita o estado da tarefa com atualização otimista na interface */
  const toggle = async (id) => {
    const marcar = (lista) => lista.map((t) => (t.id === id ? { ...t, esta_feito: (t.esta_feito === 'S' ? 'N' : 'S') } : t))
    setTarefas(marcar)                       // atualização otimista
    const res = await toggleTarefa(id)
    if (!res.ok) setTarefas(marcar)          // reverte em caso de erro
  }


  /* Função que lida com o envio do formulário de criação de tarefa */
  const adicionar = async (e) => {
    e.preventDefault()
    const res = await criarTarefa(nome_tarefa)
    if (!res.ok) return setErro(res.mensagem)
    setErro('')
    setNomeTarefa('')
    setFiltro('pendentes')
    carregar()
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


      {/* Indicador de progresso geral */}
      <section className="painel-card painel-card--green" aria-labelledby="progresso-titulo">
        <h2 id="progresso-titulo" className="text-title-s">Seu progresso</h2>
        <p className="text-body">{feitas} de {total} tarefas concluídas</p>
        <div className="meter" role="progressbar" aria-valuemin={0} aria-valuemax={100}
          aria-valuenow={pct} aria-label="Progresso das tarefas">
          <span className="meter__fill" style={{ width: `${pct}%` }} />
        </div>
      </section>


      {/* Formulário de criação de tarefas */}
      <form className="tarefa-form" onSubmit={adicionar}>
        <TextField
          label="Nova Tarefa"
          type="text" 
          placeholder="O que fazer..."
          value={nome_tarefa}
          onChange={(event) => setNomeTarefa(event.target.value)}
          aria-invalid={!!erro}
          aria-describedby={erro ? 'erro-tarefa' : undefined}
          maxLength={80}
          required
        />
        <Button type="submit">Adicionar</Button>
      </form>
      {erro && <p id="erro-tarefa" role="alert" className="text-caption field__erro">{erro}</p>}


      {/* Botões segmentados de filtro (pendentes x concluídas) */}
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
                <input type="checkbox" checked={t.esta_feito === 'S'} onChange={() => toggle(t.id)} />
                <span className="tarefa__texto">
                  <span className="text-body tarefa__nome">{t.nome_tarefa}</span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}