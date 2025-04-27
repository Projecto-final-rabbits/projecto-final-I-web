import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useGetProvidersQuery } from "@/state-managment/slices";
import { useFormContext, Controller } from "react-hook-form";

type ProviderAutocompleteProps = {
  name: string;
  disabled?: boolean;
};

const ProviderAutocomplete: React.FC<ProviderAutocompleteProps> = ({
  name,
  disabled = false,
}) => {
  const { data: providers, isLoading, error } = useGetProvidersQuery();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading providers</p>;

  const providerOptions =
    providers?.map(({ id, nombre }) => ({
      label: nombre,
      id: id,
    })) || [];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          options={providerOptions}
          getOptionLabel={(option) => option?.label || ""}
          size="small"
          fullWidth
          value={
            value
              ? providerOptions.find((option) => option.id === value) || null
              : null
          }
          onChange={(_, newValue) => {
            onChange(newValue ? newValue.id : null);
          }}
          disabled={disabled}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Fabricante"
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

export { ProviderAutocomplete };
