import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useTranslation } from "react-i18next";

import { Map } from "./components";

interface RouteModalProps {
  orderId: number;
  open: boolean;
  onClose: () => void;
}

const RouteModal = ({ orderId, open, onClose }: RouteModalProps) => {
  const { t } = useTranslation();

  const handleCloseRouteModal = () => {
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <Dialog open={open} onClose={handleCloseRouteModal}>
      <DialogTitle>{t("orders.table.viewRoute")}</DialogTitle>
      <DialogContent>
        <Map orderId={orderId} />
      </DialogContent>
    </Dialog>
  );
};

export { RouteModal };
