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
        label="Nombre del producto"
        fullWidth
        disabled={disabled}
        data-testid="nombre-del-producto"
        size="small"
        {...register("productName")}
        error={!!formState.errors.productName}
        helperText={formState.errors.productName?.message as string}
      />
      <TextField
        label="Descripcion"
        fullWidth
        disabled={disabled}
        data-testid="descripcion-del-producto"
        size="small"
        {...register("description")}
        error={!!formState.errors.description}
        helperText={formState.errors.description?.message as string}
      />
      <TextField
        label="Precio de compra"
        fullWidth
        type="number"
        min={0}
        disabled={disabled}
        data-testid="precio-de-compra"
        size="small"
        {...register("purchasePrice")}
        error={!!formState.errors.purchasePrice}
        helperText={formState.errors.purchasePrice?.message as string}
      />
      <TextField
        label="Categoria"
        fullWidth
        disabled={disabled}
        data-testid="categoria"
        size="small"
        {...register("category")}
        error={!!formState.errors.category}
        helperText={formState.errors.category?.message as string}
      />
      <TextField
        label="Tiempo de entrega"
        fullWidth
        disabled={disabled}
        data-testid="tiempo-de-entrega"
        type="number"
        min={0}
        size="small"
        {...register("deliveryTime")}
        error={!!formState.errors.deliveryTime}
        helperText={formState.errors.deliveryTime?.message as string}
      />
    </>
  );
};

export { Fields };
