import React, { useEffect, useState } from "react";
import { config } from '@/utils/config';
import { CreateGroupRequest } from "@common/api/types";

interface DashboardProps {
    onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
    let [groups, setGroups] = useState<CreateGroupRequest[]>([])

    let user = localStorage.getItem('user')!

    useEffect(() => {
        fetch(`${config.apiUrl}/api/groups/spendings?` + new URLSearchParams({
            username: user
        }), { method: 'GET'})
        .then(response => response.json())
        .then(data => setGroups(data))
    }, [])

    return (<div>
        <h2>Bienvenido a tu Dashboard</h2>
        <button onClick={onLogout} className="px-4 py-2 rounded bg-red-500 text-white">
            Cerrar Sesión
        </button>
        <div style={{marginTop: '10px'}}>
            <strong>TUS GRUPOS</strong>
            <ul>
                {groups.map(group => <li>{group.name}</li>)}
            </ul>
        </div>
    </div>
    );
}