import SidebarInterior from "./SiderbarInterior"

function SidebarLayout({ className = "" }) {
    return (
        <div className={`SidebarLayout ${className}`}>
            <SidebarInterior />
        </div>
    )
}

export default SidebarLayout