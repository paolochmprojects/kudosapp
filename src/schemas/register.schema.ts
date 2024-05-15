import { z } from "zod"
import { loginSchema } from "./login.schema"


export const registerSchema = z.object({
    ...loginSchema.shape,
    name: z.string().min(2).max(32).optional(),
    age: z.string().optional().transform(value => value ? parseInt(value) : undefined),
})


export type UserSchema = z.infer<typeof registerSchema>