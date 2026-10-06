// components/forms/Logout.jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

// Botão de logout. Diferente de login/cadastro, não tem campos de entrada:
// só dispara a ação e mostra erro, se houver.

/* Componente funcional responsável por disparar o fluxo de encerramento de sessão (Logout) */
function Logout() {
  /* Estados locais para mensagem de erro no encerramento da sessão e indicador visual de processamento */
  const [erro, setErro] = useState(null);
  const [saindo, setSaindo] = useState(false);

  /* Hook para navegação e redirecionamento de rotas */
  const navigate = useNavigate();

  // Função do AuthContext que chama o backend e limpa o usuário local.
  const { deslogar } = useAuth();

  /* Executa a requisição de deslogar, limpa a sessão local e redireciona para a página de login */
  async function handleClick() {
    setErro(null);
    setSaindo(true);

    try {
      await deslogar();
      navigate("/login");
    } catch (err) {
      setErro(err.message);
      setSaindo(false);
    }
  }

  return (
    <>
      {/* Botão de acionamento do encerramento de sessão com alteração textual de estado */}
      <button type="button" onClick={handleClick} disabled={saindo}>
        {saindo ? "Saindo..." : "Sair"}
      </button>

      {/* Mensagem de erro -> aparece apenas se houver erros */}
      {erro && <p className="erro">{erro}</p>}
    </>
  );
}

export default Logout;