'use client'
import clsx from 'clsx'
import React, { useRef, useState } from 'react'
import Alert from '../ui/alert'
import { SuccessCSVResponse, ValidationError } from '@/types/errors.interface'
import { UserSchema } from '@/schemas/register.schema'

const DataLoader = () => {

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [loaded, setLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [issues, setIssues] = useState<ValidationError[]>([])
    const [userData, setUserData] = useState<UserSchema[]>([])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        if (!fileInputRef.current) return

        const file = fileInputRef.current.files?.[0]

        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        })

        if (response.ok) {
            const { data, dataSaved, errors } = await response.json() as SuccessCSVResponse
            console.log(data)
            setSuccessMessage(`Se cargaron ${dataSaved} usuarios`)
            setErrorMessage(`En (${errors.length}) de los registros se encontraron errores, corrijalos y vuelva a intentarlo`)
            setIssues(errors)
            setUserData(data)
        }
        setLoading(false)
        setLoaded(true)
    }

    async function handleRetry(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        // get data form from event

        const form = event.currentTarget

        const formData = new FormData(form)

        const data = Object.entries(formData)
    
        console.log(data)
    }

    return (<>
        {!loaded ?
            <div className="w-full h-full flex items-center justify-center">
                <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
                    <label htmlFor="file" className="text-xl">Selecciona un archivo de carga</label>
                    <input
                        ref={fileInputRef}
                        name="file"
                        className="file:bg-gray-300 file:rounded-lg file:border-2 file:border-black file:p-1 file:text-sm"
                        type="file"
                        id="file"
                        required />
                    <button
                        disabled={loading || loaded}
                        type="submit"
                        className={clsx("bg-gray-300 rounded-lg border-2 border-black p-1 w-24 text-lg", loading ? 'opacity-30' : '')}>
                        {loading ? 'Cargando...' : 'Subir archivo'}
                    </button>
                </form>
            </div>
            :
            <div className="w-full h-full relative">
                <div className="flex items-center justify-center py-6 px-20">
                    <Alert message={successMessage} variant="success" />
                </div>
                <button
                    className="absolute top-5 right-5 bg-gray-300 rounded-lg border-2 border-black p-1 w-24 text-lg"
                    onClick={() => setLoaded(false)}
                >
                    Nuevo archivo
                </button>

                <p className="text-2xl p-6">{errorMessage}</p>
                <div className="flex flex-col justify-center gap-4 py-6 overflow-scroll">
                    {issues.map((iss, index) =>
                        <form key={index} className="flex items-center gap-2 px-6" onSubmit={handleRetry}>
                            <div className="flex flex-col justify-start">
                                <label htmlFor="name">Nombre</label>
                                <input
                                    className={clsx(
                                        "border-2  rounded-lg h-10 w-full px-4 text-xl",
                                        iss.issues.find((iss) => iss.field === 'name') ? 'border-red-500 text-red-500' : 'border-black'
                                    )}
                                    name="name"
                                    defaultValue={userData[index]?.name ? userData[index].name : ''}
                                    type="text" />
                                {iss.issues.find((iss) => iss.field === 'name') && <p className='text-red-500'>{iss.issues.find((iss) => iss.field === 'name')?.message}</p>}
                            </div>
                            <div className="flex flex-col justify-start">
                                <label htmlFor="email">Correo</label>
                                <input
                                    className={clsx(
                                        "border-2  rounded-lg h-10 w-full px-4 text-xl",
                                        iss.issues.find((iss) => iss.field === 'email') ? 'border-red-500 text-red-500' : 'border-black'
                                    )}
                                    name="email"
                                    defaultValue={userData[index]?.email ? userData[index].email : ''}
                                    type="email" />
                                {iss.issues.find((iss) => iss.field === 'email') && <p className='text-red-500'>{iss.issues.find((iss) => iss.field === 'email')?.message}</p>}
                            </div>
                            <div className="flex flex-col justify-start">
                                <label htmlFor="edad">Edad</label>
                                <input
                                    className={clsx(
                                        'border-2 border-black rounded-lg h-10 w-full px-4 text-xl',
                                        iss.issues.find((iss) => iss.field === 'age') ? 'border-red-500 text-red-500' : 'border-black')}
                                    name="edad"
                                    defaultValue={userData[index]?.age ? userData[index].age : ''}
                                    type="number" />
                                {iss.issues.find((iss) => iss.field === 'age') && <p className='text-red-500'>{iss.issues.find((iss) => iss.field === 'age')?.message}</p>}
                            </div>
                            <div className="flex flex-col justify-start">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    className={clsx(
                                        'border-2 border-black rounded-lg h-10 w-full px-4 text-xl',
                                        iss.issues.find((iss) => iss.field === 'password') ? 'border-red-500 text-red-500' : 'border-black'
                                    )}
                                    name="password"
                                    defaultValue={userData[index]?.password ? userData[index].password : ''}
                                    type="password" />
                                {iss.issues.find((iss) => iss.field === 'password') && <p className='text-red-500'>{iss.issues.find((iss) => iss.field === 'password')?.message}</p>}
                            </div>
                            <button className="bg-gray-300 rounded-lg border-2 border-black p-1 w-24 text-lg">
                                Reintentar
                            </button>

                        </form>)}
                </div>

            </div>}

    </>)
}

export default DataLoader