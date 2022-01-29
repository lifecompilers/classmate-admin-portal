import Sidebar from "./Sidebar";
import "../../styles/layout.scss";
import { useState } from "react";
import Header from "./Header";
import { useLocation } from "react-router";

const Layout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    }

    return <div className="layout">
        <Sidebar collapsed={collapsed} currentLocation={location.pathname} />
        <div className="main-panel">
            <Header toggleCollapsed={toggleCollapsed} currentLocation={location.pathname} />
            <div>
                routes
            </div>
        </div>
    </div>
}
export default Layout;