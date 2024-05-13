import prisma from "@/database";
import { BadRequestException } from "@/utils/errors/errors";
import { Role, User } from "@prisma/client";
import { compare, genSalt, hash } from "bcrypt"
import { sign } from "jsonwebtoken"

interface NewUser {
    email: string
    password: string
    age?: number
    name?: string
}


export class UserService {
    async findUserByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    async login(email: string, password: string) {
        let user = await this.findUserByEmail(email)
        if (!user) {
            user = await this.createNewAdminUser({ email, password })
        }

        const isPasswordValid = await compare(password, user.password)

        if (!isPasswordValid) {
            throw new BadRequestException('Invalid credentials')
        }

        const token = sign({ id: user.id }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '1d'
        })

        user.password = '*********************'

        return {
            success: true,
            statusCode: 200,
            message: 'Login successful',
            token,
            data: user
        } 
    }

    async createNewAdminUser(newUser: NewUser) {
        newUser.password = await this.encryptPassword(newUser.password)
        return await prisma.user.create({
            data: {
                ...newUser,
                role: Role.ADMIN
            }
        })
    }

    async createNewUser(newUser: NewUser) {
        newUser.password = await this.encryptPassword(newUser.password)
        return await prisma.user.create({
            data: {
                ...newUser
            }
        })
    }

    private async encryptPassword(password: string): Promise<string> {
        const salt = await genSalt()
        return await hash(password, salt)
    }
}