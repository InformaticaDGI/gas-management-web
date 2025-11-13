'use server';
import { API_BASE_URL } from "@/lib/constants";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { AssignUserToPlantDocument, CompaniesDocument, CreateContainerDocument, CreateCustomerDocument, CreatePlantDocument, CreateProductDocument, CreateUserDocument, GetCustomersDocument, CustomerType, ExecuteDailyClosingDocument, GetDailyClosingsDocument, GetPlantsDocument, GetProductsDocument, LoginDocument, MeDocument, ProductType, UnitType, UserRole, UsersDocument, UsersQuery } from "@/graphql/generated/graphql";


export async function createApolloClient({ accessToken }: CreateApolloClientProps = {}) {

    const headers: Record<string, string> = {};

    const authorization = accessToken && `Bearer ${accessToken}`;
    if (authorization) {
        headers['Authorization'] = authorization;
    }

    return new ApolloClient({
        link: new HttpLink({ uri: API_BASE_URL, headers }),
        cache: new InMemoryCache(),
    });
}

/** Queries */

export async function getPlants() {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        redirect("/auth/login");
    }
    const client = await createApolloClient({ accessToken: session.accessToken });
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
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        redirect("/auth/login");
    }
    const client = await createApolloClient({ accessToken: session.accessToken });
    const { data, error } = await client.query({
        query: UsersDocument,
    });
    return {
        users: data?.users || [],
        error: error ? error.message : null,
    };
}

export async function getCompanies() {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        redirect("/auth/login");
    }
    const client = await createApolloClient({ accessToken: session.accessToken });
    const { data, error } = await client.query({
        query: CompaniesDocument,
    });
    return {
        companies: data?.companies || [],
        error: error ? error.message : null,
    };
}

export async function getProducts() {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        redirect("/auth/login");
    }
    const client = await createApolloClient({ accessToken: session.accessToken });
    const { data, error } = await client.query({
        query: GetProductsDocument,
    });

    return {
        products: data?.products || [],
        error: error ? error.message : null,
    };
}

export async function getDailyClosings() {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        redirect("/auth/login");
    }
    console.log({ accessToken: session.accessToken })
    const client = await createApolloClient({ accessToken: session.accessToken });
    const { error, data } = await client.query({
        query: GetDailyClosingsDocument,
    });

    return {
        error: error ? error.message : null,
        dailyClosings: data?.dailyClosings || [],
    };
}

export async function getCustomers() {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        redirect("/auth/login");
    }
    const client = await createApolloClient({ accessToken: session.accessToken });
    const { error, data } = await client.query({
        query: GetCustomersDocument,
    });
    return {
        error: error ? error.message : null,
        customers: data?.customers || [],
    };
}

export async function getMe() {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        redirect("/auth/login");
    }
    const client = await createApolloClient({ accessToken: session.accessToken });
    const { error, data } = await client.query({
        query: MeDocument,
    });
    return {
        error: error ? error.message : null,
        me: data?.me || null,
    };
}

/** Mutations */

export async function login(input: LoginInput) {
    const client = await createApolloClient();
    const { error, data } = await client.mutate({
        mutation: LoginDocument,
        variables: {
            input
        },
    });

    return {
        error,
        data
    }
}

export async function createUser(input: CreateUserInput) {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        redirect("/auth/login");
    }
    const client = await createApolloClient({ accessToken: session.accessToken });
    const { email, password, name } = input;
    const { error, data } = await client.mutate({
        mutation: CreateUserDocument,
        variables: {
            email,
            name,
            password
        },
    });

    return {
        error,
        data
    };
}

export async function createPlant(input: CreatePlantInput) {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        redirect("/auth/login");
    }
    const client = await createApolloClient({ accessToken: session.accessToken });
    const { error, data } = await client.mutate({
        mutation: CreatePlantDocument,
        variables: {
            input
        },
    });

    return {
        error,
        data
    }
}

export async function createContainer(input: CreateContainerInput) {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        redirect("/auth/login");
    }
    const client = await createApolloClient({ accessToken: session.accessToken });
    const { error, data } = await client.mutate({
        mutation: CreateContainerDocument,
        variables: {
            input
        },
    });


    return {
        error,
        data
    };
}

export async function assignUserToPlant(input: AssignUserToPlantInput) {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        redirect("/auth/login");
    }
    const client = await createApolloClient({ accessToken: session.accessToken });
    const { error, data } = await client.mutate({
        mutation: AssignUserToPlantDocument,
        variables: input
    });

    return {
        error,
        data
    };
}

export async function createProduct(input: CreateProductInput) {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        redirect("/auth/login");
    }
    const client = await createApolloClient({ accessToken: session.accessToken });
    const { error, data } = await client.mutate({
        mutation: CreateProductDocument,
        variables: {
            input
        }
    });

    return {
        error,
        data
    };
}

export async function executeDailyClosing(input: ExecuteDailyClosingInput) {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        redirect("/auth/login");
    }
    const client = await createApolloClient({ accessToken: session.accessToken });
    const { error, data } = await client.mutate({
        mutation: ExecuteDailyClosingDocument,
        variables: input
    });
    return {
        error,
        data
    };
}

export async function createCustomer(input: CreateCustomerInput) {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        redirect("/auth/login");
    }
    const client = await createApolloClient({ accessToken: session.accessToken });
    const { error, data } = await client.mutate({
        mutation: CreateCustomerDocument,
        variables: { input }
    });
    return {
        error,
        data
    };
}

/** Input Types */

export type CreateCustomerInput = {
    cedulaRif: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    community: string;
    customerType: CustomerType;
    parish: string;
    state: string;
}

export type ExecuteDailyClosingInput = {
    plantId: string;
    notes?: string;
}

type CreateApolloClientProps = {
    accessToken?: string;
}


type LoginInput = {
    email: string;
    password: string;
}

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

export type CreateUserInput = {
    email: string;
    password: string;
    name: string;
}

export type CreateProductInput = {
    name: string;
    type: ProductType;
    baseCapacity: number;
    baseUnit: UnitType;
    price: number;
    customerType: CustomerType;
}