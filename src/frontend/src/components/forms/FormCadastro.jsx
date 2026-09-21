import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { cadastro } from "../../../../api/auth";

function FormCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setErro(null);
    setEnviando(true);

    try {
      const resposta = await cadastro(nome, email, senha);

      if (!resposta.ok) {
        throw new Error(resultado.mensagem || "Erro desconhecido ao cadastrar");
      }

      navigate("/login");

    } catch (err) {
      setErro(err.message);

    } finally {
      setSenha("");
      setEnviando(false);
    }
  }


  return (
    <>
      <h1>Cadastre-se</h1>
      <form onSubmit={handleSubmit}>


        <label className="campotexto">
          Nome:
          <input
            type="text"
            placeholder="Digite seu nome..."
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />
        </label>


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


        {erro && <p className="erro">{erro}</p>}


        <button type="submit" disabled={enviando}>
          {enviando ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>


      <nav>
        <NavLink to = "/app">Home</NavLink>
        <NavLink to = "/login">Já tenho uma conta.</NavLink>
      </nav>
    </>
  );
}

export default FormCadastro;