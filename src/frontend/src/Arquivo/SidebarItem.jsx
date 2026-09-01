import { NavLink } from "react-router"

function SidebarItem({link, text, icon}) {
    return (
        <li className="SidebarItem">
            <NavLink to = {link} className = "Nav-Link">
                <img src = {icon} className = "IconeMenu"alt= "placeholder" />
                <span className="NomeMenu">{text}</span>
            </NavLink>
        </li>
    )
}

export default SidebarItem