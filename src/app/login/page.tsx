import LoginForm from '@/components/auth/login-form'
import { type Metadata } from 'next'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import React from 'react'

export const metadata: Metadata = {
    title: "Kudos - Login",
    description: "Pagina de inicio de sesión",
}

const LoginPage = () => {
    
    return (<main className="flex flex-col gap-8 h-full justify-center items-center">
        <h1 className="text-5xl p-4">
            Sistema de Carga de datos
        </h1>
        <LoginForm/>
    </main>
    )
}

export default LoginPage