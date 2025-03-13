const User = require("../models/userOrm");
const ChatUser =require ("../models/chatUsersOrm");


const getAllMessages = async () => {
    try {
        const messages = await ChatUser.findAll({
            attributes: ["message"], // Solo obtener el mensaje
            include: {
                model: User,
                attributes: ["email"], // Solo obtener el email del usuario
            },
            order: [["created_at", "ASC"]],
        });
  
        return messages.map((msg) => ({
            message: msg.message,
            email: msg.User ? msg.User.email : "Usuario desconocido",
        }));
    } catch (error) {
        console.error("Error al obtener mensajes:", error);
        throw new Error("Error al obtener los mensajes.");
    }
  };

  module.exports = {getAllMessages};
  