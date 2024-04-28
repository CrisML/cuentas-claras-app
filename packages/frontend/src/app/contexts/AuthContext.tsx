import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { config } from '../../utils/config';

interface AuthState {
    isLoggedIn: boolean;
    isLoginPending: boolean;
    loginError: Error | null;
}

interface AuthContextType {
    state: AuthState;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const initialState: AuthState = {
    isLoggedIn: false,
    isLoginPending: false,
    loginError: null
};

export const AuthContext = createContext<AuthContextType>({
    state: initialState,
    login: () => {},
    logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState(initialState);

    const setLoginPending = (isLoginPending: boolean) => setState(prevState => ({ ...prevState, isLoginPending }));
    const setLoginSuccess = (isLoggedIn: boolean) => setState(prevState => ({ ...prevState, isLoggedIn, isLoginPending: false }));
    const setLoginError = (loginError: Error | null) => setState(prevState => ({ ...prevState, loginError, isLoginPending: false }));

    const login = async (email: string, password: string) => {
        setLoginPending(true);
        setLoginSuccess(false);
        setLoginError(null);

        try {
            const response = await fetch(`${config.apiUrl}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Login failed!');
            }

            const data = await response.json();
            setLoginSuccess(true);
            localStorage.setItem('token', data.token);
        } catch (error) {
            setLoginError(new Error('Invalid email and password'));
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setState({...initialState});
    };

    // Attempt to re-authenticate with the token from local storage on app load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoginSuccess(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);