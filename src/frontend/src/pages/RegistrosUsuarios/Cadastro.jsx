import logo from '../../assets/img/Logo.png'

function Cadastro() {
  return (
    <div className="fundo">
      <header>
        <img className="icon" src={logo} />
      </header>

      <FormCadastro />
    </div>
  )
}

export default Cadastro