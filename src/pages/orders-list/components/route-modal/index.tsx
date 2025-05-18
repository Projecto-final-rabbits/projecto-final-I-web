import { Dialog, DialogTitle, DialogContent } from "@mui/material";

import { Map } from "./components";

interface RouteModalProps {
  orderId: number;
  open: boolean;
  onClose: () => void;
}

const RouteModal = ({ open, onClose }: RouteModalProps) => {
  const handleCloseRouteModal = () => {
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <Dialog open={open} onClose={handleCloseRouteModal}>
      <DialogTitle>Rutas de entrega</DialogTitle>
      <DialogContent>
        <Map />
      </DialogContent>
    </Dialog>
  );
};

export { RouteModal };
