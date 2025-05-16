import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "../../../../packages/db";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const authOptions = {

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                name: { label: "Username", type: "text", placeholder: "jsmith" },
                email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
                number : { label : "number", type : "number", placeholder : "Enter your phone number" },
                bankName : { label: "Bank name", type : "text", placeholder : "Bank name" },
                password: { label: "Password", type: "password" }
            },

            //@ts-ignore
            async authorize(credentials, req) {

                if (!credentials?.name || !credentials?.email || !credentials?.password) {
                    throw new Error('Fields are missing');
                }

                const existUser = await prisma.user.findFirst({
                    where: {
                        email: credentials?.email
                    }
                })

                if (existUser) {
                    return {
                        //@ts-ignore
                        id: credentials?.id.toString(),
                        name: credentials?.name,
                        email: credentials?.email
                    }
                }


                try {

                    const user = await prisma.user.create({
                        data: {
                            name: credentials?.name,
                            email: credentials?.email,
                            //@ts-ignore
                            number: credentials?.number,
                            bankName: credentials?.bankName,
                            password: credentials?.password
                        }
                    })

                    return {
                        you_info: {
                            name: credentials?.name,
                            email: credentials?.email
                        }
                    }

                } catch (e) {
                    NextResponse.json(`Internal server error`);
                    console.log(e)
                }
            }
        })
    ]

}