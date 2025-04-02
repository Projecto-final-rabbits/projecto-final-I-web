import { Box } from "@mui/material";

const LoginImage: React.FC = () => (
  <Box
    sx={{
      flex: 1,
      bgcolor: "primary.main",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      maxWidth: "60%",
      minWidth: "50%",
    }}
  >
    <Box
      component="img"
      src="/login-image.png"
      alt="Distribuidora de productos"
      sx={{
        objectFit: "cover",
        width: "85%",
      }}
    />
  </Box>
);

export { LoginImage };
