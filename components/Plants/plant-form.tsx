'use client';

import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Field, FieldLabel, FieldGroup, FieldLegend, FieldSet, FieldDescription, FieldError } from "../ui/field";
import { Controller, useForm } from "react-hook-form"
import { Select } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import createApolloClient from "@/graphql-client";
import { CreatePlantDocument } from "@/graphql/generated/graphql";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";

const phoneRegex = new RegExp(
    /^\+58(2(12|3[4-9]|4[1-8]|5[1-9]|6[1-9]|7[0-8]|8[1-3]|9[1-6])|4(1[246]|2[46]))\d{7}$/
  );
const plantFormSchema = z.object({
    companyId: z.string().min(1, { message: "La empresa es requerida" }),
    name: z.string().min(1, { message: "El nombre es requerido" }),
    address: z.string().min(1, { message: "La dirección es requerida" }),
    email: z.email({ message: "El correo electrónico no es válido" }),
    phone: z.string().regex(phoneRegex, { message: "Formato inválido. Debe ser: +58 XXX XXXXXXX (ej: +58 4241234567)" }),
});

type PlantFormSchema = z.infer<typeof plantFormSchema>;

export default function PlantForm({ companies, accessToken }: { companies: { address: string, name: string, id: string, rif: string }[], accessToken: string }) {

    const form = useForm<PlantFormSchema>({
        resolver: zodResolver(plantFormSchema),
        mode: "onChange",
        defaultValues: {
            companyId: "",
            name: "",
            address: "",
            email: "",
            phone: "",
        },
    })


    const router = useRouter();

    const onSubmit = async (values: PlantFormSchema) => {
        const { companyId, address, email, name, phone } = values;
        const client = createApolloClient({ accessToken });
        const code = "PLT-" + Math.random().toString(36).substring(2, 8).toUpperCase();

        const { error } = await client.mutate({
            mutation: CreatePlantDocument,
            variables: {
                address,
                companyId,
                email,
                name,
                phone,
                code
            }
        });

        if (error) {
            console.error("Error al crear la planta:", error);
            toast.error("Error al crear la planta");
        }
        toast.success("Planta creada correctamente");
        router.push("/plants");
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FieldSet>
                    <FieldLegend>Planta</FieldLegend>
                    <FieldDescription>
                        Registre una nueva planta
                    </FieldDescription>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                Seleccione la empresa asociada
                            </FieldLabel>
                            <Controller
                                name="companyId"
                                control={form.control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger id="checkout-7j9-card-number-uw1">
                                            <SelectValue placeholder="Seleccionar empresa" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {companies.map((company) => (
                                                <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {form.formState.errors.companyId && <FieldError>{form.formState.errors.companyId.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                Nombre de la planta
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-name-43j"
                                {...form.register("name")}
                                placeholder="Pedro Perez"
                                required
                            />
                            {form.formState.errors.name && <FieldError>{form.formState.errors.name.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                Dirección de la planta
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-number-uw1"
                                {...form.register("address")}
                                placeholder="Calle 123, Caracas, Venezuela"
                                required
                            />
                            {form.formState.errors.address && <FieldError>{form.formState.errors.address.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                Correo
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-number-uw1"
                                {...form.register("email")}
                                placeholder="pedro.perez@gmail.com"
                                required
                            />
                            {form.formState.errors.email && <FieldError>{form.formState.errors.email.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                Teléfono
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-number-uw1"
                                {...form.register("phone")}
                                placeholder="+58 412 123 4567"
                                required
                            />
                            {form.formState.errors.phone && <FieldError>{form.formState.errors.phone.message}</FieldError>}
                        </Field>

                    </FieldGroup>
                </FieldSet>
                <Field orientation="horizontal">
                    <Button type="submit" className="cursor-pointer">Registrar</Button>
                    <Button variant="outline" type="button" className="cursor-pointer" onClick={() => router.push("/plants")}>
                        Cancelar
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )

}