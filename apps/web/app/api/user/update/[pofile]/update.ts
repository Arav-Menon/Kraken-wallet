import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../../../../packages/db";
import { inputValidationForUpdate } from "../../../../../../../packages/lib/inputValidation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {

    try {

        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({
                message: 'Unauthorize',
            }, { status: 401 })
        }

        const body = await req.json();

        const result = inputValidationForUpdate.safeParse(body);

        if (!result.success) {
            return NextResponse.json({
                message: 'Invalid format',
                error: result.error.issues
            })
        }

        const existUser = await prisma.user.findMany({
            where: {
                //@ts-ignore
                id: userId
            }
        })

        if (!existUser) {
            return NextResponse.json({
                message: 'User not found'
            })
        }

        const updatedUser = await prisma.user.update({
            //@ts-ignore
            where: { id: userId },
            data: result.data,
            select: {
                name: true,
                email: true,
                number: true,
                bankName: true,
                password: true
            }
        })

        return NextResponse.json({
            message: 'profile updated succesfully',
            user: updatedUser
        }, { status: 200 });

    } catch (e) {
        console.log(e);
    }

}

export async function GET() {

    try {

        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({
                message: "Unauthorized"
            }, { status: 401 });
        }

        const getProfileInfo = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                number: true,
                bankName: true,
            }
        })

        return NextResponse.json({
            message: 'your profile info',
            getProfileInfo
        })

    } catch (e) {
        console.log(e)
        return NextResponse.json({
            message: "Internal server error",
        })
    }
}