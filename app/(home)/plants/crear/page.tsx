import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PlantForm from "@/components/Plants/plant-form";
import createApolloClient from "@/graphql-client";
import { CompaniesDocument } from "@/graphql/generated/graphql";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const getCompanies = async (accessToken: string) => {
    const client = await createApolloClient({ accessToken });
    const { data, error } = await client.query({
        query: CompaniesDocument,
    });
    if (error) {
        console.error("Error al obtener las empresas:", error);
    }

    return data;
}

export default async function CreatePlantPage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        redirect("/auth/login");
    }
    const companies = await getCompanies(session.accessToken);

    if (!companies) {
        return <div>
            <div className="w-full max-w-full py-4">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">No se encontraron empresas</h1>
                </div>
            </div>
        </div>
    }

    return <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
        <div className="w-full max-w-md">
            <PlantForm companies={companies.companies} accessToken={session.accessToken} />
        </div>
    </div>
}