import { NavLink, Outlet } from "react-router"

function Login() {
    return (
        <>
            <h1>Login</h1>
            <NavLink to = "/cadastro">Cadastro</NavLink>
            
            <Outlet />

        </>
    )
}

export default Login