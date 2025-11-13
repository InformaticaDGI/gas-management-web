import { z } from "zod";

export const dailyClosingFormSchema = z.object({
    plantId: z.string().min(1, { message: "La planta es requerida" }),
    notes: z.string().optional()
});

export type DailyClosingFormSchema = z.infer<typeof dailyClosingFormSchema>;