const { Sequelize } = require("sequelize");
// Configurar la conexión a la base de datos con Sequelize
const sequelize = new Sequelize("chat_db_users", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false
});


// Sincronizar la base de datos
sequelize
  .sync()
  .then(() => console.log("Base de datos sincronizada"))
  .catch((error) => console.error("Error al sincronizar:", error));



module.exports = sequelize;
