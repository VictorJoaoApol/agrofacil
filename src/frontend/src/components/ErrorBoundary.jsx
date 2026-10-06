// components/ErrorBoundary.jsx
// Sem isto, um erro de renderização em qualquer componente desmonta o app inteiro
// (tela branca até recarregar). Com isto, só a área afetada mostra o aviso.
import { Component } from 'react'
import EmptyState from './ui/EmptyState.jsx'
import Button from './ui/Button.jsx'

export default class ErrorBoundary extends Component {
  state = { erro: null }

  static getDerivedStateFromError(erro) {
    return { erro }
  }

  componentDidCatch(erro, info) {
    console.error('Erro de renderização:', erro, info.componentStack)
  }

  render() {
    if (!this.state.erro) return this.props.children

    return (
      <EmptyState
        title="Algo deu errado nesta tela"
        text="Tente novamente. Se o problema continuar, volte ao início."
        action={<Button onClick={() => this.setState({ erro: null })}>Tentar de novo</Button>}
      />
    )
  }
}
