import { useSidebar } from "../Sidebar/Sidebar"

function NavConteudo() {
    const { toggleSidebar } = useSidebar()

    return (
        <div className="NavConteudo">
            <button onClick={toggleSidebar}></button>
        </div>
    )
}

export default NavConteudo