import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { login } from "../../../../api/auth";
import useAuth from "../../hooks/useAuth";


function FormLogin() {
  // Cria estado para cada dado, erros e estado de envio.
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);

  // Utilizado para redirecionar o usuário para outra parte do site.
  const navigate = useNavigate();

  // Usado para avisar o AuthContext que agora existe uma sessão ativa.
  const { checarSessao } = useAuth();

  // Lida com a ação de envio do formulário.
  async function handleSubmit(event) {

    // Evita que a ação padrão de envio do formulário ocorra
    event.preventDefault();

    // Define estado de envio.
    setErro(null);
    setEnviando(true);

    try {

      // Envia dados do formulário pro PHP e espera a resposta.
      const resultado = await login(email, senha);

      // Caso hajam erros do backend que não sejam "já logado", encerra o processo.
      // ("ja_logado" vem com HTTP 409, então resultado.ok já é false nesse caso.)
      if (!resultado.ok && resultado.status !== "ja_logado") {
        throw new Error(resultado.mensagem || "Erro ao fazer login");
      }

      // Login OK (ou sessão já ativa): busca os dados da sessão atual no
      // backend e atualiza o AuthContext antes de navegar, garantindo que
      // as rotas protegidas já reconheçam o usuário como autenticado.
      await checarSessao();
      navigate("/app");  

    } catch (err) {
      // Define a mensagem de erro.
      setErro(err.message);

    } finally {
      // Remove o status de enviando e limpa a senha.
      setSenha("");
      setEnviando(false);
    }
  }


  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>


        {/* Input de Email */}
        <label className="campotexto">
          Email:
          <input
            type="email"
            placeholder="exemplo@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required 
          />
        </label>


        {/* Input de Senha */}
        <label className="campotexto">
          Senha:
          <input
            type="password"
            placeholder="Digite sua senha..."
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
          />
        </label>


        {/* Mensagem de erro -> aparece apenas se houver erros */}
        {erro && <p className="erro">{erro}</p>}


        {/* Botão de envio -> se torna inativo enquanto o formulário está em envio */}
        <button type="submit" disabled={enviando}>
          {enviando ? "Logando..." : "Logar"}
        </button>
      </form>

      {/* Links de navegação externa */}
      <nav>
        <NavLink to="/cadastro">Não tem conta? Cadastre aqui.</NavLink>
        <NavLink to="/login/recuperar-senha">Esqueci a senha.</NavLink>
      </nav>
    </>
  );
}

export default FormLogin;