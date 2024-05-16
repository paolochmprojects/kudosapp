import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// extend NextRequest whit user data

declare module "next/server" {
    interface NextRequest {
        user?: {
            id: string
        }
    }
}

export async function middleware(request: NextRequest) {

    
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
    ]
}