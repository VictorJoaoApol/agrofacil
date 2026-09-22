import { NavLink, Outlet } from "react-router"

function Home() {
    return (
        <>
            <p><NavLink to="teste1"         className="NavLink">Teste1</NavLink></p>
            <p><NavLink to="/cadastro"      className="NavLink">Cadastro</NavLink></p>
            <p><NavLink to="/login"         className="NavLink">Login</NavLink></p>
            <p><NavLink to="painel"         className="NavLink">Painel</NavLink></p>
            <p><NavLink to="dispositivos"   className="NavLink">Dispositivos</NavLink></p>
            <p><NavLink to="tarefas"        className="NavLink">Tarefas</NavLink></p>
            <p><NavLink to="perfil"         className="NavLink">Perfil</NavLink></p>
            <p><NavLink to="faleconosco"    className="NavLink">Fale Conosco</NavLink></p>

            {/* Renderiza a rota filha ativa (Overview, Painel, Tarefas, etc.) */}
            <Outlet />
        </>
    )
}

export default Home;