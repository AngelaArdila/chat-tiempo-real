import { useRouter } from "next/router";
import { Container, Typography, Button, Box } from "@mui/material";

export default function Home() {
  const router = useRouter();

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          Chat en Tiempo Real
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Inicia sesión o regístrate para comenzar a chatear.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
            onClick={() => router.push("/login")}
          >
            Iniciar Sesión
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => router.push("/register")}
          >
            Registrarse
          </Button>
        </Box>
      </Box>
    </Container>
  );
}