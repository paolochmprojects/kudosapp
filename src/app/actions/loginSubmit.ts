"use server"

import { cookies } from "next/headers"

const HOST_BASE_API = process.env.HOST_BASE_API

interface LoginResponse {
    token: string
}

interface SubmitReponse {
    success: boolean,
    message: string
}

export async function loginApi(params: { email: string, password: string }): Promise<SubmitReponse> {
    try {
        const response = await fetch(`${HOST_BASE_API}/api/login`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })

        if (response.ok) {
            const { token } = await response.json() as LoginResponse
            cookies().set('token', token, {
                secure: true, 
                httpOnly: true, 
                maxAge: 60 * 1
            })
            return { success: true, message: 'Sesion iniciada' }
        } else {
            const { message } = await response.json() as { message: string }
            return { success: false, message: message }
        }

    } catch (error) {
        console.log(error)
        return { success: false, message: 'Error al iniciar sesion' }
    }

}