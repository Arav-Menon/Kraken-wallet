import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../../packages/db";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../../lib/auth";

const prisma = new PrismaClient(); // Fixed typo

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions) as Session;

        if (!session?.user?.id) {
            return NextResponse.json({
                message: "User not logged in"
            }, { status: 401 });
        }

        const { receiverName, bankName, number, amount } = await req.json();
        const transferAmount = parseInt(amount); // Convert to integer

        if (isNaN(transferAmount) || transferAmount <= 0) {
            return NextResponse.json({
                message: "Invalid amount"
            }, { status: 400 });
        }

        const transfer = await prisma.$transaction(async (tx) => {
            const receiver = await tx.user.findFirst({
                where: {
                    name: receiverName,
                    bankName: bankName,
                    number: number
                }
            });

            if (!receiver) {
                throw new Error("Receiver not found");
            }

            const senderBalance = await tx.balance.findUnique({
                where: { userId: session.user.id }
            });

            if (!senderBalance || senderBalance.amount < transferAmount) {
                throw new Error("Insufficient balance");
            }

            await tx.balance.upsert({
                where: { userId: receiver.id },
                create: { userId: receiver.id, amount: transferAmount },
                update: { amount: { increment: transferAmount } }
            });

            await tx.balance.update({
                where: { userId: session.user.id },
                data: { amount: { decrement: transferAmount } }
            });

            await tx.balance.update({
                where: { userId: receiver.id },
                data: { amount: { increment: transferAmount } }
            });

            return await tx.transfer.create({
                data: {
                    amount: transferAmount,
                    senderId: session.user.id,
                    receiverId: receiver.id,
                    status: 'Success'
                }
            });
        });

        

        return NextResponse.json({
            message: "Transfer complete",
            transfer
        }, { status: 200 });

    } catch (error) {
        console.error('Transfer error:', error);
        return NextResponse.json({
            message: (error instanceof Error ? error.message : "Transfer failed")
        }, { status: 400 });
    }
}