import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserDataTable } from "@/components/Users/user-datatable";
import { UserHeader } from "@/components/Users/user-header";
import createApolloClient from "@/graphql-client";
import { GetPlantsDocument, UsersDocument } from "@/graphql/generated/graphql";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const getUsers = async (accessToken: string) => {
    const client = await createApolloClient({ accessToken });
    const { data, error } = await client.query({
        query: UsersDocument,
    });
    if (error) {
        console.error("Error al obtener los usuarios:", error);
        return null;
    }
    return data;
}


const getPlants = async (accessToken: string) => {
    const client = await createApolloClient({ accessToken });
    const { data, error } = await client.query({
        query: GetPlantsDocument,
    });
    if (error) {
        console.error("Error al obtener las plantas:", error);
        return null;
    }
    return data;
}

export default async function UsersPage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        redirect("/auth/login");
    }
    const [users, plants] = await Promise.all([getUsers(session.accessToken), getPlants(session.accessToken)]);

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
                        <UserDataTable data={users.users} plants={plants.plants} accessToken={session.accessToken} />
                    </div>
                </div>
            </div>
        </div>
    </>
}