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
  const { estaAutenticado, carregando } = useAuth();

  if (carregando) {
    return null;
  }

  if (estaAutenticado) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;