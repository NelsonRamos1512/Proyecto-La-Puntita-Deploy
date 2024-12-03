import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
    const [userId, setUserId] = useState(null); // ID del usuario autenticado

    const logout = () => {
        setIsAuthenticated(false); // Cambiar estado de autenticación
        setUserId(null); // Limpia el ID de usuario
    };
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userId, setUserId,logout }}>
            {children}
        </AuthContext.Provider>
    );
}