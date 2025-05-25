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

        const transfer = await prisma.$transaction(async (tx) => {
            // Find receiver
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

            // Check sender's balance
            const senderBalance = await tx.balance.findUnique({
                where: { userId: session.user.id }
            });

            if (!senderBalance || senderBalance.amount) {
                throw new Error("Insufficient balance");
            }

            // Update sender's balance
            await tx.balance.update({
                where: { userId: session.user.id },
                data: { amount: { decrement: amount } }
            });

            // Update receiver's balance
            await tx.balance.update({
                where: { userId: receiver.id },
                data: { amount: { increment: amount } }
            });

            // Create transfer record
            return await tx.transfer.create({
                data: {
                    amount: amount,
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
    }
}