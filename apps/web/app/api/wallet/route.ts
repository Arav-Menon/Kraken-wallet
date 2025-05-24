import { getServerSession, Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";
import { PrismaClient } from "../../../../../packages/db";

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {

    try {

        // @ts-ignore
        const session = await getServerSession(authOptions) as Session;

        console.log(`Debug session : ${session}`)

        if (!session?.user?.id) {
            return NextResponse.json({
                message: `You're not logged In`
            }, { status: 404 })
        }

        const { bankName, amount, locked } = await req.json();

        const transaction = await prisma.$transaction(async (tx) => {

            if (!session.user || !session.user.id) {
                throw new Error("User information is missing in session.");
            }

            const balance = await tx.balance.upsert({
                where: { userId: session.user.id },
                update: {
                    amount: { increment: amount }
                },
                create: {
                    id: session.user.id,
                    amount: amount,
                    userId: session.user.id
                }
            })

            return balance;

        })

        return NextResponse.json({
            message: "Balance updated succesfully",
            data: transaction
        })

    }catch (e) {
        console.log(e) 
    }

}