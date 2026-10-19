// components/ui/BottomSheet.jsx
// Painel que sobe de baixo da tela. Fecha de 4 formas: arrastando a alça/título para baixo,
// tocando na alça, tocando fora (no fundo escurecido) ou com Esc.
//
// Usa <dialog> nativo (foco preso dentro, Esc, camada acima de tudo). O estado "aberto"
// continua sendo da tela (prop `open`); a animação de entrada e saída é feita aqui.
//
//   open, onClose, title, children
import { useEffect, useId, useRef } from 'react'

const DURACAO_MS = 300          // igual ao transition do .sheet no CSS
const LIMIAR_DISTANCIA = 120    // px arrastados para baixo que fecham o painel
const LIMIAR_VELOCIDADE = 0.6   // px/ms: um "empurrão" rápido também fecha

export default function BottomSheet({ open, onClose, title, children }) {
  const ref = useRef(null)
  const id = useId()
  const arrasto = useRef(null)
  const moveu = useRef(false)

  useEffect(() => {
    const dlg = ref.current
    if (!dlg) return

    if (open) {
      dlg.style.transform = ''
      if (!dlg.open) dlg.showModal()
      void dlg.offsetHeight            // força o layout: a animação parte da posição fechada
      dlg.classList.add('is-open')
      return
    }

    // fechar: anima para baixo e só então fecha o <dialog>
    dlg.classList.remove('is-open')
    if (!dlg.open) return
    const timer = setTimeout(() => dlg.close(), DURACAO_MS)
    return () => clearTimeout(timer)
  }, [open])

  /* ---------- arrastar ---------- */

  function aoIniciar(e) {
    if (e.button !== 0) return
    ref.current.style.transition = 'none'     // o painel acompanha o dedo sem atraso
    arrasto.current = { y0: e.clientY, ultimoY: e.clientY, ultimoT: e.timeStamp, dy: 0, velocidade: 0, moveu: false }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function aoMover(e) {
    const a = arrasto.current
    if (!a) return
    a.dy = Math.max(0, e.clientY - a.y0)      // só desce; para cima não passa da posição aberta
    a.velocidade = (e.clientY - a.ultimoY) / Math.max(1, e.timeStamp - a.ultimoT)
    a.ultimoY = e.clientY
    a.ultimoT = e.timeStamp
    if (a.dy > 4) a.moveu = true
    ref.current.style.transform = `translateY(${a.dy}px)`
  }

  function aoSoltar() {
    const a = arrasto.current
    if (!a) return
    arrasto.current = null
    moveu.current = a.moveu

    const dlg = ref.current
    dlg.style.transition = ''                 // volta a animar
    if (a.dy > LIMIAR_DISTANCIA || (a.velocidade > LIMIAR_VELOCIDADE && a.dy > 24)) {
      dlg.style.transform = 'translateY(100%)'
      onClose()
    } else {
      dlg.style.transform = ''                // não passou do limite: volta para o lugar
    }
  }

  function aoClicarAlca() {
    if (moveu.current) {                      // o clique veio do fim de um arrasto
      moveu.current = false
      return
    }
    onClose()
  }

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby={`${id}-titulo`}
      onCancel={(e) => { e.preventDefault(); onClose() }}   // Esc: fecha com animação
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      <div
        className="sheet__cabecalho"
        onPointerDown={aoIniciar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
      >
        <button type="button" className="sheet__alca" aria-label="Fechar" onClick={aoClicarAlca} />
        <h2 id={`${id}-titulo`} className="sheet__titulo text-title-s">{title}</h2>
      </div>

      <div className="sheet__corpo">{children}</div>
    </dialog>
  )
}
