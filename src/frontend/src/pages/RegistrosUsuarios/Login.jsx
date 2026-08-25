import { NavLink, Outlet } from "react-router"

function Login() {
    return (
        <>
            <h1>Login</h1>
            <NavLink to = "/cadastro">Cadastro</NavLink>
            <NavLink to = "recuperar-senha">Recuperar Senha</NavLink>

        </>
    )
}

export default Login