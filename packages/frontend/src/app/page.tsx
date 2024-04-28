'use client';
import Login from "@/app/components/Login";

function onLogin(email: string, password: string) {
  console.log(`Login with email: ${email} and password: ${password}`);
}

function onSignUp() {
  console.log('Sign up');
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold">Cuentas Claras App</h1>
      <p className="mt-3 text-2xl">
        Aplicación de control de gastos personales
      </p>
        <Login onLogin={onLogin} onSignUp={onSignUp}></Login>
    </main>
    );
}
