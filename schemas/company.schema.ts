import { z } from "zod";

export const companySchema = z.object({
    id: z.string(),
    name: z.string(),
  })

export type CompanySchema = z.infer<typeof companySchema>;