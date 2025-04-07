import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
  disableEscapeKeyDown?: boolean;
  footer?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  open,
  handleClose,
  title,
  children,
  disableEscapeKeyDown = false,
  footer,
}) => {
  const handleDialogClose = (
    _: object,
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (disableEscapeKeyDown && reason === "backdropClick") return;

    handleClose();
  };

  return (
    <Dialog
      open={open}
      keepMounted
      disableEscapeKeyDown={disableEscapeKeyDown}
      onClose={handleDialogClose}
      aria-describedby={`modal-${title}`}
      fullWidth
    >
      <DialogTitle
        sx={{
          paddingInline: "3rem",
        }}
      >
        <Typography fontWeight={600} data-testid={`modal-${title}`}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ padding: "2rem 3rem" }}>
        <Box sx={{ paddingTop: "1rem" }}>{children}</Box>

        {/* <DialogContentText id="alert-dialog-slide-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText> */}
      </DialogContent>
      {footer}
      {/* <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose}>Agree</Button>
      </DialogActions> */}
    </Dialog>
  );
};

export { Modal };
