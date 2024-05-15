import React, { useState } from 'react';
import { TextField } from "@mui/material";

interface SpendingAddModalProps {
    groupId: string;
    onClose: () => void;
    onAdd: (spending: { description: string; amount: number }) => void;
}

const SpendingAddModal = ({ groupId, onClose, onAdd }: SpendingAddModalProps) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const handleAdd = () => {
        const amountValue = parseFloat(amount);
        if (description.trim() === '' || isNaN(amountValue)) {
            alert('Ingresar una descripcion y monto valido');
            return;
        }
        onAdd({ description, amount: amountValue });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Añadir Nuevo Gasto</h3>
                    <div className="mt-2 px-7 py-3">
                        <TextField
                            label="Descripción"
                            variant="outlined"
                            fullWidth
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <TextField
                            label="Monto"
                            variant="outlined"
                            fullWidth
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            type="number"
                            className="mt-3"
                        />
                    </div>
                    <div className="items-center px-4 py-3">
                        <button onClick={handleAdd}
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

export default SpendingAddModal;
