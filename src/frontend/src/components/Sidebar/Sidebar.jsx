import { createContext, useContext, useState } from "react"
import { NavLink } from "react-router"



// ---------- Context ----------
const SidebarContext = createContext()

export function SidebarProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    const toggleSidebar = () => setIsOpen((prev) => !prev)

    return (
        <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    )
}

export function useSidebar() {
    return useContext(SidebarContext)
}

// ---------- SidebarItem ----------
function SidebarItem({ link, text, icon, classe, placeholder }) {
    return (
        <li className="SidebarItem">
            <NavLink to={link} className="Nav-Link">
                <img src={icon} className={classe} alt={placeholder} />
                <span className="NomeMenu">{text}</span>
            </NavLink>
        </li>
    )
}

// ---------- SidebarMenu ----------
function SidebarMenu() {
    return (
        <ul className="SidebarMenu">
            <SidebarItem link={"/cadastro"} text={"Cadastro"} icon={"src/assets/Icons/utilitarios/Email.svg"} classe={"IconeMenu medio"} placeholder={"Cadastro"}/>
            <SidebarItem link={"/login"} text={"Login"} icon={"src/assets/Icons/utilitarios/Login.svg"} classe={"IconeMenu medio"} placeholder={"Cadastro"}/>
            <SidebarItem link={"painel"} text={"Painel"} icon={"src/assets/Icons/utilitarios/Item.svg"} classe={"IconeMenu medio"} placeholder={"Cadastro"}/>
            <SidebarItem link={"dispositivos"} text={"Dispositivos"} icon={"src/assets/Icons/utilitarios/Configuração.svg"} classe={"IconeMenu medio"} placeholder={"Cadastro"}/>
            <SidebarItem link={"tarefas"} text={"Tarefas"} icon={"src/assets/Icons/utilitarios/Ponto.svg"} classe={"IconeMenu medio"} placeholder={"Cadastro"}/>
            <SidebarItem link={"perfil"} text={"Perfil"} icon={"src/assets/Icons/utilitarios/Usuario.svg"} classe={"IconeMenu medio"} placeholder={"Cadastro"}/>
            <SidebarItem link={"faleconosco"} text={"Fale Conosco"} icon={"src/assets/Icons/utilitarios/Notificação.svg"} classe={"IconeMenu medio"} placeholder={"Cadastro"}/>
            <SidebarItem link={"teste1"} text={"teste1"} icon={"src/assets/Icons/utilitarios/Notificação.svg"} classe={"IconeMenu medio"} placeholder={"Teste1"}/>
        </ul>
    )
}

// ---------- SidebarIcones ----------
function SidebarIcones() {
    return <section className="SidebarIcones"></section>
}

// ---------- SidebarInterior ----------
function SidebarInterior() {
    const { toggleSidebar } = useSidebar()

    return (
        <div className="SidebarInterior">
            <button className="FecharSidebar" onClick={toggleSidebar}><img src="src\assets\Icons\botao\Fechar.svg"></img></button>
            <SidebarMenu />
            <SidebarIcones />
        </div>
    )
}

// ---------- SidebarLayout ----------
function SidebarLayout({ className = "" }) {
    return (
        <div className={`SidebarLayout ${className}`}>
            <SidebarInterior />
        </div>
    )
}

// ---------- Sidebar (componente principal) ----------
function Sidebar() {
    const { isOpen } = useSidebar()
    return <SidebarLayout className={isOpen ? "aberta" : "fechada"} />
}

export default Sidebar