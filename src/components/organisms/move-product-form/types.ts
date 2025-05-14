import { z } from "zod";
import i18next from "i18next";

const MoveProductSchema = z.object({
  productId: z.string({ message: i18next.t("validation.required") }).nonempty({
    message: i18next.t("validation.required"),
  }),
  warehouseId: z.number({ message: i18next.t("validation.required") }).min(1, {
    message: i18next.t("validation.required"),
  }),
  quantity: z.string({ message: i18next.t("validation.required") }).min(1, {
    message: i18next.t("validation.minQuantity"),
  }),
  description: z.string({}),
  movementType: z.string({ message: i18next.t("validation.required") }),
});

type MoveProductFormValues = z.infer<typeof MoveProductSchema>;

export { MoveProductSchema };
export type { MoveProductFormValues };
