import Navbar from "../components/Navbar/Navbar"
import Sidebar, { SidebarProvider } from "../components/Sidebar/Sidebar"

function Teste() {
    return (
        <SidebarProvider>
            <Navbar />
            <Sidebar />
        </SidebarProvider>
    )
}

export default Teste