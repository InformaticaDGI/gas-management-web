import { z } from "zod";
import { userPlantSchema } from "./plant.schema";

export const userFormSchema = z.object({
    name: z.string().min(1, { message: "El nombre es requerido" }),
    email: z.email({ message: "El correo electrónico no es válido" }),
    password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});

export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    isActive: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    userPlants: z.array(userPlantSchema),
});

export type UserFormSchema = z.infer<typeof userFormSchema>;
export type UserSchema = z.infer<typeof userSchema>;