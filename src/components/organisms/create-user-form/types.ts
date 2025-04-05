import { z } from "zod";

const createUserSchema = z.object({
  fullname: z.string({ message: "This field is required" }),
  email: z.string({ message: "This field is required" }).email(),
  role: z.enum(["ventas", "compras", "bodega", "admin"]),
});

type CreateUserFormValues = z.infer<typeof createUserSchema>;

export { createUserSchema };
export type { CreateUserFormValues };
