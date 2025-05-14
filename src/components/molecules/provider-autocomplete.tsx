import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useGetProvidersQuery } from "@/state-managment/slices";
import { useFormContext, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

type ProviderAutocompleteProps = {
  name: string;
  disabled?: boolean;
};

const ProviderAutocomplete: React.FC<ProviderAutocompleteProps> = ({
  name,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const { data: providers, isLoading, error } = useGetProvidersQuery();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  if (isLoading) return <p>{t("common.loading")}</p>;
  if (error)
    return (
      <p>{t("common.errorLoading", { resource: t("providers.providers") })}</p>
    );

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
              label={t("providers.manufacturer")}
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
