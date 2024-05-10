import Login from "@/app/components/Login";
import React from "react";
import {useAuth} from "@/app/contexts/AuthContext";
import {redirect} from "next/navigation";
import NavbarItem from "../navbar-item";

export function Homepage(): React.ReactElement {
    const { state, login, logout } = useAuth();

    const navbar: NavbarItem[] = [
        {
          name: "Inicio",
          href: "/",
        } as NavbarItem,
        {
          name: "Crear Grupo",
          href: "/creategroup",
        } as NavbarItem,
        {
            name: "Ver Grupos",
            href: "/viewgroups",
          } as NavbarItem,
      ];

    return (
        <main className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-6xl font-bold">Cuentas Claras App</h1>
            <p className="mt-3 text-2xl">
                Aplicación de control de gastos personales
            </p>
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
                <Login onLogin={login} onSignUp={() => console.log('Sign up logic here')} />
            )}
        </main>
    );
}