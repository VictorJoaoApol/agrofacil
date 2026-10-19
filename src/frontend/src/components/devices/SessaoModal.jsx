// components/devices/SessaoModal.jsx
// Bottom sheet em passos, configurável. O MESMO componente atende situações diferentes:
//
//   Dispositivos > Nova sessão        passos padrão (modelo, nome, cultura, sensores, confirmar)
//   Dispositivos > Adicionar sensores passos={['sensores']}
//   Painel > Nova área                passos={['nome', 'cultura', 'confirmar']} termo="área"
//
// Props:
//   open, onClose        controle de abertura
//   salvar(dados)        função que grava e devolve { ok, message, data } (injetada pela tela)
//   onSalvo(data)        chamado com o data devolvido por salvar()
//   passos               quais passos mostrar, na ordem (ids de REGISTRO abaixo)
//   titulo, termo        textos ("sessão" ou "área")
//   modelos, culturas, catalogo   fontes de opções (padrão: features/areas e features/sensores)
//   inicial              valores iniciais dos campos
//   rotuloSalvar         texto do botão do último passo
//
// Para criar um passo novo: escreva o componente e registre em REGISTRO.
import { useState } from 'react'
import BottomSheet from '../ui/BottomSheet.jsx'
import Button from '../ui/Button.jsx'
import TextField from '../ui/TextField.jsx'
import SensorPicker from './SensorPicker.jsx'
import { CULTURAS, MODELOS_AREA } from '../../features/areas/modelos'
import { SENSORES, rotuloSensor } from '../../features/sensores/catalogo'

const PASSOS_PADRAO = ['modelo', 'nome', 'cultura', 'sensores', 'confirmar']

/* ---------- passos ---------- */

function PassoModelo({ dados, set, modelos }) {
  const aplicar = (m) =>
    set({
      modelo: m.id,
      ...(m.cultura ? { cultura: m.cultura } : {}),
      sensores: Object.fromEntries(m.sensores.map((tipo) => [tipo, 1])),
    })

  return (
    <fieldset className="modelo-lista">
      <legend className="text-body">Comece por um modelo</legend>
      {modelos.map((m) => (
        <label key={m.id} className="modelo-opcao">
          <span className="modelo-opcao__texto">
            <span className="text-body">{m.label}</span>
            {m.descricao && <span className="text-caption">{m.descricao}</span>}
          </span>
          <input type="radio" name="modelo" className="circulo" checked={dados.modelo === m.id} onChange={() => aplicar(m)} />
        </label>
      ))}
      <p className="text-caption">Você poderá ajustar tudo nos próximos passos.</p>
    </fieldset>
  )
}

function PassoNome({ dados, set, erro, termo }) {
  return (
    <TextField
      label={`Nome da ${termo}`}
      value={dados.nome}
      onChange={(e) => set({ nome: e.target.value })}
      maxLength={40}
      autoFocus
      aria-invalid={Boolean(erro)}
    />
  )
}

function PassoCultura({ dados, set, culturas }) {
  return (
    <>
      <label className="field">
        <span className="text-body">Cultura</span>
        <select className="field__input text-body" value={dados.cultura} onChange={(e) => set({ cultura: e.target.value })}>
          {culturas.map((c) => <option key={c}>{c}</option>)}
        </select>
      </label>
      <TextField
        label="Tamanho (hectares)"
        type="number"
        inputMode="decimal"
        min="0"
        step="0.1"
        value={dados.hectares}
        onChange={(e) => set({ hectares: e.target.value })}
      />
    </>
  )
}

function PassoSensores({ dados, set, catalogo }) {
  return <SensorPicker value={dados.sensores} onChange={(sensores) => set({ sensores })} catalogo={catalogo} />
}

function PassoConfirmar({ dados, catalogo, mostrarSensores }) {
  const escolhidos = Object.entries(dados.sensores)

  return (
    <dl className="resumo">
      <dt>Nome</dt><dd>{dados.nome}</dd>
      <dt>Cultura</dt><dd>{dados.cultura}</dd>
      <dt>Tamanho</dt><dd>{dados.hectares || 0} ha</dd>
      {mostrarSensores && (
        <>
          <dt>Sensores</dt>
          <dd>
            {escolhidos.length > 0
              ? escolhidos.map(([tipo, qtd]) => `${qtd} × ${rotuloSensor(tipo, catalogo)}`).join(', ')
              : 'Nenhum'}
          </dd>
        </>
      )}
    </dl>
  )
}

const REGISTRO = {
  modelo: { Passo: PassoModelo },
  nome: { Passo: PassoNome, validar: (d) => (d.nome.trim() ? '' : 'Informe um nome.') },
  cultura: { Passo: PassoCultura },
  sensores: { Passo: PassoSensores },
  confirmar: { Passo: PassoConfirmar },
}

/* ---------- modal ---------- */

export default function SessaoModal({
  open,
  onClose,
  onSalvo,
  salvar,
  titulo = 'Nova sessão',
  termo = 'sessão',
  passos = PASSOS_PADRAO,
  inicial,
  modelos = MODELOS_AREA,
  culturas = CULTURAS,
  catalogo = SENSORES,
  rotuloSalvar = 'Criar',
}) {
  const novo = () => ({
    modelo: modelos[0]?.id ?? '',
    nome: '',
    cultura: culturas[0] ?? '',
    hectares: '',
    sensores: {},
    ...inicial,
  })

  const [dados, setDados] = useState(novo)
  const [passo, setPasso] = useState(0)
  const [erro, setErro] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [abertoAntes, setAbertoAntes] = useState(open)

  // Cada abertura começa do zero (ajuste de estado durante a renderização,
  // padrão da documentação do React: não precisa de useEffect).
  if (open !== abertoAntes) {
    setAbertoAntes(open)
    if (open) {
      setDados(novo())
      setPasso(0)
      setErro('')
      setSalvando(false)
    }
  }

  const set = (patch) => {
    setDados((d) => ({ ...d, ...patch }))
    setErro('')
  }

  const { Passo, validar } = REGISTRO[passos[passo]]
  const ultimo = passo === passos.length - 1

  function avancar() {
    const mensagem = validar?.(dados) ?? ''
    if (mensagem) return setErro(mensagem)
    setErro('')
    setPasso((p) => p + 1)
  }

  function voltar() {
    setErro('')
    setPasso((p) => p - 1)
  }

  async function confirmar() {
    const mensagem = validar?.(dados) ?? ''
    if (mensagem) return setErro(mensagem)

    setSalvando(true)
    const res = await salvar({
      nome: dados.nome.trim(),
      cultura: dados.cultura,
      hectares: dados.hectares,
      modelo: dados.modelo,
      sensores: Object.entries(dados.sensores).map(([tipo, quantidade]) => ({ tipo, quantidade })),
    })
    setSalvando(false)

    if (!res.ok) {
      setErro(res.message)
      const passoDoNome = passos.indexOf('nome')   // ex.: nome repetido -> volta para o nome
      if (passoDoNome >= 0) setPasso(passoDoNome)
      return
    }

    onSalvo?.(res.data)
    onClose()
  }

  return (
    <BottomSheet open={open} onClose={onClose} title={titulo}>
      {passos.length > 1 && <p className="text-caption">Passo {passo + 1} de {passos.length}</p>}

      <Passo
        dados={dados}
        set={set}
        erro={erro}
        termo={termo}
        modelos={modelos}
        culturas={culturas}
        catalogo={catalogo}
        mostrarSensores={passos.includes('sensores')}
      />

      {erro && <p role="alert" className="text-caption field__error">{erro}</p>}

      <div className="modal__actions">
        <Button variant="link" onClick={passo === 0 ? onClose : voltar}>
          {passo === 0 ? 'Cancelar' : 'Voltar'}
        </Button>
        {ultimo
          ? <Button onClick={confirmar} disabled={salvando}>{salvando ? 'Salvando...' : rotuloSalvar}</Button>
          : <Button onClick={avancar}>Continuar</Button>}
      </div>
    </BottomSheet>
  )
}
