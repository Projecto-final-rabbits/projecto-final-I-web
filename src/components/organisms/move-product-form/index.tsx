import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { MoveProductFormValues, MoveProductSchema } from "./types";
import { Actions, Fields } from "./components";
import { useMoveProductMutation } from "@/state-managment/slices";
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

  const [moveProduct, { isLoading }] = useMoveProductMutation();

  const handleOnClose = () => {
    methods.reset();
    onClose();
  };

  const handleCreateProduct = (data: IMoveProduct) => {
    moveProduct(data)
      .unwrap()
      .then(() => {
        toast.success("Producto movido correctamente");
        handleOnClose();
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          handleCreateProduct({
            productId: data.productId,
            warehouseId: data.warehouseId + "",
            description: data.description,
            quantity: Number(data.quantity),
          });
        })}
      >
        <Stack spacing={2}>
          <Stack direction="column" spacing={1.5}>
            <Fields disabled={disabled || isLoading} />
          </Stack>
          <Actions
            onCancel={handleOnClose}
            submitText="Mover producto"
            cancelText="Cancelar"
            isLoading={isLoading}
            disabled={disabled}
          />
        </Stack>
      </form>
    </FormProvider>
  );
};

export { MoveProductForm };
