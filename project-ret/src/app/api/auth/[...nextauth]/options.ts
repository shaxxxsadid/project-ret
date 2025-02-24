import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "your-cool-username" },
                password: { label: "Password", type: "password", placeholder: "your-cool-password" },
            },
            async authorize(credentials) {
                const response = await fetch('http://localhost:3000/api/users/userByFilter?username=' + credentials?.username + '&password=' + credentials?.password)
                const user = await response.json();
                console.log(user[0]);
                if (credentials?.username === user[0].username && credentials?.password === user[0].password) {
                    return {
                        id: user[0]._id as string,
                        name: user[0].username as string,
                        email: user[0].email as string
                    };
                } else {
                    return null
                }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ]

}