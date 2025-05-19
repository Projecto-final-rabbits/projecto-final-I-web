import { RoleAutocomplete } from "@/components/molecules";
import { Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

type FieldsProps = {
  disabled?: boolean;
  isAdmin?: boolean;
};

const Fields: React.FC<FieldsProps> = ({ disabled, isAdmin }) => {
  const { t } = useTranslation();
  const { register, formState } = useFormContext();

  return (
    <Stack direction="column" spacing={2}>
      <TextField
        label={t("users.fullName")}
        variant="outlined"
        fullWidth
        disabled={disabled}
        data-testid="nombre-completo"
        size="small"
        {...register("fullname")}
        error={!!formState.errors.fullname}
      />
      {isAdmin && (
        <RoleAutocomplete
          name="role"
          disabled={disabled}
          data-testid="rol-autocomplete"
        />
      )}
      <TextField
        label={t("users.email")}
        variant="outlined"
        fullWidth
        disabled={disabled}
        data-testid="correo-electronico"
        size="small"
        {...register("email")}
        error={!!formState.errors.email}
      />
    </Stack>
  );
};

export { Fields };
