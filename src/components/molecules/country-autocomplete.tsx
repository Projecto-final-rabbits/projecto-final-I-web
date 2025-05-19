import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useFormContext, Controller } from "react-hook-form";
import { COUNTRIES } from "@/utils/countries";
import { useTranslation } from "react-i18next";

type CountryAutocompleteProps = {
  name: string;
  disabled?: boolean;
};

const CountryAutocomplete: React.FC<CountryAutocompleteProps> = ({
  name,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const countryOptions =
    COUNTRIES?.map(({ es_name }) => ({
      label: es_name,
      id: es_name,
    })) || [];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          options={countryOptions}
          getOptionLabel={(option) => option?.label || ""}
          size="small"
          fullWidth
          value={
            value
              ? countryOptions.find((option) => option.id === value) || null
              : null
          }
          onChange={(_, newValue) => {
            onChange(newValue ? newValue.id : null);
          }}
          disabled={disabled}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("providers.country")}
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

export { CountryAutocomplete };
