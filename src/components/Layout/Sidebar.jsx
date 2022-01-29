import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const items = [
    {
        icon: <HomeIcon className="sidebar-icon" />,
        label: 'Home',
        link: '/home'
    }
]

const Sidebar = ({ collapsed, currentLocation }) => {

    return <ProSidebar className="sidebar" collapsed={collapsed}>
        <SidebarHeader className="sidebar-header">
            ClassMate
        </SidebarHeader>
        <Menu iconShape="circle" className="sidebar-menu">
            {
                items.map((item) => {
                    if (item.items?.length > 0) {
                        return <SubMenu key={item.label} title={item.label} icon={item.icon} active={item.link === currentLocation}>
                            {
                                item.items?.map((item) => {
                                    return <MenuItem key={item.label} icon={item.icon} active={item.link === currentLocation}>
                                        {item.label}
                                        <Link to={item.link} />
                                    </MenuItem>
                                })
                            }
                        </SubMenu>
                    }
                    return <MenuItem key={item.label} icon={item.icon} active={item.link === currentLocation}>
                        {item.label}
                        <Link to={item.link} />
                    </MenuItem>
                })
            }
        </Menu>
    </ProSidebar>;
}

export default Sidebar;