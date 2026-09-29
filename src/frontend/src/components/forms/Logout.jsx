import { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

// Botão de logout. Diferente de login/cadastro, não tem campos de entrada:
// só dispara a ação e mostra erro, se houver.
function Logout() {
  const [erro, setErro] = useState(null);
  const [saindo, setSaindo] = useState(false);

  const navigate = useNavigate();

  // Função do AuthContext que chama o backend e limpa o usuário local.
  const { deslogar } = useAuth();

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
      <button type="button" onClick={handleClick} disabled={saindo}>
        {saindo ? "Saindo..." : "Sair"}
      </button>

      {/* Mensagem de erro -> aparece apenas se houver erros */}
      {erro && <p className="erro">{erro}</p>}
    </>
  );
}

export default Logout;