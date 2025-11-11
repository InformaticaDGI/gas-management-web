import createApolloClient from "@/graphql-client";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginDocument } from "@/graphql/generated/graphql";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                if (!credentials) throw new Error('Credentials are required');

                const client = createApolloClient();


                const { data, error } = await client.mutate({
                    mutation: LoginDocument,
                    variables: {
                        input: {
                            email: credentials.email,
                            password: credentials.password
                        }
                    }
                })


                if (error || !data) throw new Error('Invalid credentials');

                const { user, token: accessToken, expiresIn } = data.login;

                const id = user.id;
                const email = user.email;
                const name = user.name;

                return {
                    id,
                    email,
                    name,
                    accessToken,
                    expiresIn
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if(user) {
                token.id = user.id;
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.sub as string;
            session.accessToken = token.accessToken;
            return session;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };