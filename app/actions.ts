'use server';
import { API_BASE_URL } from "@/lib/constants";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { CreateContainerDocument, GetPlantsDocument } from "@/graphql/generated/graphql";


export type CreateContainerInput = {
    plantId: string;
    name: string;
    maxCapacityL: number;
    currentInventoryL: number;
}

export const createApolloClient = async () => {

    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        redirect("/auth/login");
    }

    const headers: Record<string, string> = {};
  
    const authorization = session.accessToken && `Bearer ${session.accessToken}`;
    if (authorization) {
      headers['Authorization'] = authorization;
    }
    return new ApolloClient({
      link: new HttpLink({ uri: API_BASE_URL, headers }),
      cache: new InMemoryCache(),
    });
  }

export async function getPlants() {
    const client = await createApolloClient();
    const { data, error } = await client.query({
        query: GetPlantsDocument,
        errorPolicy: 'ignore'
    });
    return {
        plants: data?.plants || [],
        error: error ? error.message : null,
    };
}

export async function createContainer(container: CreateContainerInput) {
    const client = await createApolloClient();
    const { plantId, name, maxCapacityL, currentInventoryL } = container;
    console.log({ plantId, name, maxCapacityL, currentInventoryL });
    const { error, data } = await client.mutate({
        mutation: CreateContainerDocument,
        variables: {
            plantId,
            name,
            maxCapacityL,
            currentInventoryL,
        },
    });


    return {
        error,
        data
    };
}