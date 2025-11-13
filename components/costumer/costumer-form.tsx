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
import { createCustomer } from "@/app/actions";
import { customerFormSchema, CustomerFormSchema } from "@/schemas/customer.schema";
import { CustomerType } from "@/graphql/generated/graphql";
import { useState } from "react";

export default function CustomerForm() {

    const router = useRouter();
    const [documentType, setDocumentType] = useState<string>("");
    const form = useForm<CustomerFormSchema>({
        resolver: zodResolver(customerFormSchema),
        mode: "onChange",
    })



    const onSubmit = async (values: CustomerFormSchema) => {
        const { cedulaRif, firstName, lastName, phone, address, state, parish, community, customerType } = values;

        const { error } = await createCustomer({
            cedulaRif,
            firstName,
            lastName,
            phone,
            address,
            state,
            parish,
            community,
            customerType,
        });
        if (error) {
            console.error("Error al crear el cliente:", error);
            toast.error("Error al crear el cliente");
        }
        toast.success("Cliente creado correctamente");
        router.push("/inventory/customers");
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FieldSet>
                    <FieldLegend>Cliente</FieldLegend>
                    <FieldDescription>
                        Registre un nuevo cliente
                    </FieldDescription>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                Tipo de persona
                            </FieldLabel>
                            <Select onValueChange={setDocumentType} value={documentType}>
                                <SelectTrigger id="checkout-7j9-card-number-uw1">
                                    <SelectValue placeholder="Seleccionar tipo de persona" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem key="natural" value="natural">Natural</SelectItem>
                                    <SelectItem key="juridica" value="juridica">Jurídica</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                {documentType === "natural" ? "Cédula" : "RIF"}
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-name-43j"
                                {...form.register("cedulaRif")}
                                placeholder={documentType === "natural" ? "1234567890" : "J1234567890"}
                                required
                            />
                            {form.formState.errors.firstName && <FieldError>{form.formState.errors.firstName.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                Nombre
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-number-uw1"
                                {...form.register("firstName")}
                                placeholder="Pedro"
                                required
                            />
                            {form.formState.errors.address && <FieldError>{form.formState.errors.address.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                Apellido
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-number-uw1"
                                {...form.register("lastName")}
                                placeholder="Perez"
                                required
                            />
                            {form.formState.errors.address && <FieldError>{form.formState.errors.address.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                Estado
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-number-uw1"
                                {...form.register("state")}
                                placeholder="Aragua"
                                required
                            />
                            {form.formState.errors.state && <FieldError>{form.formState.errors.state.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                Parroquia
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-number-uw1"
                                {...form.register("parish")}
                                placeholder="San Cristóbal"
                                required
                            />
                            {form.formState.errors.parish && <FieldError>{form.formState.errors.parish.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                Dirección
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-number-uw1"
                                {...form.register("address")}
                                placeholder="Calle 123, Caracas, Venezuela"
                                required
                            />
                            {form.formState.errors.lastName && <FieldError>{form.formState.errors.lastName.message}</FieldError>}
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
                    <Button variant="outline" type="button" className="cursor-pointer" onClick={() => router.push("/inventory/customers")}>
                        Cancelar
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )

}