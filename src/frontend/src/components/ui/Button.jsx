// components/ui/Button.jsx
import { Link } from 'react-router'

// variant: 'primary' (laranja) | 'highlight' (azul) | 'link'
// Com `to` vira <Link>. Sem `to`, o type padrão é "button" (use type="submit" nos formulários).
export default function Button({
  variant = 'primary',
  to,
  loading = false,
  type = 'button',
  disabled,
  children,
  ...props
}) {
  const className = `btn btn--${variant}`

  if (to) {
    return <Link to={to} className={className} {...props}>{children}</Link>
  }

  return (
    <button type={type} className={className} {...props} disabled={loading || disabled}>
      {loading ? 'Aguarde...' : children}
    </button>
  )
}
