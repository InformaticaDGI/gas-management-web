import { z } from "zod";

import { DocumentType } from "@/graphql/generated/graphql";

// Regex para cédula (solo números): 26848109
export const CEDULA_REGEX = /^\d{6,9}$/;

// Regex para RIF (solo números y dígito verificador): 12345678-9
export const RIF_REGEX = /^\d{7,8}-\d{1}$/;

// Regex para teléfono: +(código de país) (número telefónico sin el 0 al inicio)
// Ejemplo: +58 4241288358
export const PHONE_REGEX = /^\+\d{1,3} [1-9]\d{8,9}$/;


const cedulaSchema = z.object({
    documentType: z.enum([DocumentType.V]),
    cedulaRif: z.string().regex(CEDULA_REGEX, { message: "La Cédula debe tener un formato válido. (1234567890)" }),
});

const rifSchema = z.object({
    documentType: z.enum([DocumentType.C, DocumentType.J]),
    cedulaRif: z.string().regex(RIF_REGEX, { message: "El RIF debe tener un formato válido. (12345678-9)" }),
});

const documentSchema = z.discriminatedUnion("documentType", [cedulaSchema, rifSchema]);

export const customerFormSchema = z.object({
    document: documentSchema,
    firstName: z.string().min(1, { message: "El nombre es requerido" }),
    lastName: z.string().optional(),
    phone: z.string().regex(PHONE_REGEX, { message: "El teléfono debe tener un formato válido. (+58 4241234567)" }),
    address: z.string().min(1, { message: "La dirección es requerida" }),
    state: z.string().min(1, { message: "El estado es requerido" }),
    parish: z.string().min(1, { message: "La parroquia es requerida" }),
    community: z.string().min(1, { message: "La comunidad es requerida" })
})
.refine(data => {
    if (data.document.documentType === DocumentType.V && !data.lastName) {
        return false;
    }
    return true;
}, {
    message: "El apellido es requerido",
    path: ["lastName"]
});

export type CustomerFormSchema = z.infer<typeof customerFormSchema>;