const express = require("express");
const {
  registerHandler,
  loginHandler,
  refreshToken,
  logout,
  verifyAuth,
  getMessages,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware"); // Middleware para verificar token

const router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/refresh_token", refreshToken);
router.post("/logout", logout);

// **Nuevo endpoint para verificar autenticación**

router.get("/me", authMiddleware, verifyAuth);



module.exports = router;
