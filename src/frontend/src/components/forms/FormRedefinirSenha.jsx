import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { redefinirSenha } from "../../../../api/auth";

function FormRedefinirSenha() {
  // Cria estado para cada dado, status e estado de envio.
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);

  // Utilizado para navegar entre páginas no site.
  const navigate = useNavigate();


  // Pega o token de recuperação que veio no link do email.
  // Exemplo: "https://agrofacil/login/redefinir-senha?token=A1B2C3".
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");


  // Cria função que lida com o evento do formulário.
  async function handleSubmit(event){
    // Evita a ação padrão de envio (recarregar página).
    event.preventDefault();

    // Define erro.
    setErro(null);

    // Encerra o processo caso as senhas fornecidas não coincidam.
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    // Define estado de envio.
    setEnviando(true);

    try {
      // Envia token e senha para o backend e aguarda o resultado do processo.
      const resultado = await redefinirSenha(token, senha);

      // Caso hajam erros, lança outro erro ;-;
      if (!resultado.ok) {
        throw new Error(resultado.mensagem || "Erro ao redefinir senha.");
      }

      // Se tudo der certo, encaminha para o login.
      navigate("/login");

    } catch (err) {
      // Define a mensagem de erro.
      setErro(err.message);

    } finally {
      // Define estado de envio.
      setEnviando(false);
    }
  }

  // Caso não haja token, manda a mesma mensagem padrão caso o token seja inválido.
  if (!token) {
    return (
      <p className="erro">
        O token é inválido ou expirou. Solicite uma troca de senha novamente.
      </p>
    );
  }

  return (
    <>
      <h1>Crie sua nova senha</h1>

      <form onSubmit={handleSubmit}>

        <label>
          Senha:
          <input
            type="password" 
            placeholder="Digite sua nova senha..."
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
          />
        </label>
        
        <label>
          Confirmar senha:
          <input
            type="password" 
            placeholder="Confirme a senha..."
            value={confirmarSenha}
            onChange={(event) => setConfirmarSenha(event.target.value)}
            required
          />
        </label>
        

        {/* Mensagem de erro */}
        {erro && <p className="erro">{erro}</p>}


        {/* Botão de enviar fica inativo durante o envio */}
        <button type="submit" disabled={enviando}>
          {enviando ? "Salvando..." : "Salvar nova senha"}
        </button>
      </form>
    </>
  )
}

export default FormRedefinirSenha;