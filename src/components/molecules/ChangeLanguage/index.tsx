import { FormControlLabel, Switch, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export const ChangeLanguage = () => {
  const { t, i18n } = useTranslation();
  const [isEnglish, setIsEnglish] = useState(i18n.language === "en");

  useEffect(() => {
    const currentLang = i18n.language;
    setIsEnglish(currentLang === "en");
  }, [i18n.language]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLanguage = event.target.checked ? "en" : "es";
    i18n.changeLanguage(newLanguage);
    setIsEnglish(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={isEnglish}
          onChange={handleLanguageChange}
          color="secondary"
        />
      }
      label={
        <Typography variant="body2">
          {isEnglish ? t("common.english") : t("common.spanish")}
        </Typography>
      }
    />
  );
};
