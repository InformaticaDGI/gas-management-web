import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/app/actions";

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

                const { data, error } = await login({
                    email: credentials.email,
                    password: credentials.password
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
            if (user) {
                token.id = user.id;
                token.accessToken = user.accessToken;
                token.expiresIn = user.expiresIn;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.sub as string;
            session.accessToken = token.accessToken;
            session.expiresIn = token.expiresIn;
            return session;
        }
    },
    session: {
        maxAge: 86400,
        strategy: "jwt"
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };