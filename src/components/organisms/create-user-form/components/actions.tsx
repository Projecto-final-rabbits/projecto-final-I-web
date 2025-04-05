import React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { CreateUserFormValues } from "@components/organisms/create-user-form";
import { Stack } from "@mui/material";

type ActionsProps = {
  onCancel: () => void;
  submitText?: string;
  cancelText?: string;
};

const Actions: React.FC<ActionsProps> = ({
  onCancel,
  submitText = "Submit",
  cancelText = "Cancel",
}) => {
  const {
    formState: { isValid },
  } = useForm<CreateUserFormValues>({
    mode: "onChange", // Enables validation on change
  });

  return (
    <Stack direction="row" spacing={2} justifyContent="flex-end">
      <Button
        type="submit"
        variant="contained"
        color="primary"
        data-testid="crear-usuario"
        disabled={!isValid}
        sx={{ marginRight: 2 }}
      >
        {submitText}
      </Button>
      <Button
        type="button"
        variant="outlined"
        data-testid="cancelar-usuario"
        color="secondary"
        onClick={onCancel}
      >
        {cancelText}
      </Button>
    </Stack>
  );
};

export { Actions };
