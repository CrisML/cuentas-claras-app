import React, {useEffect, useState} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import {config} from "@/utils/config";
import {TextField} from "@mui/material";
import {Member} from "@common/api/types";

interface MemberAddModalProps {
    groupId: string;
    onClose: () => void;
    onAdd: (member: Member) => void;
}

const MemberAddModal = ({ groupId, onClose, onAdd }: MemberAddModalProps) => {
    const [users, setUsers] = useState<Member[]>([]);
    const [selectedUser, setSelectedUser] = useState<Member | null>(null);

    useEffect(() => {
        void getUsersNotInGroup();
    }, []);

    const getUsersNotInGroup = async () => {
        try {
            const url = `${config.apiUrl}/api/groups/${groupId}/new-users`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de miembros');
            }
            const data = await response.json();
            setUsers(data);
            console.log(data);
        } catch (error) {
            console.error('Error al obtener la lista de miembros');
        }
    }
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Añadir Nuevo Miembro</h3>
                    <div className="mt-2 px-7 py-3">
                        <Autocomplete
                            options={users}
                            getOptionLabel={(option) => option.username}
                            onChange={(event, newValue) => {
                                setSelectedUser(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Buscar Miembro" variant="outlined" fullWidth />
                            )}
                        />
                    </div>
                    <div className="items-center px-4 py-3">
                        <button onClick={() => onAdd(selectedUser as Member)}
                                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Añadir
                        </button>
                    </div>
                </div>
                <div className="absolute top-0 right-0 cursor-pointer p-2" onClick={onClose}>
                    <svg className="w-6 h-6 text-gray-600 hover:text-gray-800" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default MemberAddModal;
