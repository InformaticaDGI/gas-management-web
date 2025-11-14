'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreHorizontalIcon } from "lucide-react"
import { toast } from "sonner"
import { deleteCustomer } from "@/app/actions"
import { AlertDialog, AlertDialogFooter, AlertDialogAction, AlertDialogCancel, AlertDialogHeader, AlertDialogDescription, AlertDialogContent, AlertDialogTitle } from "../ui/alert-dialog"
import { useState } from "react"
import Link from "next/link"
import { GetCustomersQuery } from "@/graphql/generated/graphql"

export function CustomerActions({ 
    customer, 
    onDelete 
}: { 
    customer: GetCustomersQuery['customers'][number]
    onDelete: (customerId: string) => void
}) {
    const [open, setOpen] = useState(false)

    const handleDelete = async () => {
        const { error } = await deleteCustomer(customer.id);
        if (error) {
            console.error("Error al eliminar el cliente:", error);
            toast.error("Error al eliminar el cliente");
            return;
        }
        toast.success("Cliente eliminado correctamente");
        setOpen(false);
        onDelete(customer.id); // Actualiza el estado local sin recargar la página
    }

    return <>
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                    <MoreHorizontalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href={`/inventory/customers/edit/${customer.cedulaRif}`}>Editar</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive" className="text-red-600 cursor-pointer" onClick={() => setOpen(true)}>Eliminar</DropdownMenuItem>
                </DropdownMenuGroup>
                
            </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro de querer eliminar este cliente?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no puede ser deshecha. Esto eliminará permanentemente el cliente y sus datos de nuestros servidores.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700 cursor-pointer" onClick={handleDelete}>Eliminar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>

}

