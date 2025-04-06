import { z } from "zod";

const createUserSchema = z.object({
  fullname: z.string({ message: "El campo es requerido" }),
  email: z.string({ message: "El campo es requerido" }).email(),
  role: z.enum(["ventas", "compras", "bodega", "admin"]),
});

type CreateUserFormValues = z.infer<typeof createUserSchema>;

export { createUserSchema };
export type { CreateUserFormValues };
