import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function CreatePlantPage() {
    return <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
        <div className="w-full max-w-md">
            <form>
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
                                <Select defaultValue="">
                                    <SelectTrigger id="checkout-7j9-card-number-uw1">
                                        <SelectValue placeholder="Seleccionar empresa" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Empresa 1</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                    Nombre de la planta
                                </FieldLabel>
                                <Input
                                    id="checkout-7j9-card-name-43j"
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
        </div>
    </div>
}