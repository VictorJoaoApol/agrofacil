import { NavLink } from "react-router"

function SidebarMenu() {
    return (

        <>
                <ul className="SidebarMenu">
                    <li className="SidebarItem">
                        <NavLink to = "/" className = "Nav-Link">
                            <i className="IconeMenu">Icone</i>
                            <span className="NomeMenu">Nome</span>
                        </NavLink>
                    </li>

                </ul>
        </>
    )
}

export default SidebarMenu