const {getAllMessages } = require("../services/chatService");

const getMessages = async (req, res) => {
    try {
        const messages = await getAllMessages();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };
 
  module.exports = {getMessages};