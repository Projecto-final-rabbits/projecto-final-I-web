import { z } from "zod";

const createProviderSchema = z.object({
  name: z.string({ message: "El campo es requerido" }),
  email: z.string({ message: "El campo es requerido" }),
  phone: z.string({ message: "El campo es requerido" }),
  country: z.string({ message: "El campo es requerido" }),
  contact: z.string({ message: "El campo es requerido" }),
});

type CreateProviderFormValues = z.infer<typeof createProviderSchema>;

export { createProviderSchema };
export type { CreateProviderFormValues };
