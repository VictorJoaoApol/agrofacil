import logo from '../../assets/img/Logo.png'
import CampoTexto from '../../components/CampoTexto'

function Cadastro() {
  return (
    <>
      <header>
        <img className="icon" src={logo} />
      </header>

      <CampoTexto />
    </>
  )
}

export default Cadastro