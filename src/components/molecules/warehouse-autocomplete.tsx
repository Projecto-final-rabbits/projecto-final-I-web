import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useFormContext, Controller } from "react-hook-form";
import { useGetWarehousesQuery } from "@/state-managment/slices/warehouse-slice";
import { useTranslation } from "react-i18next";

type WarehouseAutocompleteProps = {
  name: string;
  disabled?: boolean;
  title?:
    | "products.warehouse"
    | "products.fromWarehouse"
    | "products.toWarehouse";
};

const WarehouseAutocomplete: React.FC<WarehouseAutocompleteProps> = ({
  name,
  disabled = false,
  title = "products.warehouse",
}) => {
  const { t } = useTranslation();
  const { data: warehouses, isLoading, error } = useGetWarehousesQuery();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  if (isLoading) return <p>{t("common.loading")}</p>;
  if (error)
    return (
      <p>{t("common.errorLoading", { resource: t("products.warehouses") })}</p>
    );

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
              label={t(title)}
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
