import { z } from "zod";

import { CustomerType } from "@/graphql/generated/graphql";

export const customerFormSchema = z.object({
    cedulaRif: z.string().min(1, { message: "La cédula o RIF es requerida" }),
    firstName: z.string().min(1, { message: "El nombre es requerido" }),
    lastName: z.string().min(1, { message: "El apellido es requerido" }),
    phone: z.string().min(1, { message: "El teléfono es requerido" }),
    address: z.string().min(1, { message: "La dirección es requerida" }),
    state: z.string().min(1, { message: "El estado es requerido" }),
    parish: z.string().min(1, { message: "La parroquia es requerida" }),
    community: z.string().min(1, { message: "La comunidad es requerida" }),
    customerType: z.enum(CustomerType, { message: "El tipo de cliente es requerido" }),
});

export type CustomerFormSchema = z.infer<typeof customerFormSchema>;