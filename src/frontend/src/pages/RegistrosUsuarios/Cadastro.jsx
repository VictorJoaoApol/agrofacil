import { NavLink } from 'react-router'
import logo from '../../assets/img/Logo.png'
import CampoTexto from '../../components/CampoTexto'

function Cadastro() {
  return (
    <div className="fundo">
      <header>
        <img className="icon" src={logo} />
      </header>

      <CampoTexto />
      <NavLink to = "/">Home</NavLink> 
    </div>
  )
}

export default Cadastro