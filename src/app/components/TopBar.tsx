"use client";

import { faBars, faBell, faLongArrowAltLeft, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './TopBar.module.css';
import { useState } from "react";
import { useRouter } from "next/navigation"; // Cambiar a next/navigation

export default function TopBar({ showBarsIcon = true, showArrowIcon = true }) {
    const router = useRouter();
    const [showDropdown, setShowDropdown] = useState(false); // Estado para mostrar u ocultar el menú
    
    // Obtener el objeto de usuario desde localStorage
    const user = JSON.parse(localStorage.getItem("user") || '{}');
    const userId = user.id; // Acceder al ID del usuario

    const handleDeleteUser = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/delete/${userId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Usuario eliminado con éxito.");
                localStorage.clear(); // Borrar el caché después de eliminar el usuario
                router.push("/"); // Redirigir a la página principal
            } else {
                alert("Error al eliminar el usuario.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo conectar con el servidor.");
        }
    };

    const handleLogout = () => {
        localStorage.clear(); // Limpiar el caché
        router.push("/"); // Redirigir a la página principal
    };

    return (
        <div className={styles.container}>
            <div className={styles.icons}>
                {showBarsIcon && (
                    <FontAwesomeIcon icon={faBars} style={{ color: "#ffffff", width: "20px" }} />
                )}
                {showArrowIcon && (
                    <FontAwesomeIcon 
                        icon={faLongArrowAltLeft} 
                        style={{ color: "#ffffff", width: "20px" }} 
                        onClick={() => router.push("/breweries")} 
                    />
                )}
            </div>
            <div className={styles.icons}>
                <FontAwesomeIcon icon={faBell} style={{ color: "#ffffff", width: "20px" }} />
                <div className={styles.userIconContainer}>
                    <FontAwesomeIcon 
                        icon={faUserAlt} 
                        style={{ color: "#ffffff", width: "20px" }} 
                        onClick={() => setShowDropdown(!showDropdown)} // Mostrar u ocultar el menú
                    />
                    {showDropdown && (
                        <div className={styles.dropdown}>
                            <button onClick={handleDeleteUser}>Eliminar usuario</button>
                            <button onClick={handleLogout}>Cerrar sesión</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
