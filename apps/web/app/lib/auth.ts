import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "../../../../packages/db";
import { inputValidationSignin } from "../../../../packages/lib/inputValidation";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { DefaultSession, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

declare module "next-auth" {
    interface Session {
        user: {
            id: number,
            email: string,
            name: string
        } & DefaultSession['user']
    }
}

export const authOptions = {

    providers: [

        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },

            //@ts-ignore
            async authorize(credentials, req) {

                try {

                    const result = inputValidationSignin.safeParse({
                        email: credentials?.email,
                        password: credentials?.password
                    })

                    if (!result.success) {
                        throw new Error("invalid format")
                    }

                    const { email, password } = result.data


                    const existUser = await prisma.user.findFirst({
                        where: {
                            email: credentials?.email
                        }
                    })

                    if (!existUser) {
                        throw new Error("No user found with this email")
                    }

                    const matchPassword = await bcrypt.compare(password, existUser.password)

                    if (!matchPassword) {
                        throw new Error("Invalid password")
                    }

                    return {
                        id: existUser.id,
                        email: existUser.email,
                        name: existUser.name
                    }


                } catch (e) {
                    console.error(e);
                    throw new Error(`Internal server error`)

                }
            }
        })
    ],

    callbacks: {

        //@ts-ignore
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email,
                token.name = user.name
            }
            return token
        },

        async session({ session, token }: { session: Session, token: JWT }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id
                }
            }
        }

    },

    pages: {
        signIn: '/signin',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (if set)
    },

    session: {
        strategy: 'jwt' as const,
        maxAge : 24 * 60 * 60
    }

};