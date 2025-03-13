const express = require("express");
const http = require("http"); // <-- Asegúrate de importar http

const app = express();
const port = 3001;
const cors = require("cors"); // <-- Importa CORS

const configureSocket = require("../socket"); // Importar el módulo de socket

const chatRoutes = require("../routes/chatRouter");
const userRoute = require("../routes/userRouter");
const cookieParser = require("cookie-parser"); // <-- Importa cookie-parser
require("../cronJob"); // 🔥 Inicia las tareas programadas en segundo plano
const server = http.createServer(app); // Servidor HTTP para Socket.io

// <-- Habilita CORS para evitar errores de red
app.use(
  cors({
    origin: "http://localhost:3000", // <-- Especifica el frontend permitido
    credentials: true, // <-- Permite el uso de cookies
  })
);

// Middleware para manejar JSON en las peticiones y Cookies**
app.use(express.json());
app.use(cookieParser()); // <-- Ahora las cookies estarán habilitadas en todas las rutas

// Usar las rutas de usuarios
app.use("/api/users", userRoute);
//ruta de chat
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Configurar WebSockets
configureSocket(server);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
