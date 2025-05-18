import { Dialog, DialogTitle, DialogContent } from "@mui/material";

import { Map } from "./components";

interface RouteModalProps {
  orderId: number;
  open: boolean;
  onClose: () => void;
}

const RouteModal = ({ orderId, open, onClose }: RouteModalProps) => {
  const handleCloseRouteModal = () => {
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <Dialog open={open} onClose={handleCloseRouteModal}>
      <DialogTitle>Rutas de entrega</DialogTitle>
      <DialogContent>
        <Map orderId={orderId} />
      </DialogContent>
    </Dialog>
  );
};

export { RouteModal };
