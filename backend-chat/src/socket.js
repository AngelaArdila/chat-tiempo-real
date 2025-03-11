const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const chatUser = require("./models/chatUsersOrm"); // ✅ Corregido
const { secret } = require("./config/jwtConfig");

function configureSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado:", socket.id);

    // Evento de autenticación
    socket.on("authenticate", (token) => {
      try {
        const decoded = jwt.verify(token, secret);
    
        socket.user = decoded;
       
        console.log(`Usuario autenticado: ${decoded.email}`);
      } catch (error) {
        console.log("Token inválido:", error.message);
        socket.disconnect();
      }
    });

    // Manejo de envío de mensajes
    socket.on("sendMessage", async (data) => {
      if (!socket.user) {
        return socket.emit("error", "Usuario no autenticado");
      }

      try {
        const newMessage = await chatUser.create({ // ✅ Cambio de ChatUser a chatUser
          user_id: socket.user.id, // ✅ Asegúrate de que el ID del usuario es correcto
          message: data.message,
        });

        console.log(`Mensaje guardado en la base de datos: ${newMessage.message}`);

        io.emit("receiveMessage", {
          user: socket.user.email,
          message: newMessage.message,
        });

      } catch (error) {
        console.error("Error al guardar el mensaje:", error);
      }
    });

    // Manejo de desconexión
    socket.on("disconnect", () => {
      console.log("Usuario desconectado:", socket.id);
    });
  });
}

module.exports = configureSocket;