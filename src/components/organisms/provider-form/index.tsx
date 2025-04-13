import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { CreateProviderFormValues, createProviderSchema } from "./types";
import { Actions, Fields } from "./components";
import { ICreateProvider } from "@/core/domain/interfaces";

type CreateProviderFormProps = {
  onSubmit: (data: ICreateProvider) => void;
  onClose: () => void;
  disabled?: boolean;
  defaultValues?: CreateProviderFormValues;
};

const ProviderForm: React.FC<CreateProviderFormProps> = ({
  onSubmit,
  onClose,
  disabled,
  defaultValues,
}) => {
  const methods = useForm<CreateProviderFormValues>({
    resolver: zodResolver(createProviderSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const handleOnClose = () => {
    methods.reset();
    onClose();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) =>
          onSubmit({
            nombre: data.name,
            telefono: data.phone,
            email: data.email,
            pais: data.country,
            contacto: data.contact,
          })
        )}
      >
        <Stack spacing={2}>
          <Stack direction="column" spacing={1.5}>
            <Fields disabled={disabled} />
          </Stack>
          <Actions
            onCancel={handleOnClose}
            submitText="Agregar Proveedor"
            cancelText="Cancelar"
            isLoading={disabled}
            disabled={disabled}
          />
        </Stack>
      </form>
    </FormProvider>
  );
};

export { ProviderForm };
