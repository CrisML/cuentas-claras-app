// components/Login.tsx
import { useState } from 'react';
interface LoginProps {
    onLogin: (email: string, password: string) => void;
    onSignUp: () => void;
}

export default function Login({ onLogin, onSignUp }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="flex flex-col items-center pt-10 min-h-screen">
            <h2 className="text-3xl font-bold mb-4">Iniciar Sesión</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onLogin(email, password);
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
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Iniciar Sesión
                </button>
            </form>
            <button onClick={onSignUp} className="mt-4 text-blue-500 hover:underline">
                Registrarse
            </button>
        </div>
    );
}