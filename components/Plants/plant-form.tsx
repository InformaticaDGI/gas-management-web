'use client';

import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Field, FieldLabel, FieldGroup, FieldLegend, FieldSet, FieldDescription, FieldError } from "../ui/field";
import { Controller, useForm } from "react-hook-form"
import { Select } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"
import { plantFormSchema, PlantFormSchema } from "@/schemas/plant.schema";
import { createPlant } from "@/app/actions";
import { CompaniesQuery } from "@/graphql/generated/graphql";

export default function PlantForm({ companies }: { companies: CompaniesQuery['companies'] }) {

    const router = useRouter();
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



    const onSubmit = async (values: PlantFormSchema) => {
        const { companyId, address, email, name, phone } = values;
        const code = "PLT-" + Math.random().toString(36).substring(2, 8).toUpperCase();

        const { error } = await createPlant({
            address,
            companyId,
            email,
            name,
            phone,
            code
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