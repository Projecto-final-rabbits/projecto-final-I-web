import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useFormContext, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

type MovementTypeAutocompleteProps = {
  name: string;
  disabled?: boolean;
};

const MovementTypeAutocomplete: React.FC<MovementTypeAutocompleteProps> = ({
  name,
  disabled = false,
}) => {
  const { t } = useTranslation();

  const MovementTypeOptions = [
    { label: t("products.entrance"), id: "entrada" },
    { label: t("products.exit"), id: "salida" },
    { label: t("products.transfer"), id: "traslado" },
  ];

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          options={MovementTypeOptions}
          getOptionLabel={(option) => option?.label || ""}
          size="small"
          fullWidth
          value={
            value
              ? MovementTypeOptions.find((option) => option.id === value) ||
                null
              : null
          }
          onChange={(_, newValue) => {
            onChange(newValue ? newValue.id : null);
          }}
          disabled={disabled}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("products.movementType")}
              variant="outlined"
              error={!!errors[name]}
              helperText={errors[name]?.message?.toString()}
            />
          )}
        />
      )}
    />
  );
};

export { MovementTypeAutocomplete };
