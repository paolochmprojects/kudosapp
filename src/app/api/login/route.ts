import prisma from "@/database";
import { loginSchema } from "@/schemas";
import { errorApiHandler } from "@/utils/errors/error-api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    try {
        const { data } = await loginSchema.safeParseAsync(await request.json());

    } catch (err) {
        return errorApiHandler(err)
    }

    return NextResponse.json({ message: "Hello, Next.js!" }, { status: 200 })
}