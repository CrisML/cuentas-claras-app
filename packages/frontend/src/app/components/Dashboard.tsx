import React from "react";

interface DashboardProps {
    onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
    return (<div>
        <h2>Bienvenido a tu Dashboard</h2>
        <button onClick={onLogout} className="px-4 py-2 rounded bg-red-500 text-white">
            Cerrar Sesión
        </button>
    </div>
    );
}