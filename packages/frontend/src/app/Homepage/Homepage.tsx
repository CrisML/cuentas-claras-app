import Login from "@/app/components/Login";
import React from "react";
import {useAuth} from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Dashboard from "@/app/components/Dashboard";
import Signup from "@/app/components/Signup";
import {redirect} from "next/navigation";

export function Homepage(): React.ReactElement {
    const { state, login, logout, handleSignUp } = useAuth();
    const [isSigningUp, setIsSigningUp] = React.useState(false);

    const toggleSignUp = () => setIsSigningUp(!isSigningUp);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-6xl font-bold">Cuentas Claras App</h1>
            <p className="mt-3 text-2xl">
                Aplicación de control de gastos personales
            </p>
            {state.isLoggedIn ? (
                <Dashboard onLogout={logout} />
            ) : isSigningUp ? (
                <Signup onSignUp={handleSignUp} toggleSignUp={toggleSignUp} />
            ) : (
                <Login onLogin={login} onSignUp={toggleSignUp} />
            )}
        </main>
     );
}