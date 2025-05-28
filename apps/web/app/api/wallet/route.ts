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
                throw new Error("User information is missing");
            }

            const balance = await tx.balance.upsert({
                where: { userId: session.user.id },
                update: {
                    amount: { increment: parseInt(amount) }
                },
                create: {
                    id: session.user.id,
                    amount: parseInt(amount),
                    userId: session.user.id
                }
            })

            return balance;

        })

        return NextResponse.json({
            message: "Balance updated succesfully",
            data: transaction
        }, { status: 200 })

    } catch (e) {
        console.log(e)
    }

}

export async function GET() {

    try {

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(`You're not loggedIn`)
        }

        const getBalanceData = await prisma.balance.findUnique({
            where: {
                userId: session.user.id as number
            },
        })

        if (!getBalanceData) {
            return NextResponse.json({
                message: 'No balance found',
                balance: 0,
            }, { status: 200 })
        }

        return NextResponse.json({
            message: 'Balance fetch succesfully',
            getBalanceData
        }, { status: 200 })

    } catch (e) {
        console.error('Faild to get data from db', e)
        return NextResponse.json({
            message: 'Internal server error', e
        }, { status: 500 });
    }
}