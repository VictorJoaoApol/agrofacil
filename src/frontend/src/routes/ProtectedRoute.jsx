// routes/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

/*
 * Rota "guarda" para as áreas autenticadas do app (/app/*).
 * Enquanto a sessão ainda está sendo checada, não renderiza nada (evita
 * um "flash" de redirecionamento indevido). Se não houver usuário
 * autenticado, redireciona para /login. Se houver, renderiza a rota filha.
 */
function ProtectedRoute() {
  /* Resgata o estado de autenticação e carregamento da sessão */
  const { estaAutenticado, carregando } = useAuth();
  
  /* Captura a localização atual para permitir retorno após o login */
  const location = useLocation();

  /* Aguarda a verificação da sessão antes de renderizar qualquer conteúdo */
  if (carregando) {
    return null;
  }

  /* Redireciona usuários não autenticados preservando a rota de origem */
  /*if (!estaAutenticado) {
    return <Navigate to="/login" state={{ de: location }} replace />;
  }

  /* Exibe o layout e rotas filhas autenticadas */
  return <Outlet />;
}

export default ProtectedRoute;