import React from "react";
import { useFormContext } from "react-hook-form";
import Button from "@mui/material/Button";
import { CreateUserFormValues } from "@components/organisms/create-user-form/types";
import { Stack } from "@mui/material";

type ActionsProps = {
  onCancel: () => void;
  submitText?: string;
  cancelText?: string;
  isLoading?: boolean;
  disabled?: boolean;
};

const Actions: React.FC<ActionsProps> = ({
  onCancel,
  submitText = "Submit",
  cancelText = "Cancel",
  isLoading = false,
  disabled,
}) => {
  const {
    formState: { isValid },
  } = useFormContext<CreateUserFormValues>();

  return (
    <Stack direction="row" spacing={2} justifyContent="flex-end">
      <Button
        type="button"
        variant="outlined"
        data-testid="cancelar-usuario"
        color="secondary"
        onClick={onCancel}
        disabled={isLoading}
      >
        {cancelText}
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        data-testid="crear-usuario"
        disabled={!isValid || disabled || isLoading}
        sx={{ marginRight: 2 }}
      >
        {submitText}
      </Button>
    </Stack>
  );
};

export { Actions };
