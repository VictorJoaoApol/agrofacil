import { useSidebar } from "../Sidebar/Sidebar"
import a from "../../assets/img/Logo.png"

function NavConteudo() {
    const { toggleSidebar } = useSidebar()

    return (
        <div className="NavConteudo">
            
            <button className="IconeMenu medio" onClick={toggleSidebar}>
                <img src="src\assets\Icons\botao\Menu.svg"></img>
            </button>
            <button type="button" className="icone-Nav">
                <img src="src\assets\img\Logo.png"></img>
            </button>
            <button className="iconePerfil" onClick={toggleSidebar}>
                <img src="src\assets\img\perfil.png"></img>
            </button>
        </div>
    )
}

export default NavConteudo