import { CustomerType, ProductType, UnitType } from "@/graphql/generated/graphql";
import { z } from "zod";

export const productFormSchema = z.object({
    name: z.string().min(1, { message: "El nombre es requerido" }),
    type: z.enum(ProductType, { message: "El tipo de producto es requerido" }),
    baseCapacity: z.coerce.number<number>().positive().min(1, { message: "La capacidad es requerida" }),
    baseUnit: z.enum(UnitType, { message: "La unidad base es requerida" }),
    price: z.coerce.number<number>().positive().min(1, { message: "El precio es requerido" }),
    customerType: z.enum(CustomerType, { message: "El tipo de cliente es requerido" }),
});

export type ProductFormSchema = z.infer<typeof productFormSchema>;