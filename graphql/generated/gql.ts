/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    expiresIn\n    token\n    user {\n      id\n      email\n      name\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n}": typeof types.LoginDocument,
    "query getPlants {\n  plants {\n    id\n    code\n    name\n    address\n    phone\n    email\n    isActive\n    updatedAt\n    createdAt\n    company {\n      id\n      name\n    }\n  }\n}": typeof types.GetPlantsDocument,
    "query Me {\n  me {\n    id\n    email\n    name\n    isActive\n    createdAt\n    updatedAt\n  }\n}": typeof types.MeDocument,
};
const documents: Documents = {
    "mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    expiresIn\n    token\n    user {\n      id\n      email\n      name\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n}": types.LoginDocument,
    "query getPlants {\n  plants {\n    id\n    code\n    name\n    address\n    phone\n    email\n    isActive\n    updatedAt\n    createdAt\n    company {\n      id\n      name\n    }\n  }\n}": types.GetPlantsDocument,
    "query Me {\n  me {\n    id\n    email\n    name\n    isActive\n    createdAt\n    updatedAt\n  }\n}": types.MeDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    expiresIn\n    token\n    user {\n      id\n      email\n      name\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    expiresIn\n    token\n    user {\n      id\n      email\n      name\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getPlants {\n  plants {\n    id\n    code\n    name\n    address\n    phone\n    email\n    isActive\n    updatedAt\n    createdAt\n    company {\n      id\n      name\n    }\n  }\n}"): (typeof documents)["query getPlants {\n  plants {\n    id\n    code\n    name\n    address\n    phone\n    email\n    isActive\n    updatedAt\n    createdAt\n    company {\n      id\n      name\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query Me {\n  me {\n    id\n    email\n    name\n    isActive\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query Me {\n  me {\n    id\n    email\n    name\n    isActive\n    createdAt\n    updatedAt\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;