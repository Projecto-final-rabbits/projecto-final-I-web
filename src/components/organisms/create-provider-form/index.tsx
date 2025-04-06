import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { CreateProviderFormValues, createProviderSchema } from "./types";
import { Actions, Fields } from "./components";
import { useSaveProviderMutation } from "@/state-managment/slices";
import { ICreateProvider } from "@/core/domain/interfaces";
import { toast } from "react-toastify";

type CreateProviderFormProps = {
  onClose: () => void;
  disabled?: boolean;
};

const CreateProviderForm: React.FC<CreateProviderFormProps> = ({
  onClose,
  disabled,
}) => {
  const methods = useForm<CreateProviderFormValues>({
    resolver: zodResolver(createProviderSchema),
  });
  const [saveProvider, { isLoading }] = useSaveProviderMutation();

  const handleOnClose = () => {
    methods.reset();
    onClose();
  };

  const handleCreateProvider = (data: ICreateProvider) => {
    saveProvider(data)
      .unwrap()
      .then(() => {
        toast.success("Proveedor creado correctamente");
        handleOnClose();
      })
      .catch(() => {
        toast.error("Oops! Error, intentalo mas tarde.");
      });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) =>
          handleCreateProvider({
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
            <Fields disabled={disabled || isLoading} />
          </Stack>
          <Actions
            onCancel={handleOnClose}
            submitText="Agregar Proveedor"
            cancelText="Cancelar"
            isLoading={isLoading}
            disabled={disabled}
          />
        </Stack>
      </form>
    </FormProvider>
  );
};

export { CreateProviderForm };
