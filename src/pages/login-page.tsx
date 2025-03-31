// Login.tsx
import React from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  Link,
  Stack,
  Paper,
} from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";

const LoginPage: React.FC = () => (
  <Container sx={{ display: "flex", height: "100vh", p: 0 }}>
    <Box
      sx={{
        width: "545px",
        m: "auto",
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 2,
      }}
    >
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold">
          Inicio de sesión
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Bienvenido, inicia sesión para ver tus productos
        </Typography>

        <Stack spacing={2} mt={3}>
          <Button variant="outlined" fullWidth startIcon={<AppleIcon />}>
            Iniciar sesión con Apple
          </Button>
          <Button variant="outlined" fullWidth startIcon={<GoogleIcon />}>
            Iniciar sesión con Google
          </Button>

          <Divider>o</Divider>

          <TextField label="Email" variant="outlined" fullWidth size="small" />
          <Button variant="contained" fullWidth>
            Continuar
          </Button>

          <Button variant="text" fullWidth>
            Usar SSO/SAML
          </Button>

          <Stack spacing={1}>
            <Typography variant="body2" textAlign="center">
              Si aún no tienes una cuenta{" "}
              <Link href="#" underline="hover">
                Crear cuenta proveedores
              </Link>
            </Typography>
            <Typography variant="body2" textAlign="center">
              Si aún no tienes una cuenta{" "}
              <Link href="#" underline="hover">
                Crear cuenta vendedor
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Paper
        elevation={0}
        sx={{
          bgcolor: "#F4F4F5",
          p: 2,
          textAlign: "center",
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2024 CCP marca registrada
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" mt={1}>
          <Link
            href="#"
            underline="hover"
            variant="body2"
            color="text.secondary"
          >
            Términos y condiciones
          </Link>
          <Link
            href="#"
            underline="hover"
            variant="body2"
            color="text.secondary"
          >
            Privacidad
          </Link>
        </Stack>
      </Paper>
    </Box>

    <Box
      sx={{
        flex: 1,
        bgcolor: "#64748B",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        src="/image.png"
        alt="Login visual"
        sx={{ maxHeight: "960px", maxWidth: "100%", objectFit: "cover" }}
      />
    </Box>
  </Container>
);

export { LoginPage };
