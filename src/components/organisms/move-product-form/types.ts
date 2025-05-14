import { z } from "zod";

const MoveProductSchema = z.object({
  productId: z.string({ message: "El campo es requerido" }).nonempty({
    message: "El campo es requerido",
  }),
  warehouseId: z.number({ message: "El campo es requerido" }).min(1, {
    message: "El campo es requerido",
  }),
  quantity: z.string({ message: "El campo es requerido" }).min(1, {
    message: "Minimo 1 producto",
  }),
  description: z.string({}),
  movementType: z.string({ message: "El campo es requerido" }),
});

type MoveProductFormValues = z.infer<typeof MoveProductSchema>;

export { MoveProductSchema };
export type { MoveProductFormValues };
