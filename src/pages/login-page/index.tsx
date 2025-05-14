import { Box, Typography, Button, Divider, Stack } from "@mui/material";
import { Footer, LoginForm, LoginImage } from "./components";
import { useTranslation } from "react-i18next";

const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{ height: "100vh", width: "100%" }}
    >
      <Box
        sx={{
          minWidth: "40%",
          maxWidth: "50%",
          m: "auto",
          paddingInline: "10rem",
        }}
      >
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold">
            {t("login.title")}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t("login.welcome")}
          </Typography>

          <Stack spacing={2} mt={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={
                <img
                  src="/google-icon.png"
                  alt="Google"
                  style={{ width: "19px", height: "18px" }}
                />
              }
            >
              {t("login.googleSignIn")}
            </Button>

            <Divider>{t("common.or")}</Divider>

            <LoginForm />
          </Stack>
        </Box>

        <Footer />
      </Box>

      <LoginImage />
    </Stack>
  );
};

export { LoginPage };
