// routes/PublicRoute.jsx
import { Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";

/**
 * Rota "inversa" à ProtectedRoute: usada nas páginas que só fazem sentido
 * para quem NÃO está logado (login, cadastro). Se já existir uma sessão
 * ativa, redireciona direto para /app em vez de mostrar o formulário.
 * Enquanto a sessão ainda está sendo checada, não renderiza nada (evita
 * um "flash" do formulário antes do redirecionamento).
 */
function PublicRoute() {
  /* Resgata o estado de autenticação e carregamento da sessão */
  const { estaAutenticado, carregando } = useAuth();

  /* Aguarda a verificação da sessão antes de liberar a visualização */
  if (carregando) {
    return null;
  }

  /* Redireciona automaticamente para a aplicação caso o usuário já esteja autenticado */
  if (estaAutenticado) {
    return <Navigate to="/app" replace />;
  }

  /* Renderiza os formulários públicos (Login, Cadastro, Recuperar Senha) */
  return <Outlet />;
}

export default PublicRoute;