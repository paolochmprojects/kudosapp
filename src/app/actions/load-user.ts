"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Csvresponse } from "./interface/csvresponse.interface"

const HOST_BASE_API = process.env.HOST_BASE_API

export async function loadUserData(formData: FormData) : Promise<Csvresponse> {

    const token = cookies().get('token')
    if (!token) {
        redirect('/login')
    }

    try {

        const response = await fetch(`${HOST_BASE_API}/api/upload`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Authorization': `Bearer ${token.value}`
            },
            body: formData,
        })

        if (response.ok) {
            const data = await response.json() as Csvresponse
            data.message = `${data.total} usuarios cargados correctamente`
            data.success = true
            return data
        }

        if (response.status === 400){
            const data = await response.json()
            return { success: false, message: data.message , result: [], total: 0}
        }

        if (response.status === 401) {
            const data = await response.json()
            if (data.message.startsWith('You need to one of these roles')) {
                return { success: false, message: data.message, result: [], total: 0}
            }

            return redirect('/login')
        }

        return { success: false, message: 'Error al cargar los datos', result: [], total: 0}

    } catch (error) {
        return { success: false, message: 'Error al cargar los datos', result: [], total: 0}
    }
}