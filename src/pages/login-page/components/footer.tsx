import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";

const Footer: React.FC = () => (
  <Paper
    elevation={0}
    sx={{
      bgcolor: "background.gray",
      p: 2,
      borderTop: 1,
      borderColor: "divider",
      textAlign: "center",
      borderRadius: 0,
    }}
  >
    <Typography variant="body2" color="text.secondary">
      © 2025 CCP marca registrada
    </Typography>
    <Stack direction="row" spacing={2} justifyContent="center" mt={1}>
      <Typography
        component={Link}
        variant="body2"
        to="#"
        sx={{ textDecoration: "underline", color: "text.secondary" }}
      >
        Términos y condiciones
      </Typography>
      <Typography
        component={Link}
        variant="body2"
        to="#"
        sx={{ textDecoration: "underline", color: "text.secondary" }}
      >
        Privacidad
      </Typography>
    </Stack>
  </Paper>
);

export { Footer };
