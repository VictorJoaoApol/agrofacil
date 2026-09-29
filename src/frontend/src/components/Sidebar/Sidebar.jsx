import { createContext, useContext, useState } from "react"
import { NavLink } from "react-router"
import { appPages, appPath } from '../../routes'
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
      {appPages.map(({ path, label, icon }) => (
        <SidebarItem
          key={path}
          link={appPath(path)}
          text={label}
          icon={icon}
          classe="IconeMenu medio"
          placeholder={label}
        />
      ))}
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