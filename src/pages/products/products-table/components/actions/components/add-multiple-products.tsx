import { Button } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import { useSaveMultipleProductsMutation } from "@/state-managment/slices";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const AddMultipleProducts = () => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saveMultipleProducts, { isLoading }] =
    useSaveMultipleProductsMutation();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    saveMultipleProducts(formData)
      .unwrap()
      .then(() => {
        toast.success(t("messages.productsImportedSuccess"));
      })
      .catch(() => {
        toast.error(t("messages.productsImportError"));
      });
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        hidden
        onChange={handleFileChange}
      />
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        startIcon={<GetAppIcon />}
        loading={isLoading}
        onClick={handleClick}
        data-testid="importar-productos"
      >
        {t("products.importCsv")}
      </Button>
    </>
  );
};

export { AddMultipleProducts };
