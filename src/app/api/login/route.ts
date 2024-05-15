import { loginSchema } from "@/schemas";
import { errorApiHandler } from "@/utils/errors/error-api";
import { NextRequest, NextResponse } from "next/server";
import { UserService } from "./user.service";
import { cookies } from "next/headers";

const userService = new UserService()

export async function POST(request: NextRequest) {

    try {
        const { data, error } = await loginSchema.safeParseAsync(await request.json());

        if (error) {

            let errors: {field: string | number, message: string}[] = []

            error.issues.forEach(issue => {
                errors.push({
                    field: issue.path[0],
                    message: issue.message
                })
            })
            
            return NextResponse.json({ success: false, message: 'Invalid data', errors, statusCode: 400 }, { status: 400 })
        }

        const loginData = await userService.login(data.email, data.password)

        cookies().set('token', loginData.token)

        return NextResponse.json(loginData, { status: 200 })

    } catch (err) {
        return errorApiHandler(err)
    }
}