import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../../../packages/db";
import bcrypt from 'bcrypt';
import { inputValidation } from "../../../../../../packages/lib/inputValidation";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {

    try {

        const body = await req.json();

        const result = inputValidation.safeParse(body)

        if (!result.success) {
            return NextResponse.json({
                error: `Validation falied`,
                issues: result.error.issues
            }, { status: 400 })
        }

        const { name, email, number, bankName, password } = result.data

        const existUser = await prisma.user.findUnique({ where: { email } });

        if (existUser) {
            return NextResponse.json({
                message: `User already exist`
            }, { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                number: number,
                bankName: bankName,
                password: hashedPassword
            }
        })

        return NextResponse.json({
            message: `User is created`,
            user: {
                name: user.name,
                email: user.email,
                number: user.number,
                bankName: user.bankName
            }
        }, { status: 201 })

    } catch (e) {
        console.log(e)
        return NextResponse.json({
            error: `Internal server error`
        }, { status: 500 })
    }

}

export async function GET() {

    try {
        const getProfileInfo = await prisma.user.findMany({
            select : {
                id : true,
                name : true,
                email : true,
                number : true,
                bankName : true,
            }
        })

        return NextResponse.json({
            message : 'your profile info',
            getProfileInfo
        })

    }catch(e) {
        console.log(e)
        return NextResponse.json({
            message : "Internal server error",
        })
    }
}