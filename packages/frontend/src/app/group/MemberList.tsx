import React, { useState } from 'react';
import { Member } from "@common/api/types";
import MemberAddModal from './MemberAddModal';
import SpendingAddModal from './SpendingAddModal';
import { config } from "@/utils/config"; 

interface MembersListProps {
    members: Member[];
    spendings: { user_id: string; description: string; amount: number }[];
    groupId: string;
    updateMembers: () => void;
}

const MembersList = ({ members, spendings, groupId, updateMembers }: MembersListProps) => {
    const [isMemberModalOpen, setMemberModalOpen] = useState(false);
    const [isSpendingModalOpen, setSpendingModalOpen] = useState(false);

    const toggleMemberModal = () => {
        setMemberModalOpen(!isMemberModalOpen);
    };

    const toggleSpendingModal = () => {
        setSpendingModalOpen(!isSpendingModalOpen);
    };

    const addNewMemberQuery = async (groupMember: Member) => {
        try {
            
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

            await response.json();
        } catch (error) {
            console.error('Error al agregar miembro');
        }
    };

    const addNewMember = (groupMember: Member) => {
        if (!groupMember) {
            alert('Error al agregar miembro');
            return;
        }
        addNewMemberQuery(groupMember)
            .then(() => updateMembers())
            .finally(() => {
                setMemberModalOpen(false);
            });
    };

    const addNewSpendingQuery = async (spending: { description: string; amount: number }) => {
        try {
            const user_id = localStorage.getItem("user_id") as string;
            const url = `${config.apiUrl}/api/groups/${groupId}/spendings`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user_id, // Id de ejemplo, solucionar por el real, cambiando el back
                    description: spending.description,
                    amount: spending.amount
                })
            });

            if (!response.ok) {
                throw new Error('No se pudo agregar el gasto al grupo');
            }

            await response.json();
        } catch (error) {
            console.error('Error al agregar gasto');
        }
    };

    const addNewSpending = (spending: { description: string; amount: number }) => {
        if (!spending) {
            alert('Error al agregar gasto');
            return;
        }
        addNewSpendingQuery(spending)
            .then(() => updateMembers())
            .finally(() => {
                setSpendingModalOpen(false);
            });
    };

    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Miembros:</h3>
            <ul className="list-disc list-inside bg-white rounded-lg p-3 shadow">
                {members?.map(member => (
                    <li key={member.user_id} className="py-1 border-b last:border-b-0">{member.username}</li>
                ))}
            </ul>
            <button onClick={toggleMemberModal} className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Añadir Miembro
            </button>
            <button onClick={toggleSpendingModal} className="mt-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-3">
                Añadir Gasto
            </button>
            {isMemberModalOpen && <MemberAddModal groupId={groupId} onAdd={addNewMember} onClose={toggleMemberModal} />}
            {isSpendingModalOpen && <SpendingAddModal groupId={groupId} onAdd={addNewSpending} onClose={toggleSpendingModal} />}
            
            <h3 className="text-lg font-semibold mt-5 mb-2">Gastos:</h3>
            <ul className="list-disc list-inside bg-white rounded-lg p-3 shadow">
                {spendings?.map((spending, index) => (
                    <li key={index} className="py-1 border-b last:border-b-0">
                        Descripción: {spending.description}, Monto: ${spending.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MembersList;
