import { NavLink, Outlet } from "react-router"

function Login() {
    return (
        <>
            <h1>Login</h1>
            <NavLink to="/app/tarefas">Tarefas</NavLink>
            <NavLink to="/app" end>Visão geral</NavLink>  {/* end evita ficar ativo em todas */}
            <NavLink to="/login/recuperar-senha">Esqueci a senha</NavLink>
            <Outlet />
        </>
    )
}

export default Login