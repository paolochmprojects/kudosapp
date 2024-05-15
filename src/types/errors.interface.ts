import { UserSchema } from "@/schemas/register.schema"

export interface ValidationError {
    index: number 
    issues: { field: string | number, message: string }[] 
}

export interface SuccessCSVResponse {
    success: boolean
    data: UserSchema[]
    errors: ValidationError[]
    dataSaved: number
}