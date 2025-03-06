const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors"); // <-- Importa CORS

const userRoute = require("../routes/userRouter");
const cookieParser = require("cookie-parser"); // <-- Importa cookie-parser

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
