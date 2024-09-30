"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-8">Bienvenido</h1>
      <div className="space-y-4">
        <button
        
        className="buttonOne"
          onClick={() => router.push("/register")}
        >
          Registrarse
        </button>
        <button
          className="buttonTwo"
          onClick={() => router.push("/login")}
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}
