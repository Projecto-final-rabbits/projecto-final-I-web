import { Role } from "@/core/domain/interfaces";
import React, { useState } from "react";
import { Modal } from "../modal";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fields, Actions } from "./components";

type CreateUserFormProps = {
  title: string;
  role: Role;
};

const createUserSchema = z.object({
  fullname: z.string({ message: "This field is required" }),
  email: z.string({ message: "This field is required" }).email(),
  role: z.enum(["ventas", "compras", "bodega", "admin"]),
});
type CreateUserFormValues = z.infer<typeof createUserSchema>;

const CreateUserForm: React.FC<CreateUserFormProps> = ({ title, role }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      fullname: "",
      email: "",
      role,
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal title={title} open={open} handleClose={handleClose}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))}>
        <Stack direction="column" spacing={1}>
          <Fields />
          <Actions onCancel={handleClose} />
        </Stack>
      </form>
    </Modal>
  );
};

export { CreateUserForm };
export type { CreateUserFormValues };
