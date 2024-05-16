import { useState } from 'react';

interface SignupProps {
    onSignUp: (email: string, password: string, spendingLimit: number) => void;
    toggleSignUp: () => void;
}

export default function Signup({ onSignUp, toggleSignUp }: SignupProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [spendingLimit, setSpendingLimit] = useState(0);

    return (
        <div className="flex flex-col items-center pt-10 min-h-screen">
            <h2 className="text-3xl font-bold mb-4">Registrarse</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSignUp(email, password, spendingLimit);
                }}
                className="flex flex-col space-y-3"
            >
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Usuario"
                    className="p-2 border rounded"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    value={spendingLimit}
                    onChange={(e) => setSpendingLimit(Number(e.target.value))}
                    placeholder="Limite de gastos"
                    className="p-2 border rounded"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Registrarse
                </button>
            </form>
            <button onClick={toggleSignUp} className="mt-4 text-blue-500 hover:underline">
                Ya tengo cuenta
            </button>
        </div>
    );
}
