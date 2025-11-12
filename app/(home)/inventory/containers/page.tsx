import createApolloClient from "@/graphql-client";
import { ContainersDocument } from "@/graphql/generated/graphql";
import { ContainersDataTable } from "@/components/containers/containers-datatable";

export default async function ContainersPage({ accessToken }: { accessToken: string }) {

    const { data, error } = await (await createApolloClient({ accessToken })).query({
        query: ContainersDocument,
        errorPolicy: 'ignore'
    });

    if (error) {
        console.error("Error al obtener los tanques:", error);
        return <div>
            <h1>Error al obtener los tanques</h1>
            <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
    }

    return <div>
        <ContainersDataTable data={data?.containers || []} />
    </div>
}