import { createContext, useState, useEffect } from "react";
import * as authService from "../services/authService";
import socket from "../utils/socket";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Agregar loading

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticatedUser = await authService.getAuthenticatedUser();
        if (authenticatedUser) {
          setUser(authenticatedUser);
          socket.connect();
        }
      } catch (error) {
        console.error("Error en la autenticación:", error);
      } finally {
        setLoading(false); // ✅ Finaliza la carga cuando la autenticación se completa
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;