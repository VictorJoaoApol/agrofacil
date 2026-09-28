import { createContext, useContext, useState } from "react"
import { NavLink } from "react-router"
import { Email, Login, Item, Configuracao, Ponto, Usuario, Notificacao, Fechar } from "../../assets/Icons"

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
function SidebarItem({ link, text, icon: Icon, classe, placeholder }) {
    return (
        <li className="SidebarItem">
            <NavLink to={link} className="Nav-Link">
                <Icon className={classe} aria-label={placeholder} role="img" />
                <span className="NomeMenu">{text}</span>
            </NavLink>
        </li>
    )
}

// ---------- SidebarMenu ----------
function SidebarMenu() {
    return (
        <ul className="SidebarMenu">
            <SidebarItem link="/cadastro" text="Cadastro" icon={Email} classe="IconeMenu medio" placeholder="Cadastro" />
            <SidebarItem link="/login" text="Login" icon={Login} classe="IconeMenu medio" placeholder="Login" />
            <SidebarItem link="painel" text="Painel" icon={Item} classe="IconeMenu medio" placeholder="Painel" />
            <SidebarItem link="dispositivos" text="Dispositivos" icon={Configuracao} classe="IconeMenu medio" placeholder="Dispositivos" />
            <SidebarItem link="tarefas" text="Tarefas" icon={Ponto} classe="IconeMenu medio" placeholder="Tarefas" />
            <SidebarItem link="perfil" text="Perfil" icon={Usuario} classe="IconeMenu medio" placeholder="Perfil" />
            <SidebarItem link="faleconosco" text="Fale Conosco" icon={Notificacao} classe="IconeMenu medio" placeholder="Fale Conosco" />
            <SidebarItem link="teste1" text="teste1" icon={Notificacao} classe="IconeMenu medio" placeholder="Teste1" />
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