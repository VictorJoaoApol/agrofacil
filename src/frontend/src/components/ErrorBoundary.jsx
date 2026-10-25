// components/ErrorBoundary.jsx
// Sem isto, um erro de renderização em qualquer componente desmonta o app inteiro
// (tela branca até recarregar). Com isto, só a área afetada mostra o aviso.
import { Component } from 'react'
import EmptyState from './ui/EmptyState.jsx'
import Button from './ui/Button.jsx'

/* Componente de Classe limite de erro (Error Boundary) para captura e isolamento de exceções em tempo de renderização */
export default class ErrorBoundary extends Component {
  /* Estado local que guarda a referência do erro capturado */
  state = { erro: null }

  /* Atualiza o estado da classe quando uma exceção é lançada em um componente filho */
  static getDerivedStateFromError(erro) {
    return { erro }
  }

  /* Registra informações detalhadas do erro e da pilha de chamadas no console */
  componentDidCatch(erro, info) {
    console.error('Erro de renderização:', erro, info.componentStack)
  }

  render() {
    /* Renderiza os componentes filhos normalmente se não houver erros na árvore */
    if (!this.state.erro) return this.props.children

    /* Interface de fallback amigável exibida quando ocorre um erro na árvore de renderização */
    return (
      <EmptyState
        title="Algo deu errado nesta tela"
        text="Tente novamente. Se o problema continuar, volte ao início."
        action={<Button onClick={() => this.setState({ erro: null })}>Tentar de novo</Button>}
      />
    )
  }
}