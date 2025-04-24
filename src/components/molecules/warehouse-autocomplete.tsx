import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useFormContext, Controller } from "react-hook-form";
import { useGetWarehousesQuery } from "@/state-managment/slices/warehouse-slice";

type WarehouseAutocompleteProps = {
  name: string;
  disabled?: boolean;
};

const WarehouseAutocomplete: React.FC<WarehouseAutocompleteProps> = ({
  name,
  disabled = false,
}) => {
  const { data: warehouses, isLoading, error } = useGetWarehousesQuery();
  console.log("warehouses", warehouses);
  const {
    control,
    formState: { errors },
  } = useFormContext();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading providers</p>;

  const warehouseOptions =
    warehouses?.map(({ id, nombre }) => ({
      label: nombre,
      id: id,
    })) || [];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          options={warehouseOptions}
          getOptionLabel={(option) => option?.label || ""}
          size="small"
          fullWidth
          value={
            value
              ? warehouseOptions.find((option) => option.id === value) || null
              : null
          }
          onChange={(_, newValue) => {
            onChange(newValue ? newValue.id : null);
          }}
          disabled={disabled}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Bodega"
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

export { WarehouseAutocomplete };
