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

    const token = cookies().get('token')?.value
    
    if (request.nextUrl.pathname === '/' &&  !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (request.nextUrl.pathname === '/login' && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
}