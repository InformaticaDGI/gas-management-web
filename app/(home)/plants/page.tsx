import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PlantHeader } from "@/components/Plants/header";
import { PlantDataTable } from "@/components/Plants/plant-datatable";
import createApolloClient from "@/graphql-client";
import { GetPlantsDocument } from "@/graphql/generated/graphql";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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


export default async function PlantsPage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        redirect("/auth/login");
    }
    const response = await getPlants(session.accessToken);

    if (!response) {
        return <div>
            <div className="w-full max-w-full py-4">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">No se encontraron plantas</h1>
                </div>
            </div>
        </div>
    }

    return <>
        <PlantHeader />
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div>
                    <div className="w-full max-w-full py-4">
                        <PlantDataTable data={response.plants} />
                    </div>
                </div>
            </div>
        </div>
    </>
}