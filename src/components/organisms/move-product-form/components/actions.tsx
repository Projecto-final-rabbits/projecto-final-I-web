import React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";

import { Stack } from "@mui/material";
import { MoveProductFormValues } from "../types";

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
  } = useForm<MoveProductFormValues>({
    mode: "onChange",
  });

  return (
    <Stack direction="row" spacing={2} justifyContent="flex-end">
      <Button
        type="button"
        variant="outlined"
        data-testid="cancelar-producto"
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
        data-testid="crear-producto"
        disabled={!isValid || disabled}
        loading={isLoading}
        sx={{ marginRight: 2 }}
      >
        {submitText}
      </Button>
    </Stack>
  );
};

export { Actions };
