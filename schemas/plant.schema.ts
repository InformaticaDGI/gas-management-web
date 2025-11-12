import { z } from "zod";
import { companySchema } from "./company.schema";

const phoneRegex = new RegExp(
  /^\+58(2(12|3[4-9]|4[1-8]|5[1-9]|6[1-9]|7[0-8]|8[1-3]|9[1-6])|4(1[246]|2[46]))\d{7}$/
);

export const plantFormSchema = z.object({
  companyId: z.string().min(1, { message: "La empresa es requerida" }),
  name: z.string().min(1, { message: "El nombre es requerido" }),
  address: z.string().min(1, { message: "La dirección es requerida" }),
  email: z.email({ message: "El correo electrónico no es válido" }),
  phone: z.string().regex(phoneRegex, { message: "Formato inválido. Debe ser: +58 XXX XXXXXXX (ej: +58 4241234567)" }),
});

export const plantSchema = z.object({
    id: z.string(),
    code: z.string(),
    name: z.string(),
    address: z.string(),
    phone: z.string(),
    email: z.string(),
    isActive: z.boolean(),
    updatedAt: z.string(),
    createdAt: z.string(),
    company: companySchema,
  })

  export const userPlantSchema = z.object({
    id: z.string(),
    role: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    plant: plantSchema,
    company: companySchema,
  })
  
export type PlantFormSchema = z.infer<typeof plantFormSchema>;
export type PlantSchema = z.infer<typeof plantSchema>;
export type UserPlantSchema = z.infer<typeof userPlantSchema>;