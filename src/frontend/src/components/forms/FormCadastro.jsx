import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

function FormCadastro() {
  // Cria estado para cada dado, erros e estado de envio.
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);

  // utilizado para redirecionar o usuário para outra parte do site.
  const navigate = useNavigate();

  // Função assíncrona -> acontece por trás das cortinas, sem interromper outras ações.
  async function handleSubmit(event) {
    // Evita que a ação padrão de envio do formulário ocorra (recarregar a página), permitindo esta customização.
    event.preventDefault();

    // Define os estados de erro e de envio.
    setErro(null);
    setEnviando(true);

    // Bloco try..catch para evitar erros mal-apresentados.
    try {
      // Envia dados do formulário pro PHP e espera a resposta.
      const resposta = await fetch("http://localhost/api/processa_cadastro.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      // Espera a resposta chegar e armazena ela como JSON.
      const resultado = await resposta.json();

      // Se o código da resposta não for de sucesso, lança erro. 
      if (!resposta.ok) {
        throw new Error(resultado.mensagem || "Erro desconhecido ao cadastrar");
      }

      // Se tudo der certo, manda pra home.
      navigate("/app");

    } catch (err) {
      // Caso um erro do JS seja mandado, define a mensagem de erro como ele.
      setErro(err.message);

    } finally {
      // Limpa a senha e define o estado de envio como false.
      setSenha("");
      setEnviando(false);
    }
  }


  return (
    <>
      <h1>Cadastre-se</h1>
      <form onSubmit={handleSubmit}>

        {/* Input de Nome */}
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
          {enviando ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>


      {/* Links de navegação externa */}
      <nav>
        <NavLink to = "/app">Home</NavLink>
        <NavLink to = "/login">Login</NavLink>
      </nav>
    </>
  );
}

export default FormCadastro;