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
      const resultado = await resposta.json(); // Adicionado 'await' aqui caso sua API retorne Promise no json()

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
    // Este é o cartão branco
    <div className="card-cadastro">
      <h1 className="titulo-cadastro">Cadastre-se</h1>
      
      <form onSubmit={handleSubmit} className="formulario">
        {/* Input de Nome */}
        <label className="campotexto">
          Nome
          <input
            type="text"
            placeholder="Insire seu nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />
        </label>

        {/* Input de Email */}
        <label className="campotexto">
          Email
          <input
            type="email"
            placeholder="Exemplo@Gmail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        {/* Input de Senha */}
        <label className="campotexto">
          Senha
          <input
            type="password"
            placeholder="*************"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
          />
        </label>

        {erro && <p className="erro">{erro}</p>}

        <button type="submit" className="btn-cadastrar" disabled={enviando}>
          {enviando ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      {/* Abacate */}
      <div className="rodape-cadastro">
        <p>Possui uma conta? <NavLink to="/login" className="link-login">Login</NavLink></p>
      </div>
    </div>
  );
}

export default FormCadastro;