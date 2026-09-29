import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

/**
 * Rota "guarda" para as áreas autenticadas do app (/app/*).
 * Enquanto a sessão ainda está sendo checada, não renderiza nada (evita
 * um "flash" de redirecionamento indevido). Se não houver usuário
 * autenticado, redireciona para /login. Se houver, renderiza a rota filha.
 */
function ProtectedRoute() {
  const { estaAutenticado, carregando } = useAuth();
  const location = useLocation();

  if (carregando) {
    return null;
  }

  if (!estaAutenticado) {
    // Guarda a rota de origem, para uma futura melhoria poder redirecionar
    // o usuário de volta para onde ele tentou ir após o login.
    return <Navigate to="/login" state={{ de: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
