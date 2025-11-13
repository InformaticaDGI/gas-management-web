'use client';

import { Field, FieldLabel, FieldGroup, FieldLegend, FieldSet, FieldDescription, FieldError } from "../ui/field";
import { Controller, useForm } from "react-hook-form"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"
import { createProduct } from "@/app/actions";
import { productFormSchema, ProductFormSchema } from "@/schemas/product.schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CustomerType, ProductType, UnitType } from "@/graphql/generated/graphql";
import { customerTypeDictionaryNames } from "@/lib/dictionaries";


export default function ProductForm() {

    const router = useRouter();
    const form = useForm<ProductFormSchema>({
        resolver: zodResolver(productFormSchema),
        mode: "onChange",
    })



    const onSubmit = async (values: ProductFormSchema) => {
        const { name, type, baseCapacity, baseUnit, price, customerType } = values;

        const { error } = await createProduct({
            name,
            type,
            baseCapacity,
            baseUnit,
            price,
            customerType
        });

        if (error) {
            console.error("Error al crear el producto:", error);
            toast.error("Error al crear el producto");
        }
        toast.success("Producto creado correctamente");
        router.push("/products");
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FieldSet>
                    <FieldLegend>Producto</FieldLegend>
                    <FieldDescription>
                        Registre un nuevo producto
                    </FieldDescription>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-customer-type-uw1">
                                Tipo de cliente
                            </FieldLabel>
                            <Controller
                                name="customerType"
                                control={form.control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger id="checkout-7j9-card-customer-type-uw1">
                                            <SelectValue placeholder="Seleccionar tipo de cliente" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(CustomerType).map((customerType) => (
                                                <SelectItem key={customerType} value={customerType}>{customerTypeDictionaryNames[customerType]}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {form.formState.errors.customerType && <FieldError>{form.formState.errors.customerType.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-type-product-ey6">
                                Tipo de producto
                            </FieldLabel>
                            <Controller
                                name="type"
                                control={form.control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger id="checkout-7j9-card-number-uw1">
                                            <SelectValue placeholder="Seleccionar tipo de producto" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(ProductType).map((type) => (
                                                <SelectItem key={type} value={type}>{type}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {form.formState.errors.type && <FieldError>{form.formState.errors.type.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                Unidad base
                            </FieldLabel>
                            <Controller
                                name="baseUnit"
                                control={form.control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger id="checkout-7j9-card-number-uw1">
                                            <SelectValue placeholder="Seleccionar unidad base" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(UnitType).map((unit) => (
                                                <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {form.formState.errors.baseUnit && <FieldError>{form.formState.errors.baseUnit.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                Nombre
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-name-43j"
                                {...form.register("name")}
                                placeholder="Cilindro de 10KG"
                                required
                            />
                            {form.formState.errors.name && <FieldError>{form.formState.errors.name.message}</FieldError>}
                        </Field>
                        
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                Capacidad base
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-base-capacity-uw1"
                                {...form.register("baseCapacity")}
                                type="number"
                                step="0.01"
                                placeholder="10000.00"
                                required
                            />
                            {form.formState.errors.baseCapacity && <FieldError>{form.formState.errors.baseCapacity.message}</FieldError>}
                        </Field>
                        

                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-price-uw1">
                                Precio
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-price-uw1"
                                {...form.register("price")}
                                type="number"
                                step="0.01"
                                placeholder="10000.00"
                                required
                            />
                            {form.formState.errors.price && <FieldError>{form.formState.errors.price.message}</FieldError>}
                        </Field>
                    </FieldGroup>
                </FieldSet>
                <Field orientation="horizontal">
                    <Button type="submit" className="cursor-pointer">Registrar</Button>
                    <Button variant="outline" type="button" className="cursor-pointer" onClick={() => router.push("/inventory/products")}>
                        Cancelar
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )

}