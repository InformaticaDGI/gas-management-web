'use server';
import createApolloClient from "@/graphql-client";
import { GetPlantsDocument } from "@/graphql/generated/graphql";

export async function getPlants() {
    const client = await createApolloClient();
    const { data, error } = await client.query({
        query: GetPlantsDocument,
        errorPolicy: 'ignore'
    });
    return {
        plants: data?.plants || [],
        error,
    };
}