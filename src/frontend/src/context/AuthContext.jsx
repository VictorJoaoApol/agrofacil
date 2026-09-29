import { createContext, useContext, useEffect, useState } from "react";
import { verificarSessao, logout } from "../../../api/auth";

// Contexto que guarda o usuário autenticado (ou null, se não houver sessão ativa).
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Dados do usuário logado (id, nome, email) ou null se não autenticado.
  const [usuario, setUsuario] = useState(null);

  // Indica se a checagem inicial de sessão ainda está em andamento.
  // Evita que ProtectedRoute redirecione para /login antes de saber a resposta do backend.
  const [carregando, setCarregando] = useState(true);

  // Pergunta ao backend (sessao.php) se existe uma sessão PHP ativa e,
  // se houver, atualiza o estado do usuário. Usada tanto na carga inicial
  // do app quanto logo após um login bem-sucedido.
  async function checarSessao() {
    try {
      const resultado = await verificarSessao();

      if (resultado.ok && resultado.usuario) {
        setUsuario(resultado.usuario);
      } else {
        setUsuario(null);
      }
    } catch (err) {
      // Erro de rede ou servidor indisponível: trata como não autenticado
      // em vez de travar a aplicação.
      console.error("Erro ao verificar sessão:", err);
      setUsuario(null);
    } finally {
      setCarregando(false);
    }
  }

  // Ao carregar o app (ex: usuário dá F5 na página), verifica se já existe
  // uma sessão ativa no backend, garantindo persistência de sessão.
  useEffect(() => {
    checarSessao();
  }, []);

  // Encerra a sessão no backend (logout.php) e, só se der certo, limpa o
  // usuário local. Se a requisição falhar, lança erro para quem chamou
  // (ex: o botão de logout) poder mostrar a mensagem.
  async function deslogar() {
    const resultado = await logout();

    if (!resultado.ok) {
      throw new Error(resultado.mensagem || "Erro ao sair da conta");
    }

    setUsuario(null);
  }

  const value = {
    usuario,
    estaAutenticado: !!usuario,
    carregando,
    setUsuario,
    checarSessao,
    deslogar,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook interno para consumir o contexto. Prefira usar o hook
// `useAuth` em frontend/src/hooks/useAuth.jsx nos componentes.
export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuthContext precisa ser usado dentro de um <AuthProvider>.");
  }

  return context;
}