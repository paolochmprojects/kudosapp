"use server"

const HOST_BASE_API = process.env.HOST_BASE_API

export async function loginApi(params:{email: string, password: string}) {
    const response = await fetch(`${HOST_BASE_API}/api/login`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })

    const data = await response.json()
    console.log(data)
    return data
}