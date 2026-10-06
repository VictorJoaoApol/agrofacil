// pages/NotFound.jsx
import EmptyState from '../components/ui/EmptyState.jsx'
import Button from '../components/ui/Button.jsx'

export default function NotFound() {
  return (
    <div className="auth-shell">
      <div className="page-frame">
        <EmptyState
          title="Erro 404"
          text="Página não encontrada."
          action={<Button to="/app">Voltar ao início</Button>}
        />
      </div>
    </div>
  )
}
