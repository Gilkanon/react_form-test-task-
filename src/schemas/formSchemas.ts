import { z } from "zod";

export const UNIT_OPTIONS = ["EACH", "SQ-M"] as const;

export const addItemSchema = z.object({
    name: z.string().trim().min(1, { message: "Select or enter item name" }),
    unit: z.enum(UNIT_OPTIONS),
    rate: z.coerce
        .number()
        .positive({ message: "Rate have to be positive number" }),
});

export type addItemFormValues = z.infer<typeof addItemSchema>;
