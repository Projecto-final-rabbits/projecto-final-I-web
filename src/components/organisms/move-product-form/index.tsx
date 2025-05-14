import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { MoveProductFormValues, MoveProductSchema } from "./types";
import { Actions, Fields } from "./components";
import {
  useMoveIncomeProductMutation,
  useMoveOutcomeProductMutation,
  useMoveTransferProductMutation,
} from "@/state-managment/slices";
import { IMoveProduct } from "@/core/domain/interfaces";
import { toast } from "react-toastify";

type MoveProductFormProps = {
  onClose: () => void;
  disabled?: boolean;
};

const MoveProductForm: React.FC<MoveProductFormProps> = ({
  onClose,
  disabled,
}) => {
  const methods = useForm<MoveProductFormValues>({
    resolver: zodResolver(MoveProductSchema),
    defaultValues: {},
  });

  const [moveIncomeProduct, { isLoading: isIncomeLoading }] =
    useMoveIncomeProductMutation();
  const [moveOutcomeProduct, { isLoading: isOutcomeLoading }] =
    useMoveOutcomeProductMutation();
  const [moveTransferProduct, { isLoading: isTransferLoading }] =
    useMoveTransferProductMutation();

  const handleOnClose = () => {
    methods.reset();
    onClose();
  };

  const handleCreateProduct = (data: IMoveProduct) => {
    console.log(data);
    if (data.movementType === "entrada") {
      moveIncomeProduct(data)
        .unwrap()
        .then(() => {
          toast.success("Producto movido correctamente");
          handleOnClose();
        })
        .catch((error) => {
          toast.error(error.data.message);
        });
    } else if (data.movementType === "salida") {
      moveOutcomeProduct(data)
        .unwrap()
        .then(() => {
          toast.success("Producto movido correctamente");
          handleOnClose();
        });
    } else if (data.movementType === "traslado") {
      moveTransferProduct(data)
        .unwrap()
        .then(() => {
          toast.success("Producto movido correctamente");
          handleOnClose();
        });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          handleCreateProduct({
            movementType: data.movementType,
            productId: data.productId,
            warehouseId: data.warehouseId + "",
            description: data.description,
            quantity: Number(data.quantity),
          });
        })}
      >
        <Stack spacing={2}>
          <Stack direction="column" spacing={1.5}>
            <Fields
              disabled={
                disabled ||
                isIncomeLoading ||
                isOutcomeLoading ||
                isTransferLoading
              }
            />
          </Stack>
          <Actions
            onCancel={handleOnClose}
            submitText="Mover producto"
            cancelText="Cancelar"
            isLoading={isIncomeLoading || isOutcomeLoading || isTransferLoading}
            disabled={disabled}
          />
        </Stack>
      </form>
    </FormProvider>
  );
};

export { MoveProductForm };
