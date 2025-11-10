import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                const username = credentials ? credentials["username"] : "";
                const password = credentials ? credentials["password"] : "";

                const users = [
                    {
                        id: "1",
                        username: "testuser",
                        password: "testpassword",
                        name: "Test User"
                    }
                ]

                const userFound = users.find(user => user.username === username && user.password === password);

                if(!userFound) return null;

                return {
                    id: userFound.id,
                    username: userFound.username,
                    name: userFound.name
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };