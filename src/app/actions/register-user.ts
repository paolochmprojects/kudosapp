"use server"


interface UserData {
    email: string,
    password: string,
    name: string
    age?: number
}

const HOST_BASE_API = process.env.HOST_BASE_API

export async function registerUser(params: UserData) {
    try {

        const response = await fetch(`${HOST_BASE_API}/api/register`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })


        if (response.ok) {
            return { success: true, message: 'Usuario registrado' }
        }

        if (response.status === 400){
            const { message } = await response.json()
            return { success: false, message: message }
        }


    } catch (error) {
        return { success: false, message: 'Error al registrar usuario' }
    }
}