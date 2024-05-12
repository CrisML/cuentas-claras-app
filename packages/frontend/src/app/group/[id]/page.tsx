"use client";
import React, {useState, useEffect} from "react";
import {config} from "@/utils/config";
import {GroupMember, SpendingGroup} from "@common/api/types";

function groupPage({ params }: { params: { id: string } }): React.ReactElement {
    const [groupInfo, setGroupInfo] = React.useState<SpendingGroup | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const handleGetGroupInfo = async () => {
        try {
            console.log('Obteniendo la información del grupo con id: ' + params.id)
            const url = `${config.apiUrl}/api/groups/spendings/${params.id}`;
            // const queryParam = new URLSearchParams({group_id: params.id}).toString();
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('No existe o no esta permitido acceder al grupo con id: ' + params.id);
            }

            const data = await response.json();
            console.log(data)
            setGroupInfo(data);
        } catch (error) {
            console.error('Error al obtener grupo')
            setError('No se pudo cargar la información del grupo.');
        }
    };

    useEffect(() => {
        handleGetGroupInfo().finally(() => setLoading(false));
    }, []);


    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Group Page with ID: {params.id}</h1>
            {loading ? (
                <div className="text-center mt-5">Cargando...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : groupInfo ? (
                <div>
                    <h2 className="text-lg font-semibold mt-3">Nombre del Grupo: {groupInfo.name}</h2>
                    <div className="mt-2">
                        <h3 className="text-md font-semibold">Miembros del Grupo:</h3>
                        <ul>
                            {groupInfo.members?.map((member: GroupMember) => (
                                <li key={member._id.toString()} className="mt-1">{member.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <div>No se encontró información del grupo.</div>
            )}
        </div>
    );
}

export default groupPage;