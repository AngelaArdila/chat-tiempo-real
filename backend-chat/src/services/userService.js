const bcrypt = require("bcryptjs"); //para encriptar contraseña
const User = require("../models/userOrm");


const registerUser = async (email, password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  return await User.create({ email, password: hashedPassword });
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return null;

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) return null; // Contraseña incorrecta

  return user; // Usuario autenticado correctamente
};



module.exports = { registerUser, loginUser};
