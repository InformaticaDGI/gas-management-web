'use server';
import { API_BASE_URL } from "@/lib/constants";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { AssignUserToPlantDocument, CompaniesDocument, CreateContainerDocument, CreatePlantDocument, GetPlantsDocument, UserRole, UsersDocument } from "@/graphql/generated/graphql";


export type CreateContainerInput = {
    plantId: string;
    name: string;
    maxCapacityL: number;
    currentInventoryL: number;
}

export type CreatePlantInput = {
    companyId: string;
    name: string;
    code: string;
    address: string;
    phone: string;
    email: string;
}

export type AssignUserToPlantInput = {
    userId: string;
    plantId: string;
    role: UserRole;
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

export async function getUsers() {
    const client = await createApolloClient();
    const { data, error } = await client.query({
        query: UsersDocument,
    });
    return {
        users: data?.users || [],
        error: error ? error.message : null,
    };
}

export async function getCompanies() {
    const client = await createApolloClient();
    const { data, error } = await client.query({
        query: CompaniesDocument,
    });
    return {
        companies: data?.companies || [],
        error: error ? error.message : null,
    };
}

export async function createPlant(plant: CreatePlantInput) {
    const client = await createApolloClient();
    const { error, data } = await client.mutate({
        mutation: CreatePlantDocument,
        variables: plant,
    });

    return {
        error,
        data
    }
}

export async function createContainer(container: CreateContainerInput) {
    const client = await createApolloClient();
    const { plantId, name, maxCapacityL, currentInventoryL } = container;
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

export async function assignUserToPlant(input: AssignUserToPlantInput) {
    const client = await createApolloClient();
    const { error, data } = await client.mutate({
        mutation: AssignUserToPlantDocument,
        variables: input,
    });

    return {
        error,
        data
    };
}