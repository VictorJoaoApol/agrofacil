// components/ui/Avatar.jsx
import { useState } from 'react'

export default function Avatar({ nome = 'Usuário', src, size = 40 }) {
  const [falhou, setFalhou] = useState(false)
  const inicial = nome.charAt(0).toUpperCase()

  return (
    <span className="avatar" style={{ '--avatar-size': `${size}px` }} aria-hidden="true">
      {src && !falhou
        ? <img src={src} alt="" onError={() => setFalhou(true)} />
        : inicial}
    </span>
  )
}