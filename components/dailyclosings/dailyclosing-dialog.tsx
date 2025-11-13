'use client'

import { IconCirclePlusFilled } from "@tabler/icons-react"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "../ui/field"
import { Controller, useForm } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { executeDailyClosing } from "@/app/actions"
import { toast } from "sonner"
import { Textarea } from "../ui/textarea"
import { dailyClosingFormSchema, DailyClosingFormSchema } from "@/schemas/dailyclosings.schema"
import { GetPlantsQuery } from "@/graphql/generated/graphql"

export function DailyClosingDialog({ plants }: { plants: GetPlantsQuery['plants'] }) {
    const router = useRouter();
    const form = useForm<DailyClosingFormSchema>({
        resolver: zodResolver(dailyClosingFormSchema),
        mode: "onChange",
        defaultValues: {
            plantId: "",
            notes: "",
        },
    })



    const onSubmit = async (values: DailyClosingFormSchema) => {
        const { plantId, notes } = values;

        const { error } = await executeDailyClosing({
            plantId,
            notes,
        });

        if (error) {
            console.error("Error al cerrar la caja:", error);
            toast.error("Error al cerrar la caja");
        }
        toast.success("Caja cerrada correctamente");
        router.push("/daily-closings");
    }
    return (
        <Dialog>
            <form onSubmit={form.handleSubmit(onSubmit)} id="daily-closing-form">
                <DialogTrigger asChild>
                    <Button size="sm" className="hidden h-7 sm:flex cursor-pointer">
                        <IconCirclePlusFilled />
                        <span>Cerrar Caja</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Cerrar Caja</DialogTitle>
                        <DialogDescription>
                            Por favor, complete los datos del cierre de caja.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <FieldSet>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                        Seleccione la planta
                                    </FieldLabel>
                                    <Controller
                                        name="plantId"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger id="checkout-7j9-card-number-uw1">
                                                    <SelectValue placeholder="Seleccionar planta" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {plants.map((plant) => (
                                                        <SelectItem key={plant.id} value={plant.id}>{plant.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {form.formState.errors.plantId && <FieldError>{form.formState.errors.plantId.message}</FieldError>}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                        Notas (Opcional)
                                    </FieldLabel>
                                    <Textarea
                                        id="checkout-7j9-card-name-43j"
                                        {...form.register("notes")}
                                        placeholder="Notas del cierre de caja"
                                    />
                                    {form.formState.errors.notes && <FieldError>{form.formState.errors.notes.message}</FieldError>}
                                </Field>


                            </FieldGroup>
                        </FieldSet>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" form="daily-closing-form">Cerrar Caja</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}