import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useFormContext, Controller } from "react-hook-form";

const MovementTypeOptions = [
  { label: "Entrada", id: "entrada" },
  { label: "Salida", id: "salida" },
  { label: "Traslado", id: "traslado" },
];

type MovementTypeAutocompleteProps = {
  name: string;
  disabled?: boolean;
};

const MovementTypeAutocomplete: React.FC<MovementTypeAutocompleteProps> = ({
  name,
  disabled = false,
}) => {
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
              label="Tipo de Movimiento"
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
