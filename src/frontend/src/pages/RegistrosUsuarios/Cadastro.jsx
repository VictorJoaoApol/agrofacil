import logo from '../../assets/img/Logo.png'
import FormCadastro from '../../components/forms/FormCadastro'

function Cadastro() {
  return (
    // A classe .tela-fundo será responsável por centralizar tudo e colocar o background
    <div className="tela-fundo">
      <header className="cabecalho-logo">
        <img className="icon-logo" src={logo} alt="Logo" />
      </header>

      <FormCadastro />
    </div>
  )
}

export default Cadastro;