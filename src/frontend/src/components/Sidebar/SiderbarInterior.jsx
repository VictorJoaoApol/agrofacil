import SidebarIcones from "./SidebarIcones"
import SidebarMenu from "./SidebarMenu"

function SidebarInterior() {
    return (

        <>
            <div className="SidebarInterior">
                <SidebarMenu />
                <div className="SidebarEspaco"></div>
                <SidebarIcones />
            </div>
        </>
    )
}

export default SidebarInterior