const jwt = require("jsonwebtoken");

const { registerUser, loginUser } = require("../services/userService");

const User = require("../models/userOrm");

const {
  secret,
  refreshSecret,
  expiresIn,
  refreshExpiresIn,
} = require("../config/jwtConfig");

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar emails
  return emailRegex.test(email);
};

const registerHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email y contraseña son requeridos" });
    }

    // Validar el formato del email
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Formato de correo inválido" });
    }

    // Verificar si el correo ya está registrado antes de intentar crear un usuario
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ mensaje: "El usuario ya existe con este correo electrónico" });
    }

    const user = await registerUser(email, password);
    res.status(201).json({ message: "Usuario registrado con éxito", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email y contraseña son requeridos" });
    }

    const user = await loginUser(email, password);
    if (!user) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    // **Generar accessToken y refreshToken**
    const token = jwt.sign({ id: user.user_id, email: user.email }, secret, {
      expiresIn,
    });
    const refreshToken = jwt.sign({ id: user.user_id }, refreshSecret, {
      expiresIn: refreshExpiresIn,
    });

    // **Almacenar el refreshToken en una cookie segura**
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // Cambia a false si estás en desarrollo local sin HTTPS
      sameSite: "Strict", // Protege contra ataques CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });

    res.json({
      message: "Login exitoso",
      token,
      user: { id: user.user_id, email: user.email },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", details: error.message });
  }
};

// **Renovar el accessToken**
const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(400).json({ message: "Refresh token requerido" });

    jwt.verify(refreshToken, refreshSecret, (err, decoded) => {
      if (err)
        return res.status(401).json({ message: "Refresh token inválido" });

      // **Generar un nuevo accessToken**
      const newToken = jwt.sign(
        { id: decoded.id, email: decoded.email },
        secret,
        { expiresIn }
      );
      res.json({ token: newToken });
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", details: error.message });
  }
};

// **Logout para eliminar la cookie del refreshToken**
const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logout exitoso" });
};


// **Nuevo endpoint para verificar autenticación**
const verifyAuth = async (req, res) => {
  try {
      res.json({ message: "Usuario autenticado", user: req.user });
  } catch (error) {
      res.status(500).json({ error: "Error en el servidor", details: error.message });
  }
};

module.exports = { registerHandler, loginHandler, refreshToken, logout, verifyAuth };
