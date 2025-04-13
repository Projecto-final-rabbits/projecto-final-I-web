import { Stack } from "@mui/material";
import { EditProvider } from "./components";
import { IProvider } from "@/core/domain/interfaces";

type ActionsProps = IProvider;

const RowActions: React.FC<ActionsProps> = ({
  id,
  nombre,
  email,
  telefono,
  pais,
  contacto,
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="start"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <EditProvider
        id={id}
        nombre={nombre}
        email={email}
        telefono={telefono}
        pais={pais}
        contacto={contacto}
      />
    </Stack>
  );
};

export { RowActions };
