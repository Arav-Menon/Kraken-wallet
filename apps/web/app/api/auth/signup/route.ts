import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../../../packages/db";
import bcrypt from 'bcrypt';
import { inputValidation } from "../../../../../../packages/lib/inputValidation";
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config'

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = inputValidation.safeParse(body);

        if (!result.success) {
            return NextResponse.json({
                error: `Validation failed`,
                issues: result.error.issues
            }, { status: 400 });
        }

        const { name, email, number, bankName, password } = result.data;

        return await prisma.$transaction(async (tx) => {

            const existingUser = await tx.user.findFirst({
                where: {
                    OR: [
                        { email }
                    ]
                }
            });

            if (existingUser) {
                const field = existingUser.email === email ? 'email' : 'phone number';
                return NextResponse.json({
                    message: `User with this ${field} already exists`
                }, { status: 409 });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await tx.user.create({
                data: {
                    name,
                    email,
                    number,
                    bankName,
                    password: hashedPassword
                }
            });

            const token = jwt.sign(
                {
                    userId: user.id,
                    email: user.email,
                },
                process.env.JWT_SECRET || 'fallback-secret',
                { expiresIn: '24h' }
            );

            const response = NextResponse.json({
                message: `User created successfully`,
                user: {
                    name: user.name,
                    email: user.email,
                    number: user.number,
                    bankName: user.bankName
                }
            }, { status: 201 });

            response.cookies.set({
                name: 'token',
                value: token,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
                maxAge: 60 * 60 * 24
            });

            return response;
        });

    } catch (error) {
        console.error(error);
    }
}
