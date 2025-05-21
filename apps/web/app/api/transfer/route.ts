import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../../packages/db";

const primsa = new PrismaClient();

export async function POST(req: NextRequest) {

    try {

        const senderId = req.headers.get('sender-id')

        if (!senderId) {
            return NextResponse.json({
                message: "Unauthorizd - No sender ID"
            })
        }

        const { receiverName, bankName, number, amount } = await req.json();

        const transfer = await primsa.$transaction(async (tx) => {

            const receiver = await tx.user.findFirst({
                where: {
                    name: receiverName,
                    bankName: bankName,
                    number: number
                }
            })

            if (!receiver) {
                return NextResponse.json({
                    message: "User did not exist"
                })
            }

            try {

                await tx.balance.update({
                    where: { userId: parseInt(senderId) },
                    data: { amount: { decrement: amount } }
                })

                await tx.balance.update({
                    where: { userId: receiver.id },
                    data: { amount: { increment: amount } }
                })

                return await tx.transfer.create({
                    data: {
                        amount: amount,
                        senderId: parseInt(senderId),
                        receiverId: receiver.id,
                        status: 'Success'
                    }
                })

            } catch (e) {

                return await tx.transfer.create({
                    data: {
                        amount: amount,
                        senderId: parseInt(senderId),
                        receiverId: receiver.id,
                        status: 'Success'
                    }
                })

            }

        });

        return NextResponse.json({
            message: `Transfer complete`,
            transfer
        })

    } catch (e) {
        console.log(e)
    }

}