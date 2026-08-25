import FormCadastro from "../components/forms/FormCadastro"
import FormLogin from "../components/forms/FormLogin"
import FormRecuperarSenha from "../components/forms/FormRecuperarSenha"
import CampoTexto from "../components/CampoTexto/CampoTexto"
import Card from "../components/Card/Card"
import Dispositivo from "../components/Card/Dispositivos/Dispositivo"
import Navbar from "../components/Navbar/Navbar"
import SidebarLayout from "../components/Sidebar/SidebarLayout"

function Teste() {
    return (
        <>
        <SidebarLayout />
        <Navbar />
        <CampoTexto />
        <FormCadastro />
        <FormLogin />
        <Card />
        <FormRecuperarSenha />
        <Dispositivo />
        </>
    )
}

export default Teste