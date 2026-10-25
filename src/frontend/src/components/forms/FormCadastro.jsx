import { useState } from 'react';
import { useNavigate } from 'react-router';
import TextField from '../ui/TextField.jsx';
import Button from '../ui/Button.jsx';
import { cadastro } from '../../services/auth';

function FormCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);

  // Utilizado para redirecionar o usuário para outra parte do site.
  const navigate = useNavigate();

  // Lida com a ação de envio do formulário.
  async function handleSubmit(event) {

    // Evita que a ação padrão de envio do formulário ocorra
    event.preventDefault();

    // Define estado de envio.
    setErro(null);
    setEnviando(true);

    try {
      const resultado = await cadastro(nome, email, senha);
      
      if (!resultado.ok) {
        throw new Error(resultado.mensagem || "Erro desconhecido ao cadastrar");
      }
      navigate("/login");

    } catch (err) {
      setErro(err.message);

    } finally {
      // Remove o status de enviando e limpa a senha.
      setSenha("");
      setEnviando(false);
    }
  }


  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {/* Input de Nome */}
      <TextField
        label="Nome:"
        autoComplete="name"
        type="text"
        placeholder="Insira seu nome"
        value={nome}
        onChange={(event) => setNome(event.target.value)}
        required
      />

      {/* Input de Email */}
      <TextField
        label="Email:"
        autoComplete="email"
        type="email"
        placeholder="exemplo@email.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required 
      />


      {/* Campo para criação de Senha */}
      <TextField
        label="Senha:"
        autoComplete="new-password"
        type="password"
        placeholder="Digite sua senha..."
        value={senha}
        onChange={(event) => setSenha(event.target.value)}
        required
      />


      {erro && <p className="field__error text-body" role="alert">{erro}</p>}

      <Button type="submit" variant="highlight" loading={enviando}>Cadastrar</Button>
    </form>
  );
}

export default FormCadastro;