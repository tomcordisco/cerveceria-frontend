"use client";

import { useRouter } from 'next/navigation'; // Importa desde next/navigation
import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); // Ahora usa useRouter de next/navigation

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error('Error en la autenticación');
            }

            const data = await response.json();

            // Almacenar el token, el nombre y el email en localStorage
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('user', JSON.stringify({ id: data.id, name: data.name, email: data.email }));

            alert('Inicio de sesión exitoso');

            // Después del login exitoso redirigir a otra página
            router.push('/breweries'); // Redirige a una página protegida o principal
        } catch (error) {
            console.error('Error:', error);
            alert('Error al iniciar sesión. Por favor verifica tus credenciales.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4  ">
            <h1 className="text-3xl mb-8">Iniciar Sesión</h1>
            <form className="space-y-4" onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded-md w-full text-black"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded-md w-full text-black"
                />
                <button
                    type="submit"
                    className="buttonOne"
                >
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
}
