import { NextResponse, NextRequest } from "next/server";
import * as jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
    try {
        // Get token from cookies
        const token = request.cookies.get('token');

        // If no token, return unauthorized
        if (!token) {
            return NextResponse.json({
                message: "Unauthorized - No token provided"
            }, { status: 401 });
        }

        // Verify token
        const decoded = jwt.verify(
            token.value,
            process.env.JWT_SECRET || 'fallback-secret'
        ) as jwt.JwtPayload;

        // Add user info to request headers
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('user-id', decoded.userId);
        requestHeaders.set('user-email', decoded.email);

        // Return response with modified headers
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });

    } catch (error) {
        console.error('Middleware error:', error);
        return NextResponse.json({
            message: "Unauthorized - Invalid token"
        }, { status: 401 });
    }
}

// Configure which routes to protect
export const config = {
    matcher: [
        '/api/user/profile/:path*',
        '/api/user/transactions/:path*'
    ]
};