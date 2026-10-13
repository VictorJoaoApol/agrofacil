import { useState } from "react";
import { solicitarRecuperacao } from "../../../../api/auth";

function FormRecuperarSenha() {
  // Cria estado para o email, status e estado de envio.
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);


  // Cria função para lidar com o envio do formulário
  async function handleSubmit(event) {

    // Evita o recarregamento da página no momento do envio.
    event.preventDefault();

    // Define estados de mensagem, erro e envio.
    setMensagem(null);
    setErro(null);
    setEnviando(true);


    try {
      // Envia o email para o backend e aguarda a resposta
      const resultado = await solicitarRecuperacao(email);
      
      // Se houverem erros no processamento (status != "sucesso"), lança erro.
      if (!resultado.ok) {
        throw new Error(resultado.mensagem || "Erro ao solicitar recuperação.");
      }

      // Armazena a mensagem (sempre a mesma, exista o email ou não).
      setMensagem(resultado.mensagem);

    } catch (err) {
      // Define a mensagem do erro.
      setErro(err.message);

    } finally {
      // Remove o estado de envio.
      setEnviando(false);
    }

  } 
  return (
    <>
      <h1>Recuperar Senha</h1>
      <p>Digite seu email, e então te mandaremos um link para que você troque sua senha. Não o compartilhe com ninguém.</p>

      <form onSubmit={handleSubmit}>
    
        <label>
          Digite seu Email:
          <input
            type="email"
            placeholder="exemplo@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        {/* Mensagens de erro ou sucesso */}
        {erro && <p className="erro">{erro}</p>}
        {mensagem && <p className="sucesso">{mensagem}</p>}

        {/* Botão de enviar fica inativo durante o envio */}
        <button type="submit" disabled={enviando}>
          {enviando ? "Enviando..." : "Enviar link"}
        </button>
      </form>
    </>
  );
}

export default FormRecuperarSenha;