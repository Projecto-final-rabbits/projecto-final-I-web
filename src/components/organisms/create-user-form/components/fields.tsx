import { Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

type FieldsProps = {
  disabled?: boolean;
};

const Fields: React.FC<FieldsProps> = ({ disabled }) => {
  const { register, formState } = useFormContext();

  return (
    <Stack direction="column" spacing={1}>
      <TextField
        label="Nombre completo"
        variant="outlined"
        fullWidth
        disabled={disabled}
        data-testid="nombre-completo"
        size="small"
        {...register("fullname")}
        error={!!formState.errors.fullname}
        helperText={formState.errors.fullname?.message}
      />
      <TextField
        label="Correo electrónico"
        variant="outlined"
        fullWidth
        disabled={disabled}
        data-testid="correo-electronico"
        size="small"
        {...register("email")}
        error={!!formState.errors.email}
        helperText={formState.errors.email?.message}
      />
    </Stack>
  );
};

export { Fields };
