// components/ui/Modal.jsx
import { useEffect, useRef } from 'react'

export default function Modal({ open, onClose, title, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const dlg = ref.current
    if (open && !dlg.open) dlg.showModal()
    if (!open && dlg.open) dlg.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="modal-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      <h2 id="modal-title" className="text-title-s">{title}</h2>
      {children}
    </dialog>
  )
}