import { assignUserToPlant, getPlants, getUsers } from "@/app/actions";
import { UserDataTable } from "@/components/Users/user-datatable";
import { UserHeader } from "@/components/Users/user-header";

export default async function UsersPage() {
    const [users, plants] = await Promise.all([getUsers(), getPlants()]);

    if (!users || !plants) {
        return <div>
            <div className="w-full max-w-full py-4">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">No se encontraron usuarios o plantas</h1>
                </div>
            </div>
        </div>
    }

    return <>
        <UserHeader />
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div>
                    <div className="w-full max-w-full py-4">
                        <UserDataTable data={users.users.map(user => ({
                            ...user,
                            userPlants: user.userPlants.map(up => ({
                                ...up,
                                plant: up.plant as any
                            }))
                        }))} plants={plants.plants} assignUserToPlant={assignUserToPlant}/>
                    </div>
                </div>
            </div>
        </div>
    </>
}