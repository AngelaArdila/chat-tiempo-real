const cron = require("node-cron");
const cleanOldMessages = require("./services/cleanMessageService");

// 🔄 Programar la limpieza cada 5 minutos
cron.schedule("*/5 * * * *", async () => {
  console.log("🕒 Ejecutando limpieza de mensajes...");
  await cleanOldMessages();
});