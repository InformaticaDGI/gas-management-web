'use client';

import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Field, FieldLabel, FieldGroup, FieldLegend, FieldSet, FieldDescription } from "../ui/field";
import { Select } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import createApolloClient from "@/graphql-client";
import { CreatePlantDocument } from "@/graphql/generated/graphql";
import { toast } from "sonner";

export default function PlantForm({ companies, accessToken }: { companies: { address: string, name: string, id: string, rif: string }[], accessToken: string }) {


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const address = formData.get("address")?.toString() ?? "";
        const companyId = formData.get("companyId")?.toString() ?? "";
        const email = formData.get("email")?.toString() ?? "";
        const name = formData.get("name")?.toString() ?? "";
        const phone = formData.get("phone")?.toString() ?? "";
        
        const client = createApolloClient({ accessToken });

        const { error } = await client.mutate({
            mutation: CreatePlantDocument,
            variables: {
                address,
                companyId,
                email,
                name,
                phone,
                code: "1234567890",
            }
        });

        if (error) {
            console.error("Error al crear la planta:", error);
            toast.error("Error al crear la planta");
        }

        toast.success("Planta creada correctamente");
    }

    return (
        <form onSubmit={handleSubmit}>
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
                            <Select name="companyId">
                                <SelectTrigger id="checkout-7j9-card-number-uw1">
                                    <SelectValue placeholder="Seleccionar empresa" />
                                </SelectTrigger>
                                <SelectContent>
                                    {companies.map((company) => (
                                        <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                Nombre de la planta
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-name-43j"
                                name="name"
                                placeholder="Pedro Perez"
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                Dirección de la planta
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-number-uw1"
                                name="address"
                                placeholder="Calle 123, Caracas, Venezuela"
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                Correo
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-number-uw1"
                                name="email"
                                placeholder="pedro.perez@gmail.com"
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                Teléfono
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-number-uw1"
                                name="phone"
                                placeholder="+58 412 123 4567"
                                required
                            />
                        </Field>

                    </FieldGroup>
                </FieldSet>
                <Field orientation="horizontal">
                    <Button type="submit">Guardar</Button>
                    <Button variant="outline" type="button">
                        Cancelar
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )

}