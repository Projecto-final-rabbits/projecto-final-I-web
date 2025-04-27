import {
  ProductAutocomplete,
  WarehouseAutocomplete,
} from "@/components/molecules";
import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

type FieldsProps = {
  disabled?: boolean;
};

const Fields: React.FC<FieldsProps> = ({ disabled }) => {
  const { register, formState } = useFormContext();

  return (
    <>
      <ProductAutocomplete name="productId" />
      <WarehouseAutocomplete name="warehouseId" />
      <TextField
        label="Cantidad"
        fullWidth
        type="number"
        min={1}
        disabled={disabled}
        data-testid="cantidad-de-productos"
        size="small"
        {...register("quantity")}
        error={!!formState.errors.quantity}
        helperText={formState.errors.quantity?.message as string}
      />
      <TextField
        label="Descripcion"
        fullWidth
        multiline
        rows={3}
        disabled={disabled}
        data-testid="descripcion-del-producto"
        size="small"
        {...register("description")}
        error={!!formState.errors.description}
        helperText={formState.errors.description?.message as string}
      />
    </>
  );
};

export { Fields };
