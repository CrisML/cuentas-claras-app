import React, { useState } from "react";
import Login from "@/app/components/Login";
import Signup from "@/app/components/Signup";
import { useAuth } from "@/app/contexts/AuthContext";
import NavbarItem from "../navbar-item";

export function Homepage(): React.ReactElement {
    const { state, login, logout, handleSignUp } = useAuth();
    const [isSigningUp, setIsSigningUp] = useState(false);

    const navbar: NavbarItem[] = [
        { name: "Inicio", href: "/" },
        { name: "Crear Grupo", href: "/creategroup" },
        { name: "Ver Grupos", href: "/viewgroups" },
    ];

    return (
        <main className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-6xl font-bold">Cuentas Claras App</h1>
            <p className="mt-3 text-2xl">Aplicación de control de gastos personales</p>
            {state.isLoggedIn ? (
                <div>
                    <nav className="flex flex-col">
                        <ul>
                            {navbar.map((item, index) => (
                                <li key={index}>
                                    <a href={item.href}>{item.name}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <button onClick={logout} className="px-4 py-2 rounded bg-red-500 text-white">
                        Cerrar Sesión
                    </button>
                </div>
            ) : (
                isSigningUp ? (
                    <Signup onSignUp={handleSignUp} toggleSignUp={() => setIsSigningUp(false)} />
                ) : (
                    <Login onLogin={login} onSignUp={() => setIsSigningUp(true)} />
                )
            )}
        </main>
    );
}
