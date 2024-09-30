"use client";

import { useRouter } from "next/navigation"; // Usa useRouter en lugar de router de 'next/router'
import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter(); // Inicializa useRouter

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");  // Limpiamos el mensaje de error antes de la solicitud
    setSuccess(false);  // Reseteo el success para evitar mostrar mensajes anteriores

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Si la respuesta no es OK, lanzamos un error
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el registro");
      }

      // Si todo sale bien, mostramos el mensaje de éxito
      setSuccess(true);
      // Redirigimos al login
      router.push('/login');
    } catch (err: any) {
      // Si ocurre algún error, lo mostramos
      setError(err.message || "No se pudo conectar con el servidor.");
    } finally {
      setLoading(false); // Detenemos el estado de carga
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-3xl mb-8">Registro de Usuario</h1>
      {/* Mensaje de éxito solo si success es true */}
      {success && <p className="text-green-500">Usuario registrado con éxito!</p>}
      {/* Mensaje de error solo si hay un mensaje de error */}
      {error && <p className="text-red-500">{error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded-md w-full text-black"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded-md w-full text-black"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 rounded-md w-full text-black"
          required
        />
        <button
          type="submit"
          className="buttonOne"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}
