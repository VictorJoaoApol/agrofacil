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
function SidebarItem({ link, text, icon }) {
    return (
        <li className="SidebarItem">
            <NavLink to={link} className="Nav-Link">
                <img src={icon} className="IconeMenu" alt="placeholder" />
                <span className="NomeMenu">{text}</span>
            </NavLink>
        </li>
    )
}

// ---------- SidebarMenu ----------
function SidebarMenu() {
    return (
        <ul className="SidebarMenu">
            <SidebarItem link={"/cadastro"} text={"Texto"} icon={"src/assets/Icones/IconPlaceholder.svg"} />
            <SidebarItem link={"/login"} text={"Texto"} icon={"src/assets/Icones/IconPlaceholder.svg"} />
            <SidebarItem link={"painel"} text={"Texto"} icon={"src/assets/Icones/IconPlaceholder.svg"} />
            <SidebarItem link={"dispositivos"} text={"Texto"} icon={"src/assets/Icones/IconPlaceholder.svg"} />
            <SidebarItem link={"tarefas"} text={"Texto"} icon={"src/assets/Icones/IconPlaceholder.svg"} />
            <SidebarItem link={"perfil"} text={"Texto"} icon={"src/assets/Icones/IconPlaceholder.svg"} />
            <SidebarItem link={"faleconosco"} text={"Texto"} icon={"src/assets/Icones/IconPlaceholder.svg"} />
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
            <button className="FecharSidebar" onClick={toggleSidebar}>✕</button>
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