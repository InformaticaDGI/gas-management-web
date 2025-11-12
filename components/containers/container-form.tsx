'use client';

import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Field, FieldLabel, FieldGroup, FieldLegend, FieldSet, FieldDescription } from "../ui/field";
import { Select } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CreateContainerMutation } from "@/graphql/generated/graphql";
import { toast } from "sonner";
import { CreateContainerInput } from "@/app/actions";
import { ErrorLike } from "@apollo/client";

type CreateContainer = {
    error: ErrorLike | undefined;
    data: CreateContainerMutation | undefined;
}

export default function ContainerForm({ plants, createContainer }: { plants: { id: string, name: string }[], createContainer: (container: CreateContainerInput) => Promise<CreateContainer> }) {


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const plantId = formData.get("plantId")?.toString() ?? "";
        const name = formData.get("name")?.toString() ?? "";
        const maxCapacityL = parseFloat(formData.get("maxCapacityL")?.toString() ?? "0");
        const currentInventoryL = parseFloat(formData.get("currentInventoryL")?.toString() ?? "0");
        
        const { error, data } = await createContainer({
            plantId,
            name,
            maxCapacityL,
            currentInventoryL,
        });

        if (error) {
            console.error("Error al crear el tanque:", error);
            toast.error("Error al crear el tanque");
            return;
        }

        toast.success("Tanque creado correctamente");
    }

    return (
        <form onSubmit={handleSubmit}>
            <FieldGroup>
                <FieldSet>
                    <FieldLegend>Tanque</FieldLegend>
                    <FieldDescription>
                        Registre un nuevo tanque
                    </FieldDescription>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="container-plant-select">
                                Seleccione la planta asociada
                            </FieldLabel>
                            <Select name="plantId">
                                <SelectTrigger id="container-plant-select">
                                    <SelectValue placeholder="Seleccionar planta" />
                                </SelectTrigger>
                                <SelectContent>
                                    {plants.map((plant) => (
                                        <SelectItem key={plant.id} value={plant.id}>{plant.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="container-name">
                                Nombre del tanque
                            </FieldLabel>
                            <Input
                                id="container-name"
                                name="name"
                                placeholder="Tanque Principal"
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="container-max-capacity">
                                Capacidad máxima (L³)
                            </FieldLabel>
                            <Input
                                id="container-max-capacity"
                                name="maxCapacityL"
                                type="number"
                                step="0.01"
                                placeholder="10000.00"
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="container-current-inventory">
                                Inventario actual (L³)
                            </FieldLabel>
                            <Input
                                id="container-current-inventory"
                                name="currentInventoryL"
                                type="number"
                                step="0.01"
                                placeholder="5000.00"
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

