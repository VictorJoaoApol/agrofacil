// components/ui/Button.jsx
import { Link } from 'react-router'

// variant: 'primary' (verde) | 'secondary' (azul) | 'accent' (laranja) | 'link'
export default function Button({ variant = 'primary', to, loading = false, children, ...props }) {
  const className = `btn btn--${variant}`

  if (to) {
    return <Link to={to} className={className} {...props}>{children}</Link>
  }
  return (
    <button className={className} {...props} disabled={loading || props.disabled}>
      {loading ? 'Aguarde...' : children}
    </button>
  )
}