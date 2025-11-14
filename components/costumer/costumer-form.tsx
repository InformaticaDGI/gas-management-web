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
import { createCustomer, CreateCustomerInput, updateCustomer } from "@/app/actions";
import { customerFormSchema, CustomerFormSchema } from "@/schemas/customer.schema";
import { CustomerType, DocumentType, GetCustomerByCedulaRifQuery } from "@/graphql/generated/graphql";

export default function CustomerForm({ customer }: { customer?: GetCustomerByCedulaRifQuery['customerByCedulaRif'] }) {

    let defaultValues: Partial<CustomerFormSchema> = {
        document: {
            documentType: DocumentType.V,
            cedulaRif: ""
        }
    };

    if (customer) {
        defaultValues = {
            document: {
                documentType: customer.documentType,
                cedulaRif: customer.cedulaRif
            },
            firstName: customer.firstName,
            phone: customer.phone,
            address: customer.address,
            state: customer.state,
            parish: customer.parish,
            community: customer.community
        }

        if (customer.documentType === DocumentType.V && customer.lastName) {
            defaultValues.lastName = customer.lastName;
        }
    }

    const router = useRouter();
    const form = useForm<CustomerFormSchema>({
        resolver: zodResolver(customerFormSchema),
        mode: "onChange",
        defaultValues,
    })

    const document = form.watch("document");



    const onSubmit = async (values: CustomerFormSchema) => {
        const { document: { documentType, cedulaRif }, firstName, lastName, phone, address, state, parish, community } = values;

        const customerData: CreateCustomerInput = {
            documentType,
            cedulaRif,
            firstName,
            phone,
            address,
            state,
            parish,
            community,
            customerType: documentType === DocumentType.V ? CustomerType.PublicoGeneral : documentType === DocumentType.C ? CustomerType.ConsejosComunales : CustomerType.EmpresasPrivadas,
        }

        if (document.documentType === DocumentType.V) {
            customerData.lastName = lastName;
        }

        if (customer) {
            await handleUpdateCustomer(customerData);
        } else {
            await handleCreateCustomer(customerData);
        }

        router.push("/inventory/customers");
    }

    const handleCreateCustomer = async (values: CreateCustomerInput) => {
        const { error } = await createCustomer(values);
        if (error) {
            console.error("Error al crear el cliente:", error);
            toast.error("Error al crear el cliente");
        }
        toast.success("Cliente creado correctamente");
    }

    const handleUpdateCustomer = async (values: CreateCustomerInput) => {
        if (!customer) return;

        const { error } = await updateCustomer({ input: values, updateCustomerId: customer.id });

        if (error) {
            console.error("Error al actualizar el cliente:", error);
            toast.error("Error al actualizar el cliente");
        }
        toast.success("Cliente actualizado correctamente");
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

                            <FieldLabel htmlFor="checkout-7j9-card-documentType-uw1">
                                Tipo de documento
                            </FieldLabel>
                            <Controller
                                name="document.documentType"
                                control={form.control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger id="checkout-7j9-card-documentType-uw1">
                                            <SelectValue placeholder="Seleccionar tipo de documento" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(DocumentType).map((documentType) => (
                                                <SelectItem key={documentType} value={documentType}>{documentType}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {form.formState.errors.document && <FieldError>{form.formState.errors.document.message}</FieldError>}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                {document.documentType === "V" ? "Cédula" : "RIF"}
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-name-43j"
                                {...form.register("document.cedulaRif")}
                                placeholder={document.documentType === "V" ? "1234567890" : "12345678-9"}
                                required
                            />
                            {form.formState.errors.document && form.formState.errors.document.cedulaRif && <FieldError>{form.formState.errors.document.cedulaRif.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-name-uw1">
                                Nombre
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-name-uw1"
                                {...form.register("firstName")}
                                placeholder={document.documentType === "V" ? "Pedro" : document.documentType === "C" ? "Comunidad de El Carmen" : "Empresa Petrolera C.A."}
                                required
                            />
                            {form.formState.errors.firstName && <FieldError>{form.formState.errors.firstName.message}</FieldError>}
                        </Field>
                        {document.documentType === "V" && <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-lastName-uw1">
                                Apellido
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-lastName-uw1"
                                {...form.register("lastName")}
                                placeholder="Perez"
                                required
                            />
                            {form.formState.errors.lastName && <FieldError>{form.formState.errors.lastName.message}</FieldError>}
                        </Field>}
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-state-uw1">
                                Estado
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-state-uw1"
                                {...form.register("state")}
                                placeholder="Aragua"
                                required
                            />
                            {form.formState.errors.state && <FieldError>{form.formState.errors.state.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-parish-uw1">
                                Parroquia
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-parish-uw1"
                                {...form.register("parish")}
                                placeholder="San Cristóbal"
                                required
                            />
                            {form.formState.errors.parish && <FieldError>{form.formState.errors.parish.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-community-uw1">
                                Comunidad
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-community-uw1"
                                {...form.register("community")}
                                placeholder="El Carmen"
                                required
                            />
                            {form.formState.errors.community && <FieldError>{form.formState.errors.community.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-address-uw1">
                                Dirección
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-address-uw1"
                                {...form.register("address")}
                                placeholder="Calle 123, Caracas, Venezuela"
                                required
                            />
                            {form.formState.errors.address && <FieldError>{form.formState.errors.address.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-phone-uw1">
                                Teléfono
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-phone-uw1"
                                {...form.register("phone")}
                                placeholder="+58 412 123 4567"
                                required
                            />
                            {form.formState.errors.phone && <FieldError>{form.formState.errors.phone.message}</FieldError>}
                        </Field>


                    </FieldGroup>
                </FieldSet>
                <Field orientation="horizontal">
                    <Button type="submit" className="cursor-pointer">{customer ? "Guardar" : "Registrar"}</Button>
                    <Button variant="outline" type="button" className="cursor-pointer" onClick={() => router.push("/inventory/customers")}>
                        Cancelar
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )

}