import { z } from "zod";

const createProductSchema = z.object({
  productName: z.string({ message: "El campo es requerido" }),
  description: z.string().optional(),
  purchasePrice: z.string({ message: "El campo es requerido" }),
  category: z.string().optional(),
  providerId: z.number({
    message: "El campo es requerido",
  }),
  salePrice: z.string({ message: "El campo es requerido" }),
  storageCondition: z.string({ message: "El campo es requerido" }),
  expirationDate: z.preprocess((arg) => {
    if (!arg) return undefined;

    return new Date(arg as Date);
  }, z.date({ message: "El campo es requerido" })),
  activePromotion: z.boolean(),
  deliveryTime: z.string({ message: "El campo es requerido" }),
});

type CreateProductFormValues = z.infer<typeof createProductSchema>;

export { createProductSchema };
export type { CreateProductFormValues };
