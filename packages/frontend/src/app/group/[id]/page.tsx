"use client";
import React, { useState, useEffect } from "react";
import { config } from "@/utils/config";
import { Group } from "@common/api/types";
import GroupLayout from "@/app/group/GroupLayout";
import GroupHeader from "@/app/group/GroupHeader";
import MembersList from "@/app/group/MemberList";

function groupPage({ params }: { params: { id: string } }): React.ReactElement {
    const [groupInfo, setGroupInfo] = useState<Group | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleGetGroupInfo = async () => {
        try {
            console.log('Obteniendo la información del grupo con id: ' + params.id);
            const url = `${config.apiUrl}/api/groups/${params.id}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('No existe o no está permitido acceder al grupo con id: ' + params.id);
            }

            const data = await response.json();
            console.log(data);
            setGroupInfo(data);
        } catch (error) {
            console.error('Error al obtener grupo');
            setError('No se pudo cargar la información del grupo.');
        }
    };

    useEffect(() => {
        handleGetGroupInfo().finally(() => setLoading(false));
    }, []);

    return (
        <GroupLayout>
            {loading ? (
                <div className="text-center mt-5">Cargando...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : groupInfo ? (
                <>
                    <GroupHeader groupName={groupInfo.name} />
                    <MembersList members={groupInfo.members} spendings={groupInfo.spendings} groupId={params.id} updateMembers={handleGetGroupInfo} />
                </>
            ) : (
                <div>No se encontró información del grupo.</div>
            )}
        </GroupLayout>
    );
}

export default groupPage;
