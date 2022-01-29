import React, { createContext, useEffect, useReducer } from 'react';
import axios, { setSession } from '../../api/axios';
import {
    useLocation
} from 'react-router-dom';
import qs from 'qs';
import { AUTH_API_URL } from '../constants/environment';
import { isValidToken } from '../utilities/auth-utilities';
import { prefetchViews } from '../utilities/react-utilities';
import Loader from '../../components/Loader/Loader';
import { getCompanyDetailAction } from '../../redux/actions/companydetailsAction';
import { useDispatch } from 'react-redux';

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => { }
})

export const AuthProvider = ({ children }) => {

    const location = useLocation();
    const queryString = qs.parse(location.search, { ignoreQueryPrefix: true });

    const [state, dispatch] = useReducer(reducer, initialState)
    const storeDispatch = useDispatch();

    const login = async (code) => {
        const response = await fetch(`${AUTH_API_URL}/auth/code`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                code,
            })
        }).then((res) => res.json());

        const { access_token, refresh_token } = response;
        const user = {
            id: 1,
            role: 'SA',
            name: 'Jason Alexander',
            username: 'jason_alexander',
            email: 'jason@ui-lib.com',
            avatar: '/assets/images/face-6.jpg',
            age: 25,
        }
        const accessToken = access_token;
        const refreshToken = refresh_token;
        setSession(accessToken, refreshToken)

        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        })
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
        window.location.href = `${AUTH_API_URL}/login`;
    }

    useEffect(() => {
        (async () => {
            try {

                if (queryString.code) {
                    await login(queryString.code);
                }

                prefetchViews();
                const accessToken = window.localStorage.getItem('accessToken')
                const refreshToken = window.localStorage.getItem('refreshToken')

                if (refreshToken && isValidToken(refreshToken)) {
                    setSession(accessToken, refreshToken);
                    const response = await axios.get(`${AUTH_API_URL}/auth/currentuser`)
                    const userData = response.data;
                    const user = {
                        id: userData.id,
                        role: userData.role,
                        name: `${userData.firstName} ${userData.lastName}`,
                        username: userData.email,
                        email: userData.email,
                        avatar: '/assets/images/face-6.jpg',
                        age: 25,
                    }
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    })
                    storeDispatch(getCompanyDetailAction());
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <Loader />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
