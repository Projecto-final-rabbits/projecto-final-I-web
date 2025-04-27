import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useGetProductsQuery } from "@/state-managment/slices";
import { useFormContext, Controller } from "react-hook-form";

type ProductAutocompleteProps = {
  name: string;
  disabled?: boolean;
};

const ProductAutocomplete: React.FC<ProductAutocompleteProps> = ({
  name,
  disabled = false,
}) => {
  const { data: products, isLoading, error } = useGetProductsQuery({});
  const {
    control,
    formState: { errors },
  } = useFormContext();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading providers</p>;

  const productOptions =
    products?.map(({ id, nombre }) => ({
      label: nombre,
      id: id,
    })) || [];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          options={productOptions}
          getOptionLabel={(option) => option?.label || ""}
          size="small"
          fullWidth
          value={
            value
              ? productOptions.find((option) => option.id === value) || null
              : null
          }
          onChange={(_, newValue) => {
            onChange(newValue ? newValue.id : null);
          }}
          disabled={disabled}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Producto"
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

export { ProductAutocomplete };
