import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { CreateProductFormValues, createProductSchema } from "./types";
import { Actions, Fields } from "./components";
import { useSaveProductMutation } from "@/state-managment/slices";
import { ICreateProduct } from "@/core/domain/interfaces";
import { toast } from "react-toastify";

type CreateProductFormProps = {
  onClose: () => void;
  disabled?: boolean;
};

const CreateProductForm: React.FC<CreateProductFormProps> = ({
  onClose,
  disabled,
}) => {
  const methods = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      productName: undefined,
      description: undefined,
      purchasePrice: undefined,
      salePrice: undefined,
      category: undefined,
      deliveryTime: undefined,
      storageCondition: undefined,
      activePromotion: false,
      expirationDate: undefined,
      providerId: undefined,
    },
  });
  const [saveProduct, { isLoading }] = useSaveProductMutation();

  const handleOnClose = () => {
    methods.reset();
    onClose();
  };

  const handleCreateProduct = (data: ICreateProduct) => {
    console.log("data: **", data);
    saveProduct(data)
      .unwrap()
      .then(() => {
        toast.success("Producto creado correctamente");
        handleOnClose();
      })
      .catch(() => {
        toast.error("Oops! Error, intentalo mas tarde.");
      });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          handleCreateProduct({
            nombre: data.productName,
            descripcion: data.description,
            precioCompra: Number(data.purchasePrice),
            categoria: data.category,
            proveedorId: data.providerId,
            tiempoEntregaDias: Number(data.deliveryTime),
            precioVenta: Number(data.salePrice),
            condicionAlmacenamiento: data.storageCondition,
            promocionActiva: data.activePromotion,
            fechaVencimiento: data.expirationDate,
          });
        })}
      >
        <Stack spacing={2}>
          <Stack direction="column" spacing={1.5}>
            <Fields disabled={disabled || isLoading} />
          </Stack>
          <Actions
            onCancel={handleOnClose}
            submitText="Agregar producto"
            cancelText="Cancelar"
            isLoading={isLoading}
            disabled={disabled}
          />
        </Stack>
      </form>
    </FormProvider>
  );
};

export { CreateProductForm };
