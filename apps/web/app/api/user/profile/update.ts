import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../../../packages/db";
import { inputValidationForUpdate } from "../../../../../../packages/lib/inputValidation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

const prisma = new PrismaClient();


export async function GET() {

    try {

        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({
                message: "Unauthorized"
            }, { status: 401 });
        }

        const getProfileInfo = await prisma.user.findMany({
            where : {
                id : session.user.id as number
            },
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
        }, { status : 200 })

    } catch (e) {
        console.log(e)
        return NextResponse.json({
            message: "Internal server error",
        })
    }
}



// export async function PUT(req: NextRequest) {

//     try {

//         const session = await getServerSession(authOptions)

//         if (!session) {
//             return NextResponse.json({
//                 message: 'Unauthorize',
//             }, { status: 401 })
//         }

//         const body = await req.json();

//         const result = inputValidationForUpdate.safeParse(body);

//         if (!result.success) {
//             return NextResponse.json({
//                 message: 'Invalid format',
//                 error: result.error.issues
//             })
//         }

//         const existUser = await prisma.user.findMany({
//             where: {
//                 //@ts-ignore
//                 id: userId
//             }
//         })

//         if (!existUser) {
//             return NextResponse.json({
//                 message: 'User not found'
//             })
//         }

//         const updatedUser = await prisma.user.update({
//             //@ts-ignore
//             where: { id: userId },
//             data: result.data,
//             select: {
//                 name: true,
//                 email: true,
//                 number: true,
//                 bankName: true,
//                 password: true
//             }
//         })

//         return NextResponse.json({
//             message: 'profile updated succesfully',
//             user: updatedUser
//         }, { status: 200 });

//     } catch (e) {
//         console.log(e);
//     }

// }


// export async function DELETE() {

//     try {

//         const session = await getServerSession(authOptions);

//         if (!session?.user?.id) {
//             return NextResponse.json({
//                 message: `You're not logged In`,
//             }, { status: 404 });
//         }

//         const deleteResult = await prisma.$transaction(async (tx) => {

//             await tx.balance.deleteMany({
//                 where: {
//                     //@ts-ignore
//                     userId: session.user.id
//                 }
//             })

//             await tx.transfer.deleteMany({
//                 where: {
//                     //@ts-ignore
//                     userId: session.user.id
//                 }
//             })

//             const deleteUser = await tx.user.delete({
//                 where: {
//                     id: session.user.id as number
//                 }
//             });

//             return deleteUser;

//         })

//         return NextResponse.json({
//             message: "Profile deleted successfully",
//             user: deleteResult,
//         }, { status: 200 })

//     } catch (e) {
//         console.log(e)
//         return NextResponse.json({
//             message: 'Failed to delete the profile'
//         }, { status: 500 })
//     }

// }