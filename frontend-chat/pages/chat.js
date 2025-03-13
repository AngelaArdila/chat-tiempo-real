import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAuth from "../src/hooks/useAuth";
import * as authService from "../src/services/authService";
import socket from "../src/utils/socket";
import ProtectedRoute from "../src/components/protectedRoute";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";

export default function ChatApp() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // ✅ Obtener mensajes previos del backend cuando se monte el componente
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const loadedMessages = await authService.AllMessages();
        setMessages(loadedMessages); // Guardar los mensajes anteriores en el estado
      } catch (error) {
        console.error("Error al obtener los mensajes:", error);
      }
    };

    fetchMessages();

    // ✅ Escuchar los mensajes entrantes en tiempo real
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;

    socket.emit("sendMessage", { message });
    setMessage("");
  };

  return (
    <ProtectedRoute>
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Chat en Tiempo Real
          </Typography>
          <Paper sx={{ p: 2, height: 400, overflowY: "auto" }}>
            <List>
              {messages.map((msg, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={msg.message}
                    secondary={`Enviado por: ${msg.email || msg.user}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
          <Box sx={{ display: "flex", mt: 2 }}>
            <TextField
              fullWidth
              label="Escribe un mensaje..."
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ ml: 2 }}
              onClick={sendMessage}
            >
              Enviar
            </Button>
          </Box>
          <Button
            variant="outlined"
            color="error"
            sx={{ ml: 2 }}
            onClick={() => {
              logout();
              router.push("/login");
            }}
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Container>
    </ProtectedRoute>
  );
}
