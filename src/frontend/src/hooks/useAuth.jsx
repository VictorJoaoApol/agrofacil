import { useAuthContext } from "../context/AuthContext";

/**
 * Hook de conveniência para acessar o estado de autenticação em qualquer
 * componente: usuário logado (ou null), se a checagem inicial de sessão
 * ainda está carregando, e a função para forçar uma nova checagem de sessão.
 *
 * Precisa ser usado dentro de um <AuthProvider> (ver src/main.jsx).
 */
function useAuth() {
  return useAuthContext();
}

export default useAuth;