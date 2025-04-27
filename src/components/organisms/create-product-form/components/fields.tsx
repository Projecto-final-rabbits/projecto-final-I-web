import { ProviderAutocomplete } from "@/components/molecules";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useFormContext, Controller } from "react-hook-form";

type FieldsProps = {
  disabled?: boolean;
};

const Fields: React.FC<FieldsProps> = ({ disabled }) => {
  const { register, formState, control } = useFormContext();

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

      <Controller
        name="expirationDate"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <DatePicker
            label="Fecha de expiración"
            value={field.value}
            data-testid="fecha-de-expiracion"
            onChange={field.onChange}
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
                disabled,
                error: !!formState.errors.expirationDate,
                helperText: formState.errors.expirationDate?.message as string,
              },
            }}
          />
        )}
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
        label="Precio de venta"
        fullWidth
        type="number"
        min={0}
        disabled={disabled}
        data-testid="precio-de-venta"
        size="small"
        {...register("salePrice")}
        error={!!formState.errors.salePrice}
        helperText={formState.errors.salePrice?.message as string}
      />
      <FormControlLabel
        sx={{ alignSelf: "flex-start" }}
        control={<Switch name="activePromotion" />}
        label="Promocion activa?"
        labelPlacement="start"
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
      <ProviderAutocomplete name="providerId" />
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
      <TextField
        label="Descripcion"
        rows={3}
        fullWidth
        disabled={disabled}
        data-testid="descripcion-del-producto"
        size="small"
        {...register("description")}
        error={!!formState.errors.description}
        helperText={formState.errors.description?.message as string}
        multiline
      />
      <TextField
        label="Condicion de almacenamiento"
        rows={3}
        disabled={disabled}
        data-testid="condicion-almacenamiento"
        size="small"
        {...register("storageCondition")}
        error={!!formState.errors.storageCondition}
        helperText={formState.errors.storageCondition?.message as string}
        multiline
      />
    </>
  );
};

export { Fields };
