import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useFormContext, Controller } from "react-hook-form";
import { Role } from "@/core/domain/interfaces";
import { useTranslation } from "react-i18next";

type RoleAutocompleteProps = {
  name: string;
  disabled?: boolean;
};

type Common = {
  id: Role;
  nombre: string;
};

const ROLES: Common[] = [
  {
    id: "admin",
    nombre: "Admin",
  },
  {
    id: "bodega",
    nombre: "Logistica",
  },
  {
    id: "compras",
    nombre: "Compras",
  },
  {
    id: "ventas",
    nombre: "Ventas",
  },
];
const RoleAutocomplete: React.FC<RoleAutocompleteProps> = ({
  name,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const providerOptions =
    ROLES?.map(({ id, nombre }) => ({
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
              label={t("users.role")}
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

export { RoleAutocomplete };
