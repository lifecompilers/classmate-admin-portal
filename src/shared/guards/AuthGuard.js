import React, {
    useEffect,
    useState,
} from 'react'
import { useLocation } from 'react-router-dom';
import { AUTH_API_URL } from '../constants/environment';
import useAuth from '../hooks/useAuth';

const AuthGuard = ({ children }) => {
    const {
        isAuthenticated,
    } = useAuth()

    const [previouseRoute, setPreviousRoute] = useState(null);
    const { pathname } = useLocation();

    let authenticated = isAuthenticated;

    useEffect(() => {
        if (previouseRoute !== null) setPreviousRoute(pathname)
    }, [pathname, previouseRoute])

    if (authenticated) return <>{children}</>
    else {
        window.location.href = `${AUTH_API_URL}/login`;
        return null;
    }
}

export default AuthGuard
