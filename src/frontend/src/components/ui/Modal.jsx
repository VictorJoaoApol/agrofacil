// components/ui/Modal.jsx
import { useEffect, useId, useRef } from 'react'

export default function Modal({ open, onClose, title, children }) {
  const ref = useRef(null)
  const id = useId()

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
      onClick={(e) => e.target === ref.current && onClose()}
    >
      <h2 id={`${id}-titulo`} className="text-title-s">{title}</h2>
      {children}
    </dialog>
  )
}
