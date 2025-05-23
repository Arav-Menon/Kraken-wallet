import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "../../../../packages/db";
import { inputValidationSignin } from "../../../../packages/lib/inputValidation";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();

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

        async jwt({ token, user }: { token: any, user?: any }) {
            if (user) {
                token.id = user.id
            }
            return token
        },

        async session({ session, token }: { session: any, token: any }) {
            if (token) {
                session.user.id = token.id
            }
            return session
        }

    },

    pages: {
        // signIn: '/signin',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (if set)
    },

    session: {
        strategy: 'jwt'
    }

};