import React from "react";
import { CreateUserForm } from "@components/organisms";
import { Role } from "@/core/domain/interfaces";
import { Button } from "@mui/material";

type CreateUserProps = {
  role: Role;
};

const TITLE: Record<Role, string> = {
  admin: "Crear Administrador",
  ventas: "Crear Vendedor",
  compras: "Crear Comprador",
  bodega: "Crear usuario de Bodega",
};

const CreateUser: React.FC<CreateUserProps> = ({ role }) => {
  const [open, setOpen] = React.useState(false);

  const hableOnClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        {TITLE[role]}
      </Button>
      {open && (
        <CreateUserForm
          open={open}
          onClose={hableOnClose}
          title={TITLE[role]}
          role={role}
        />
      )}
    </>
  );
};

export { CreateUser };
