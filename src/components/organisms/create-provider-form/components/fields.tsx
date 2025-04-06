import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

type FieldsProps = {
  disabled?: boolean;
};

const Fields: React.FC<FieldsProps> = ({ disabled }) => {
  const { register, formState } = useFormContext();

  return (
    <>
      <TextField
        label="Nombre del proveedor"
        fullWidth
        disabled={disabled}
        data-testid="nombre-del-proveedor"
        size="small"
        {...register("name")}
        error={!!formState.errors.name}
        helperText={formState.errors.name?.message as string}
      />
      <TextField
        label="email"
        fullWidth
        disabled={disabled}
        data-testid="email-del-proveedor"
        size="small"
        {...register("email")}
        error={!!formState.errors.email}
        helperText={formState.errors.email?.message as string}
      />
      <TextField
        label="Telefono"
        fullWidth
        disabled={disabled}
        data-testid="telefono-del-proveedor"
        size="small"
        {...register("phone")}
        error={!!formState.errors.telefono}
        helperText={formState.errors.telefono?.message as string}
      />
      <TextField
        label="Country"
        fullWidth
        disabled={disabled}
        data-testid="country-del-proveedor"
        size="small"
        {...register("country")}
        error={!!formState.errors.country}
        helperText={formState.errors.country?.message as string}
      />
      <TextField
        label="Contacto"
        fullWidth
        disabled={disabled}
        data-testid="contacto-del-proveedor"
        size="small"
        {...register("contact")}
        error={!!formState.errors.contacto}
        helperText={formState.errors.contacto?.message as string}
      />
    </>
  );
};

export { Fields };
