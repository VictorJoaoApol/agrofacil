// components/devices/DispositivoModal.jsx
// Edita o nome de um dispositivo e a sessão onde ele é usado.
// salvar({ nome, areaId }) devolve { ok, message, data } (injetada pela tela).
// Monte-o só enquanto houver um dispositivo em edição, para o formulário começar do zero.
import { useState } from 'react'
import BottomSheet from '../ui/BottomSheet.jsx'
import Button from '../ui/Button.jsx'
import TextField from '../ui/TextField.jsx'

export default function DispositivoModal({ open, onClose, dispositivo, sessoes, salvar }) {  const [nome, setNome] = useState(dispositivo.nome)
  const [areaId, setAreaId] = useState(dispositivo.areaId == null ? '' : String(dispositivo.areaId))
  const [erro, setErro] = useState('')
  const [salvando, setSalvando] = useState(false)

  async function confirmar() {
    if (!nome.trim()) return setErro('Informe um nome.')

    setSalvando(true)
    const res = await salvar({
      nome,
      // o select devolve texto; volta para o id original da sessão
      areaId: sessoes.find((s) => String(s.id) === areaId)?.id ?? null,
    })
    setSalvando(false)

    if (!res.ok) return setErro(res.message)
    onClose()
  }

  return (
    <BottomSheet open={open} onClose={onClose} title="Editar dispositivo">
      <TextField
        label="Nome"
        value={nome}
        onChange={(e) => { setNome(e.target.value); setErro('') }}
        maxLength={60}
        autoFocus
        aria-invalid={Boolean(erro)}
      />

      <label className="field">
        <span className="text-body">Sessão</span>
        <select className="field__input text-body" value={areaId} onChange={(e) => setAreaId(e.target.value)}>
          <option value="">Sem sessão</option>
          {sessoes.map((s) => <option key={s.id} value={String(s.id)}>{s.nome}</option>)}
        </select>
      </label>

      {erro && <p role="alert" className="text-caption field__error">{erro}</p>}

      <div className="modal__actions">
        <Button variant="link" onClick={onClose}>Cancelar</Button>
        <Button onClick={confirmar} disabled={salvando}>{salvando ? 'Salvando...' : 'Salvar'}</Button>
      </div>
    </BottomSheet>
  )
}