'use client';

import { Field, FieldLabel, FieldGroup, FieldLegend, FieldSet, FieldDescription, FieldError } from "../ui/field";
import { useForm } from "react-hook-form"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateUserDocument } from "@/graphql/generated/graphql";
import { userFormSchema, UserFormSchema } from "@/schemas/user.schema";
import createApolloClient from "@/graphql-client";


export default function UserForm({ accessToken }: { accessToken: string }) {

    const router = useRouter();
    const form = useForm<UserFormSchema>({
        resolver: zodResolver(userFormSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })



    const onSubmit = async (values: UserFormSchema) => {
        const { email, name, password } = values;
        const client = await createApolloClient({ accessToken });

        const { error } = await client.mutate({
            mutation: CreateUserDocument,
            variables: {
                email,
                name,
                password
            }
        });

        if (error) {
            console.error("Error al crear el usuario:", error);
            toast.error("Error al crear el usuario");
        }
        toast.success("Usuario creado correctamente");
        router.push("/users");
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FieldSet>
                    <FieldLegend>Usuario</FieldLegend>
                    <FieldDescription>
                        Registre un nuevo usuario
                    </FieldDescription>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                Nombre
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
                            <FieldLabel htmlFor="checkout-7j9-card-email-ey6">
                                Correo
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-email-ey6"
                                {...form.register("email")}
                                placeholder="pedro.perez@gmail.com"
                                required
                            />
                            {form.formState.errors.email && <FieldError>{form.formState.errors.email.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                Contraseña
                            </FieldLabel>
                            <Input
                                id="checkout-7j9-card-number-uw1"
                                {...form.register("password")}
                                type="password"
                                required
                            />
                            {form.formState.errors.password && <FieldError>{form.formState.errors.password.message}</FieldError>}
                        </Field>

                    </FieldGroup>
                </FieldSet>
                <Field orientation="horizontal">
                    <Button type="submit" className="cursor-pointer">Registrar</Button>
                    <Button variant="outline" type="button" className="cursor-pointer" onClick={() => router.push("/users")}>
                        Cancelar
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )

}