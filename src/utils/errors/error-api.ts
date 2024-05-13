import { NextResponse } from "next/server"
import { BadRequestException, InternalServerException, NotFoundException, UnauthorizedException } from "./errors"

export const errorApiHandler = (error: any): NextResponse => {

    if (error instanceof NotFoundException) {
        return NextResponse.json({ success: false, message: error.message, statusCode: error.statusCode }, { status: error.statusCode })
    }

    if (error instanceof UnauthorizedException) {
        return NextResponse.json({ success: false, message: error.message, statusCode: error.statusCode }, { status: error.statusCode })
    }

    if (error instanceof BadRequestException) {
        return NextResponse.json({ success: false, message: error.message, statusCode: error.statusCode }, { status: error.statusCode })
    }

    if (error instanceof InternalServerException) {
        return NextResponse.json({ success: false, message: error.message, statusCode: error.statusCode }, { status: error.statusCode })
    }

    return NextResponse.json({ success: false, message: "Internal Server Error", statusCode: 500 }, { status: 500 })

}