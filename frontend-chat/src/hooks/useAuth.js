import { useContext } from "react";
import AuthContext from "../context/authContext";
import * as authService from "../services/authService";
import socket from "../utils/socket";

const useAuth = () => {
  const { user, setUser, loading } = useContext(AuthContext);

  const login = async (email, password) => {
    try {
      const res = await authService.login(email, password);
      setUser(res.user);
      socket.connect();
      socket.emit("authenticate", res.token); // Enviar token al servidor

    } catch (error) {
      console.error(
        "Error en el login:",
        error.response?.data || error.message
      );
    }
  };

  const register = async (email, password) => {
    try {
      await authService.register(email, password);
      await login(email, password);
    } catch (error) {
      console.error(
        "Error en el registro:",
        error.response?.data || error.message
      );
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    socket.disconnect();
  };

  return { user, loading, login, register, logout };
};

export default useAuth;
