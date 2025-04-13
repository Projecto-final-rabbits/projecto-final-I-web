import { Modal } from "@/components/organisms";
import { ProviderForm } from "@/components/organisms/provider-form";
import { ICreateProvider, IProvider } from "@/core/domain/interfaces";
import { useUpdateProviderMutation } from "@/state-managment/slices";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

type EditProviderProps = IProvider;

const EditProvider: React.FC<EditProviderProps> = ({
  id,
  nombre,
  email,
  telefono,
  pais,
  contacto,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateProvider, { isLoading }] = useUpdateProviderMutation();

  const handleEditProvider = (data: ICreateProvider) => {
    updateProvider({ provider: data, id })
      .unwrap()
      .then(() => {
        toast.success("Proveedor actualizado correctamente");
        handleOnClose();
      })
      .catch(() => {
        toast.error("Oops! Error, intentalo mas tarde.");
      });
  };

  const handleOnClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <IconButton
        color="primary"
        onClick={() => {
          setIsOpen(true);
        }}
        aria-label="edit"
      >
        <EditIcon fontSize="inherit" />
      </IconButton>
      {isOpen && (
        <Modal
          open={isOpen}
          handleClose={handleOnClose}
          title="Editar Proveedor"
          disableEscapeKeyDown
        >
          <ProviderForm
            defaultValues={{
              name: nombre,
              email,
              phone: telefono,
              country: pais,
              contact: contacto,
            }}
            disabled={isLoading}
            onSubmit={handleEditProvider}
            onClose={handleOnClose}
          />
        </Modal>
      )}
    </>
  );
};

export { EditProvider };
