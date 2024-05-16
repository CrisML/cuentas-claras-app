import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { config } from '@/utils/config';
import {LoginRequest, LoginResponse, SignupRequest} from "@common/api/types";

interface AuthState {
    isLoggedIn: boolean;
    isLoginPending: boolean;
    loginError: Error | null;
}

interface AuthContextType {
    state: AuthState;
    login: (email: string, password: string) => void;
    logout: () => void;
    handleSignUp: (email: string, password: string, spendingLimit: number) => void;
}

const initialState: AuthState = {
    isLoggedIn: false,
    isLoginPending: false,
    loginError: null
};

export const AuthContext = createContext<AuthContextType>({
    state: initialState,
    login: () => {},
    logout: () => {},
    handleSignUp: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState(initialState);

    const setLoginPending = (isLoginPending: boolean) => setState(prevState => ({ ...prevState, isLoginPending }));
    const setLoginSuccess = (isLoggedIn: boolean) => setState(prevState => ({ ...prevState, isLoggedIn, isLoginPending: false }));
    const setLoginError = (loginError: Error | null) => setState(prevState => ({ ...prevState, loginError, isLoginPending: false }));

    const login = async (username: string, password: string) => {
        setLoginPending(true);
        setLoginSuccess(false);
        setLoginError(null);

        try {
            const loginRequest: LoginRequest = { username: username, password };
            const response = await fetch(`${config.apiUrl}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginRequest)
            });

            if (!response.ok) {
                throw new Error('Login failed!');
            }

            const data: LoginResponse = await response.json();
            setLoginSuccess(true);
            console.log(data);
            localStorage.setItem('token', data.token as string);
            localStorage.setItem('user_id', data.user_id as string);
        } catch (error) {
            setLoginError(new Error('Invalid username and password'));
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        setState({...initialState});
    };

    const handleSignUp = async (username: string, password: string, spendingLimit: number) => {
        try {
            const signUpRequest: SignupRequest = {
                username: username, 
                password,
                name: '',
                spending_limit: spendingLimit
            };
            const response = await fetch(`${config.apiUrl}/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signUpRequest)
            });
    
            if (!response.ok) {
                throw new Error('Signup failed!');
            }
    
            const data = await response.json();
            console.log(data);
            setLoginSuccess(true);
            localStorage.setItem('token', data.token as string);
            localStorage.setItem('user_id', data.user_id as string);
        } catch (error) {
            setLoginError(new Error('Failed to sign up'));
        }
    };
    

    // Attempt to re-authenticate with the token from local storage on app load
    useEffect(() => {
        const token = localStorage.getItem('token');
        const user_id = localStorage.getItem('user_id')
        if (token && user_id) {
            setLoginSuccess(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ state, login, logout, handleSignUp }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);