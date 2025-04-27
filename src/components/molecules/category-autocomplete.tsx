import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useFormContext, Controller } from "react-hook-form";
import { CATEGORIES } from "@/utils/categories";

type CategoryAutocompleteProps = {
  name: string;
  disabled?: boolean;
};

const CategoryAutocomplete: React.FC<CategoryAutocompleteProps> = ({
  name,
  disabled = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const categoryOptions =
    CATEGORIES?.map(({ name }) => ({
      label: name,
      id: name,
    })) || [];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          options={categoryOptions}
          getOptionLabel={(option) => option?.label || ""}
          size="small"
          fullWidth
          value={
            value
              ? categoryOptions.find((option) => option.id === value) || null
              : null
          }
          onChange={(_, newValue) => {
            onChange(newValue ? newValue.id : null);
          }}
          disabled={disabled}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Categoría"
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

export { CategoryAutocomplete };
