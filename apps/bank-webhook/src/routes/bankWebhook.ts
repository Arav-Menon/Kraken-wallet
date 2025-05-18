import { Router } from 'express';
import { PrismaClient } from '../../../../packages/db'
export const bankWebhook = Router();

const prisma = new PrismaClient();

bankWebhook.post('/bankWebhook', async (req, res) => {

    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }

    try {

        await prisma.$transaction([
            prisma.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    //@ts-ignore
                    increment: Number(paymentInformation.amount)
                }
            })
        ])

        await prisma.onRampTransaction.updateMany({
            where: {
                token: paymentInformation.token
            },
            data: {
                status: 'Success'
            }
        })

        res.status(200).json({
            message: 'captured'
        })

    }catch(e) {
        console.log(e)
        res.status(500).json({
            message : `internal server error`
        })
    }


})