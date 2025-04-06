import { Stack } from "@mui/material";
import { AddProvider } from "./components";

type ActionsProps = {
  onCancel?: () => void;
  isLoading?: boolean;
};

const Actions: React.FC<ActionsProps> = () => {
  return (
    <Stack direction="row" justifyContent="end" alignItems="center">
      <Stack direction="row" spacing={1} alignItems="center">
        <AddProvider />
      </Stack>
    </Stack>
  );
};

export { Actions };
