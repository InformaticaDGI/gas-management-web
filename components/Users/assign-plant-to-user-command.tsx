"use client"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { Check, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import createApolloClient from "@/graphql-client"
import { AssignUserToPlantDocument, UserRole } from "@/graphql/generated/graphql"
import { toast } from "sonner"


export function AssignPlantToUserCommand({ userPlants, userId, plants, accessToken }: {
    userPlants: string[],
    userId: string,
    plants: {
        __typename?: "Plant",
        id: string,
        code: string,
        name: string,
        address: string,
        phone: string,
        email: string,
        isActive: boolean,
        updatedAt: any,
        createdAt: any,
        company: {
            id: string,
            name: string
        }
    }[],
    accessToken: string
}) {
    const [values, setValues] = useState<string[]>(userPlants)

    const handleAssignPlants = async (plantId: string) => {
        if(userPlants.includes(plantId)) {
            toast.error("La planta ya está asignada");
            return;
        }
        const client = await createApolloClient({ accessToken });
        const { error } = await client.mutate({
            mutation: AssignUserToPlantDocument,
            variables: {
                userId,
                plantId,
                role: UserRole.AdminPlanta,
            },
        });
        if (error) {
            console.error("Error al asignar la planta:", error);
            toast.error("Error al asignar la planta");
        }
        setValues([...values, plantId]);
        toast.success("Planta asignada correctamente");
    }

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
                <MoreHorizontal />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuGroup>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Asignar plantas</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="p-0">
                        <Command >
                            <CommandInput
                                placeholder="Filtrar plantas..."
                                autoFocus={true}
                                className="h-9"
                            />
                            <CommandList>
                                <CommandEmpty>No se encontraron plantas.</CommandEmpty>
                                <CommandGroup>
                                    {plants.map((plant) => (
                                        <CommandItem
                                            key={plant.id}
                                            value={plant.id}
                                            onSelect={(value) => handleAssignPlants(value)}
                                        >
                                            {plant.name}
                                            <Check
                                                className={cn(
                                                    "ml-auto",
                                                    values.includes(plant.id) ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                    Eliminar
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
}
