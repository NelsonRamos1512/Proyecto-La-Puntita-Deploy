
export async function login(email, passw) {
    try {
        const response = await fetch("https://proyecto-pds-24-ii-production.up.railway.app/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                telefono: "000000000",   // Número de teléfono predeterminado
                email,                   // Correo electrónico ingresado por el usuario
                direccion: "Dirección de ejemplo",  // Dirección predeterminada
                referencia: "Ninguna",   // Referencia predeterminada
                passw,                   // Contraseña ingresada por el usuario
                dni: "12345678",         // DNI predeterminado
                nombre: "Nombre",        // Nombre predeterminado
                apellido: "Apellido"     // Apellido predeterminado
            }),
        });

        if (!response.ok) {
            throw new Error("Error en la autenticación");
        }

        const data = await response.json();
        console.log("Respuesta de la API:", data); // Imprime la respuesta para verificar los datos

        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error;
    }
}





