import { RoleAutocomplete } from "@/components/molecules";
import { Role } from "@/core/domain/interfaces";
import { Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

type FieldsProps = {
  disabled?: boolean;
  role?: Role;
};

const Fields: React.FC<FieldsProps> = ({ disabled, role }) => {
  const { register, formState } = useFormContext();

  return (
    <Stack direction="column" spacing={2}>
      <TextField
        label="Nombre completo"
        variant="outlined"
        fullWidth
        disabled={disabled}
        data-testid="nombre-completo"
        size="small"
        {...register("fullname")}
        error={!!formState.errors.fullname}
      />
      {role && (
        <RoleAutocomplete
          name="role"
          disabled={disabled}
          data-testid="rol-autocomplete"
        />
      )}
      <TextField
        label="Correo electrónico"
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
