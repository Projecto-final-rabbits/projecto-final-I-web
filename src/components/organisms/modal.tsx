import { Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import { TransitionProps as MuiTransitionProps } from "@mui/material/transitions";
import { ReactElement, Ref } from "react";

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

type TransitionProps = {
  props: MuiTransitionProps & {
    children: ReactElement<
      unknown,
      string | React.JSXElementConstructor<unknown>
    >;
  };
  ref: Ref<unknown>;
};

const Transition = ({ ref, props }: TransitionProps) => (
  <Slide direction="up" ref={ref} {...props} />
);

const Modal: React.FC<ModalProps> = ({
  open,
  handleClose,
  title,
  children,
  footer,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby={`modal-${title}`}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
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
