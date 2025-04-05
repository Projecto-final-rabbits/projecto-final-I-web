import { Role, User } from "@/core/domain/interfaces";
import React from "react";
import { Modal } from "../modal";
import { Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fields, Actions } from "./components";
import { CreateUserFormValues, createUserSchema } from "./types";
import { useDispatch } from "react-redux";
import { createUserThunk } from "@/state-managment/slices";
import { AppDispatch, RootState } from "@/state-managment/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

type CreateUserFormProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  role: Role;
};

const CreateUserForm: React.FC<CreateUserFormProps> = ({
  open,
  onClose,
  title,
  role,
}) => {
  const methods = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      fullname: "",
      email: "",
      role,
    },
  });

  const isLoading = useSelector((state: RootState) => state.user.loading);
  const dispatch: AppDispatch = useDispatch();

  const handleCreateUser = (newUser: User) => {
    dispatch(createUserThunk(newUser))
      .unwrap()
      .then(() => {
        toast.success("Usuario creado correctamente");
        onClose();
      })
      .catch(() => {
        toast.error("Oops! Error, intentalo mas tarde.");
      });
  };

  return (
    <Modal title={title} open={open} handleClose={onClose}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            handleCreateUser({
              fullname: data.fullname,
              email: data.email,
              role: data.role,
            })
          )}
        >
          <Stack direction="column" spacing={3}>
            <Fields disabled={isLoading} />
            <Actions onCancel={onClose} isLoading={isLoading} />
          </Stack>
        </form>
      </FormProvider>
    </Modal>
  );
};

export { CreateUserForm };
