import { Button } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import { useSaveMultipleProductsMutation } from "@/state-managment/slices";
import { useRef } from "react";
import { toast } from "react-toastify";

const AddMultipleProducts = () => {
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
        toast.success("Productos importados correctamente");
      })
      .catch(() => {
        toast.error("Error al importar productos");
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
        Importar .csv
      </Button>
    </>
  );
};

export { AddMultipleProducts };
