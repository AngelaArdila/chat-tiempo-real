const ChatUser = require("../models/chatUsersOrm");
const { Op } = require("sequelize");

const cleanOldMessages = async () => {
  try {
    const totalMessages = await ChatUser.count();

    if (totalMessages > 20) {
      const oldestMessages = await ChatUser.findAll({
        order: [["created_at", "ASC"]],
        limit: totalMessages - 20, // Solo elimina los mensajes extra
      });

      const idsToDelete = oldestMessages.map(msg => msg.id);

      if (idsToDelete.length > 0) {
        await ChatUser.destroy({ where: { id: { [Op.in]: idsToDelete } } });
        console.log(`🔥 Eliminados ${idsToDelete.length} mensajes antiguos.`);
      }
    }
  } catch (error) {
    console.error("❌ Error al limpiar mensajes antiguos:", error);
  }
};

module.exports = cleanOldMessages;