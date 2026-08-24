import { NavLink } from "react-router"

function Overview() {
    return (
        <>
            <p><NavLink to = "cadastro">Cadastro</NavLink></p>
            <p><NavLink to = "login">Login</NavLink></p>
            <p><NavLink to = "painel">Painel</NavLink></p>
            <p><NavLink to = "dispositivos">Dispositivos</NavLink></p>
            <p><NavLink to = "tarefas">Tarefas</NavLink></p>
            <p><NavLink to = "faleconosco">Fale Conosco</NavLink></p>
        </>
    )
}

export default Overview