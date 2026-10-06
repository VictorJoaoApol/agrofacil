// components/ui/Avatar.jsx
import { useState } from 'react'

export default function Avatar({ nome, src, size = 40 }) {
  const [falhou, setFalhou] = useState(false)
  // `nome` pode vir null/undefined do backend
  const inicial = (nome || 'U').charAt(0).toUpperCase()

  return (
    <span className="avatar" style={{ '--avatar-size': `${size}px` }} aria-hidden="true">
      {src && !falhou
        ? <img src={src} alt="" onError={() => setFalhou(true)} />
        : inicial}
    </span>
  )
}
