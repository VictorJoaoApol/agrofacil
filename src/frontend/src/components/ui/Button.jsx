// components/ui/Button.jsx
import { Link } from 'react-router'

// variant: 'primary' (laranja) | 'highlight' (azul) | 'link'
// Com `to` vira <Link>. Sem `to`, o type padrão é "button" (use type="submit" nos formulários).

/* Componente genérico de botão polimórfico (renderiza <button> ou <Link> do React Router) com estados de carregamento */
export default function Button({
  variant = 'primary',
  to,
  loading = false,
  type = 'button',
  disabled,
  children,
  ...props
}) {
  /* Define a classe CSS dinamicamente com base na variante informada */
  const className = `btn btn--${variant}`

  /* Renderiza como Link de navegação caso a prop 'to' seja fornecida */
  if (to) {
    return <Link to={to} className={className} {...props}>{children}</Link>
  }

  /* Renderiza como elemento HTML button padrão com controle de carregamento e estado desabilitado */
  return (
    <button type={type} className={className} {...props} disabled={loading || disabled}>
      {loading ? 'Aguarde...' : children}
    </button>
  )
}