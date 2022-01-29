import React from 'react';
import { IconButton } from "@mui/material";
import { MenuItem, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const HeaderUserName = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const user = {}, logout = () => { };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        logout();
    }

    return (
        <div>
            <div>
                {user?.name}
                <IconButton aria-controls="username-menu" aria-haspopup="true" onClick={handleClick}>
                    <ExpandMoreIcon />
                </IconButton>
            </div>
            <Menu
                id="username-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                elevation={1}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <PersonIcon /> Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <PowerSettingsNewIcon />
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
}

const viewTitleMap = {
    '/home': 'Home',
    '/control-room': 'Control Tower',
    '/crm': 'CRM',
    '/shipment': 'Shipments',
    '/quotations': 'Quotations',
    '/capacity-planning': 'Capacity Planning',
    '/automation': 'Automation',
    '/contract-management': 'Contract Management',
    '/document': 'Document',
    '/schedule': 'Schedule',
    '/trackandtrace': 'Track and trace',
    '/settings': 'Settings',
}

const Header = ({ toggleCollapsed, currentLocation }) => <div className="header">
    <div className="header-menu">
        <IconButton onClick={toggleCollapsed}>
            <MenuIcon color="primary" />
        </IconButton>
        <h3 className="header-page-title">{viewTitleMap[currentLocation]}</h3>
    </div>
    <div className="header-action-bar">
        <div className="header-action-bar-user">
            <HeaderUserName />
        </div>
    </div>
</div>
export default Header;