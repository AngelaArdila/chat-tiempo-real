import axios from "axios";

const API_URL = "http://localhost:3001";

export const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/api/users/login`, {
    email,
    password,
  });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const register = async (email, password) => {
  await axios.post(`${API_URL}/api/users/register`, { email, password });
};

export const logout = async () => {
  await axios.post(`${API_URL}/api/users/logout`);
  localStorage.removeItem("token");
};

export const AllMessages = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/chat/messages`);
    return res.data; // Devuelve los mensajes recibidos desde el backend
  } catch (error) {
    console.error("Error al obtener los mensajes:", error);
    return [];
  }
};

export const getAuthenticatedUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const res = await axios.get(`${API_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.user;
  } catch {
    return null;
  }
};
