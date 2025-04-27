import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useFormContext, Controller } from "react-hook-form";
import { COUNTRIES } from "@/utils/countries";

type CountryAutocompleteProps = {
  name: string;
  disabled?: boolean;
};

const CountryAutocomplete: React.FC<CountryAutocompleteProps> = ({
  name,
  disabled = false,
}) => {
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
              label="Pais"
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
