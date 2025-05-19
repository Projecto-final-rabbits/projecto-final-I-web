import { Modal } from "@/components/organisms";
import { ProviderForm } from "@/components/organisms/provider-form";
import { ICreateProvider, IProvider } from "@/core/domain/interfaces";
import { useUpdateProviderMutation } from "@/state-managment/slices";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

type EditProviderProps = IProvider;

const EditProvider: React.FC<EditProviderProps> = ({
  id,
  nombre,
  email,
  telefono,
  pais,
  contacto,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [updateProvider, { isLoading }] = useUpdateProviderMutation();

  const handleEditProvider = (data: ICreateProvider) => {
    updateProvider({ provider: data, id })
      .unwrap()
      .then(() => {
        toast.success(t("providers.updateSuccess"));
        handleOnClose();
      })
      .catch(() => {
        toast.error(t("providers.updateError"));
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
        data-testid={`edit-icon-${id}`}
      >
        <EditIcon fontSize="inherit" />
      </IconButton>
      {isOpen && (
        <Modal
          open={isOpen}
          handleClose={handleOnClose}
          title={t("providers.editProvider")}
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
            isLoading={isLoading}
            onSubmit={handleEditProvider}
            onClose={handleOnClose}
            submitText={t("common.save")}
          />
        </Modal>
      )}
    </>
  );
};

export { EditProvider };
