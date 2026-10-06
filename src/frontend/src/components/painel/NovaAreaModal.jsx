// components/painel/NovaAreaModal.jsx
import { useState } from 'react'
import Modal from '../ui/Modal.jsx'
import Button from '../ui/Button.jsx'
import { criarArea } from '../../features/painel/painelService'

/* Opções fixas de culturas agrícolas para seleção no formulário */
const CULTURAS = ['Hortaliças', 'Soja', 'Café', 'Milho', 'Outra']

/* Estado inicial neutro/zerado para reset do formulário */
const VAZIO = { nome: '', cultura: CULTURAS[0], hectares: '' }

/* Componente modal modal assistente em 3 passos para criação de novas áreas produtivas */
export default function NovaAreaModal({ open, onClose, onCriada }) {
  /* Estados do formulário: etapa do fluxo (1 a 3), valores dos campos, erros e controle de envio */
  const [passo, setPasso] = useState(1)          // 1 nome | 2 cultura e tamanho | 3 confirmar
  const [dados, setDados] = useState(VAZIO)
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  /* Helper para atualização dinâmica do estado de um campo específico */
  const set = (campo) => (e) => setDados((d) => ({ ...d, [campo]: e.target.value }))

  /* Reseta os estados internos e fecha o modal */
  const fechar = () => { setPasso(1); setDados(VAZIO); setErro(''); onClose() }

  /* Valida a etapa atual e avança para a próxima */
  const avancar = () => {
    if (passo === 1 && !dados.nome.trim()) return setErro('Informe o nome da área.')
    if (passo === 2 && (dados.hectares === '' || Number(dados.hectares) <= 0)) {
      return setErro('Informe um tamanho válido em hectares.')
    }
    setErro('')
    setPasso((p) => p + 1)
  }

  /* Submete a nova área para o backend e gerencia o fluxo de sucesso/erro */
  const confirmar = async () => {
    setEnviando(true)
    const res = await criarArea(dados)
    setEnviando(false)
    if (!res.ok) { setErro(res.message); setPasso(1); return }
    onCriada(res.data)
    fechar()
  }

  return (
    <Modal open={open} onClose={fechar} title="Monte seu projeto">
      {/* Indicador de progresso das etapas */}
      <p className="text-caption">Passo {passo} de 3</p>

      {/* Etapa 1: Definição do nome da área */}
      {passo === 1 && (
        <label className="field">
          <span className="text-body">Nome da área</span>
          <input className="field__input text-body" value={dados.nome} onChange={set('nome')} maxLength={40} autoFocus
            aria-invalid={!!erro} aria-describedby={erro ? 'erro-area' : undefined} />
        </label>
      )}

      {/* Etapa 2: Seleção da cultura e metragem em hectares */}
      {passo === 2 && (
        <>
          <label className="field">
            <span className="text-body">Cultura</span>
            <select className="field__input text-body" value={dados.cultura} onChange={set('cultura')}>
              {CULTURAS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="field">
            <span className="text-body">Tamanho (hectares)</span>
            <input className="field__input text-body" type="number" inputMode="decimal" min="0" step="0.1"
              value={dados.hectares} onChange={set('hectares')} />
          </label>
        </>
      )}

      {/* Etapa 3: Resumo dos dados informados antes de salvar */}
      {passo === 3 && (
        <dl className="resumo">
          <dt>Área</dt><dd>{dados.nome}</dd>
          <dt>Cultura</dt><dd>{dados.cultura}</dd>
          <dt>Tamanho</dt><dd>{dados.hectares || 0} ha</dd>
        </dl>
      )}

      {/* Exibição condicional da mensagem de erro */}
      {erro && <p id="erro-area" role="alert" className="text-caption field__error">{erro}</p>}

      {/* Ações de navegação do modal (Voltar/Cancelar e Continuar/Criar) */}
      <div className="modal__actions">
        <Button variant="link" onClick={passo === 1 ? fechar : () => setPasso((p) => p - 1)}>
          {passo === 1 ? 'Cancelar' : 'Voltar'}
        </Button>
        {passo < 3
          ? <Button onClick={avancar}>Continuar</Button>
          : <Button onClick={confirmar} disabled={enviando}>{enviando ? 'Salvando...' : 'Criar área'}</Button>}
      </div>
    </Modal>
  )
}