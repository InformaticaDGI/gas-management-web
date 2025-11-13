import { getPlants, getUsers } from "@/app/actions";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { UserDataTable } from "@/components/users/user-datatable";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import Link from "next/link";

export default async function UsersPage() {
    const [usersData, plantsData] = await Promise.all([getUsers(), getPlants()]);

    if (usersData.error || plantsData.error) {
        return <div>
            <div className="w-full max-w-full py-4">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">No se encontraron usuarios o plantas</h1>
                </div>
            </div>
        </div>
    }

    const { users } = usersData;
    const { plants } = plantsData;

    return <>
        <SiteHeader title="Usuarios">
            <div className="ml-auto flex items-center gap-2">
                <Button size="sm" className="hidden h-7 sm:flex" asChild>
                    <Link href="/users/create">
                        <IconCirclePlusFilled />
                        <span>Crear usuario</span>
                    </Link>
                </Button>
            </div>
        </SiteHeader>
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div>
                    <div className="w-full max-w-full py-4">
                        <UserDataTable data={users} plants={plants} />
                    </div>
                </div>
            </div>
        </div>
    </>
}