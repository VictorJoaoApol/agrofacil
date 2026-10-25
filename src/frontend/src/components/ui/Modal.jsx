// components/ui/Modal.jsx
import { useEffect, useId, useRef } from 'react'

/* Componente genérico de janela modal utilizando a tag nativa <dialog> com acessibilidade integrada */
export default function Modal({ open, onClose, title, children }) {
  /* Referência direta ao elemento nativo <dialog> */
  const ref = useRef(null)
  
  /* Identificador único para vinculação semântica via aria-labelledby */
  const id = useId()

  /* Efeito colateral para sincronizar a visibilidade da caixa de diálogo nativa com o estado 'open' do React */
  useEffect(() => {
    const dlg = ref.current
    if (!dlg) return
    if (open && !dlg.open) dlg.showModal()
    if (!open && dlg.open) dlg.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby={`${id}-titulo`}
      onClose={onClose}
      /* Detecta clique na camada externa (backdrop) do dialog para acionar o fechamento */
      onClick={(e) => e.target === ref.current && onClose()}
    >
      {/* Título acessível associado via ARIA ao container da modal */}
      <h2 id={`${id}-titulo`} className="text-title-s">{title}</h2>
      
      {/* Conteúdo interno personalizável passado via children */}
      {children}
    </dialog>
  )
}