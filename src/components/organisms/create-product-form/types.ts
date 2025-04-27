import { isDayjs } from "dayjs";
import { z } from "zod";

const createProductSchema = z.object({
  productName: z.string({ message: "El campo es requerido" }).nonempty({
    message: "El campo es requerido",
  }),
  description: z.string({ message: "El campo es requerido" }).nonempty({
    message: "El campo es requerido",
  }),
  purchasePrice: z.string({ message: "El campo es requerido" }).nonempty({
    message: "El campo es requerido",
  }),
  category: z.string({ message: "El campo es requerido" }).nonempty({
    message: "El campo es requerido",
  }),
  providerId: z.number({
    message: "El campo es requerido",
  }),
  salePrice: z.string({ message: "El campo es requerido" }).nonempty({
    message: "El campo es requerido",
  }),
  storageCondition: z.string({ message: "El campo es requerido" }).nonempty({
    message: "El campo es requerido",
  }),
  expirationDate: z.preprocess((arg) => {
    if (!arg) return null;

    if (!isDayjs(arg)) {
      return null;
    }

    return arg.toDate();
  }, z.date({ message: "El campo es requerido" })) as unknown as z.ZodDate,
  activePromotion: z.boolean({ message: "El campo es requerido" }),
  deliveryTime: z.string({ message: "El campo es requerido" }).nonempty({
    message: "El campo es requerido",
  }),
});

type CreateProductFormValues = z.infer<typeof createProductSchema>;

export { createProductSchema };
export type { CreateProductFormValues };
