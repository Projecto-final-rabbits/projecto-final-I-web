import { z } from "zod";
import i18next from "i18next";

const MoveProductSchema = z
  .object({
    productId: z
      .string({ message: i18next.t("validation.required") })
      .nonempty({ message: i18next.t("validation.required") }),
    warehouseId: z.number().optional(),
    quantity: z
      .string({ message: i18next.t("validation.required") })
      .min(1, { message: i18next.t("validation.required") }),
    description: z.string({}).optional(),
    movementType: z
      .string({ message: i18next.t("validation.required") })
      .nonempty({ message: i18next.t("validation.required") }),
    fromWarehouseId: z.number().optional(),
    toWarehouseId: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    console.log("*****", data);
    if (data.movementType === "traslado") {
      if (data.fromWarehouseId === undefined || data.fromWarehouseId < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["fromWarehouseId"],
          message: i18next.t("validation.required"),
        });
      }
      if (data.toWarehouseId === undefined || data.toWarehouseId < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["toWarehouseId"],
          message: i18next.t("validation.required"),
        });
      }
    } else {
      if (data.warehouseId === undefined || data.warehouseId < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["warehouseId"],
          message: i18next.t("validation.required"),
        });
      }
    }
  });
type MoveProductFormValues = z.infer<typeof MoveProductSchema>;

export { MoveProductSchema };
export type { MoveProductFormValues };
