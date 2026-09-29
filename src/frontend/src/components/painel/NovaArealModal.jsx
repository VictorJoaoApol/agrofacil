// components/painel/NovaAreaModal.jsx
import { useState } from 'react'
import Modal from '../ui/Modal.jsx'
import Button from '../ui/Button.jsx'
import { criarArea } from '../../features/painel/painelService'

const CULTURAS = ['Hortaliças', 'Soja', 'Café', 'Milho', 'Outra']
const VAZIO = { nome: '', cultura: CULTURAS[0], hectares: '' }

export default function NovaAreaModal({ open, onClose, onCriada }) {
  const [passo, setPasso] = useState(1)          // 1 nome | 2 cultura e tamanho | 3 confirmar
  const [dados, setDados] = useState(VAZIO)
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  const set = (campo) => (e) => setDados((d) => ({ ...d, [campo]: e.target.value }))

  const fechar = () => { setPasso(1); setDados(VAZIO); setErro(''); onClose() }

  const avancar = () => {
    if (passo === 1 && !dados.nome.trim()) return setErro('Informe o nome da área.')
    setErro('')
    setPasso((p) => p + 1)
  }

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
      <p className="text-caption">Passo {passo} de 3</p>

      {passo === 1 && (
        <label className="field">
          <span className="text-body">Nome da área</span>
          <input value={dados.nome} onChange={set('nome')} maxLength={40} autoFocus
            aria-invalid={!!erro} aria-describedby={erro ? 'erro-area' : undefined} />
        </label>
      )}

      {passo === 2 && (
        <>
          <label className="field">
            <span className="text-body">Cultura</span>
            <select value={dados.cultura} onChange={set('cultura')}>
              {CULTURAS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="field">
            <span className="text-body">Tamanho (hectares)</span>
            <input type="number" inputMode="decimal" min="0" step="0.1"
              value={dados.hectares} onChange={set('hectares')} />
          </label>
        </>
      )}

      {passo === 3 && (
        <dl className="resumo">
          <dt>Área</dt><dd>{dados.nome}</dd>
          <dt>Cultura</dt><dd>{dados.cultura}</dd>
          <dt>Tamanho</dt><dd>{dados.hectares || 0} ha</dd>
        </dl>
      )}

      {erro && <p id="erro-area" role="alert" className="text-caption field__erro">{erro}</p>}

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