// components/ui/Avatar.jsx
import { useState } from 'react'

/* Componente reutilizável para exibição de avatar do usuário (imagem ou inicial do nome) */
export default function Avatar({ nome, src, size = 40 }) {
  /* Estado local para fallback caso a imagem falhe ao carregar */
  const [falhou, setFalhou] = useState(false)
  // `nome` pode vir null/undefined do backend
  /* Obtém a primeira letra do nome em caixa alta ou assume 'U' por padrão */
  const inicial = (nome || 'U').charAt(0).toUpperCase()

  return (
    <span className="avatar" style={{ '--avatar-size': `${size}px` }} aria-hidden="true">
      {/* Exibe a imagem de perfil se fornecida e válida, ou cai no fallback da inicial */}
      {src && !falhou
        ? <img src={src} alt="" onError={() => setFalhou(true)} />
        : inicial}
    </span>
  )
}