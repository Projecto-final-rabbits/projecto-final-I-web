import { z } from "zod";

const createProductSchema = z.object({
  productName: z.string({ message: "El campo es requerido" }),
  description: z.string().optional(),
  purchasePrice: z.string({ message: "El campo es requerido" }),
  category: z.string().optional(),
  // providerId: z.number({
  //   message: "El campo es requerido",
  // }),
  deliveryTime: z.string({ message: "El campo es requerido" }),
});

type CreateProductFormValues = z.infer<typeof createProductSchema>;

export { createProductSchema };
export type { CreateProductFormValues };
