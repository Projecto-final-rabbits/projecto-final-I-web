import { Stack, Typography } from "@mui/material";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Stack
      sx={{
        backgroundColor: "primary.main",
        height: "7rem",
      }}
    >
      <Typography variant="body1" color="white">
        {`© ${currentYear} Sistema de Inventario`}
      </Typography>
    </Stack>
  );
};

export { Footer };
