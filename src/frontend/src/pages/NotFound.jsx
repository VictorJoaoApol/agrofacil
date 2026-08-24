import { NavLink } from "react-router"

function NotFound() {
    return (
        <>
            <h1>Erro 404</h1>
            <p>Página Não Encontrada</p>
            <NavLink to = "/app">Home</NavLink>
        </>
    )
}

export default NotFound