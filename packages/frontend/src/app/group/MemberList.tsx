import React, {useEffect, useState} from 'react';
import {Member} from "@common/api/types";
import MemberAddModal from './MemberAddModal';
import {config} from "@/utils/config"; // Asumiendo que tienes un componente para el modal

interface MembersListProps {
    members: Member[];
    groupId: string;
}

const MembersList = ({ members, groupId }: MembersListProps) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    const addNewMemberQuery = async (groupMember: Member) => {
        try {
            console.log(`Agregando un nuevo miembro al grupo con id: ${groupId}, miembro: ${groupMember}`);
            const url = `${config.apiUrl}/api/groups/${groupId}/members`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(groupMember)
            });

            if (!response.ok) {
                throw new Error('No se pudo agregar el miembro al grupo');
            }

            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.error('Error al obtener grupo')
        }
    };

    const addNewMember = (groupMember: Member) => {
        if (groupMember === null) {
            alert('Error al agregar miembro');
            return;
        }
        void addNewMemberQuery(groupMember);
    };

    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Miembros:</h3>
            <ul className="list-disc list-inside bg-white rounded-lg p-3 shadow">
                {members.map(member => (
                    <li key={member.user_id} className="py-1 border-b last:border-b-0">{member.username}</li>
                ))}
            </ul>
            <button onClick={toggleModal} className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Añadir Miembro
            </button>
            {isModalOpen && <MemberAddModal groupId={groupId} onAdd={addNewMember} onClose={toggleModal} />}
        </div>
    );
};

export default MembersList;
