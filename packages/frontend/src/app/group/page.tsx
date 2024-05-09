"use client";

import React, { useState } from "react";
import { CreateGroupRequest } from "@common/api/types";
import { config } from '@/utils/config';

export default function GroupCreationScreen(): React.ReactElement {
    const [groupName, setGroupName] = useState("");

    const handleGroupNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(event.target.value);
    };

    const handleCreateGroup = async () => {
        try {
            console.log('Empezando creacion de grupo front')
            //let token = localStorage.getItem("token") as string
            const createRequest: CreateGroupRequest = {/*token,*/ name: groupName };
            const response = await fetch(`${config.apiUrl}/api/groups/spendings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(createRequest)
            });

            console.log('Hice Post')

            if (!response.ok) {
                throw new Error('Group Creation failed!');
            }

            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.log('Error creacion de grupo (front)')
            console.log(error)
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h2 className="text-3xl font-bold">Crear Grupo</h2>
            <input
                type="text"
                value={groupName}
                onChange={handleGroupNameChange}
                placeholder="Nombre del Grupo"
                className="mt-4 px-4 py-2 border border-gray-300 rounded"
            />
            <button onClick={handleCreateGroup} className="mt-4 px-4 py-2 rounded bg-blue-500 text-white">
                Crear Grupo
            </button>
        </div>
    );
}