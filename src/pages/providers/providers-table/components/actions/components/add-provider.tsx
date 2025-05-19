import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "@/components/organisms";
import { useState } from "react";
import { ProviderForm } from "@/components/organisms/provider-form";
import { useSaveProviderMutation } from "@/state-managment/slices";
import { ICreateProvider } from "@/core/domain/interfaces";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const AddProvider: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [saveProvider, { isLoading }] = useSaveProviderMutation();

  const handleCreateProvider = (data: ICreateProvider) => {
    saveProvider(data)
      .unwrap()
      .then(() => {
        toast.success(t("providers.createSuccess"));
        handleOnClose();
      })
      .catch(() => {
        toast.error(t("providers.createError"));
      });
  };

  const handleOnClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpen(true)}
        data-testid="crear-proveedor-button"
        size="small"
        startIcon={<AddIcon />}
      >
        {t("providers.addProvider")}
      </Button>
      <Modal
        open={open}
        handleClose={handleOnClose}
        title={t("providers.addProvider")}
        disableEscapeKeyDown
      >
        <ProviderForm
          onSubmit={handleCreateProvider}
          onClose={handleOnClose}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
};

export { AddProvider };
