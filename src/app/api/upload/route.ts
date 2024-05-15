import prisma from "@/database";
import { registerSchema, UserSchema } from "@/schemas/register.schema";
import { ValidationError } from "@/types/errors.interface";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "papaparse";

export async function POST(request: NextRequest) {

    const form = await request.formData()
    const file: File = form.get('file') as unknown as File

    if (!file) return NextResponse.json({ success: false, message: 'File not found' }, { status: 400 })
    if (file.type !== 'text/csv') return NextResponse.json({ success: false, message: 'Invalid file type' }, { status: 400 })

    const fieldRequired = ['email', 'password']

    const text = await file.text()
    const { data, meta: { fields = [] } } = parse(
        text, {
        header: true,
    }
    )

    // handle errors for endpoint to manage csv.

    if (!data.length) return NextResponse.json({ success: false, message: 'Empty file' }, { status: 400 })
    if (!fieldRequired.every(field => fields.includes(field))) return NextResponse.json({ success: false, message: 'Invalid file' }, { status: 400 })

    let errors: ValidationError[] = []
    let usersNotSaved: UserSchema[] = []

    for (let index = 0; index < data.length; index++) {

        const user = data[index] as UserSchema
        const { error, success, data: dataValidate } = registerSchema.safeParse(user)

        if (!success) {
            errors.push({ index: index + 1, issues: error.issues.map(
                issue => ({ field: issue.path[0], message: issue.message })
            ) })
            usersNotSaved.push(user)
        } else {
            const userExists = await prisma.user.findUnique({ where: { email: dataValidate.email } })

            if(userExists){
                errors.push({ index: index + 1, issues: [{ field: 'email', message: 'Email already exists' }] })
                usersNotSaved.push(user)
                continue
            }

           await prisma.user.create({ data: dataValidate })
        }
    }

    return NextResponse.json({ success: true, errors, data: usersNotSaved, dataSaved: data.length - errors.length }, { status: 200 })
}