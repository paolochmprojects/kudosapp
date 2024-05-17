'use client'
import clsx from 'clsx'
import React, { useRef, useState } from 'react'
import Alert from '../ui/alert'
import { loadUserData } from '@/app/actions/load-user'
import { Result } from '@/app/actions/interface/csvresponse.interface'
import RegisterCsvForm from './register-form'

const DataLoader = () => {

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [loaded, setLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [results, setResults] = useState<Result[]>([])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        if (!fileInputRef.current) return

        const file = fileInputRef.current.files?.[0]

        if (!file) return

        const formData = new FormData()
        formData.append('file', file)
        const reponse = await loadUserData(formData)


        if (!reponse.success) {
            setErrorMessage(reponse.message)
            setLoading(false)
            return
        }

        setSuccessMessage(reponse.message)
        setErrorMessage(`The (${reponse.result.length}) record listed bellow encountered errors, Please reactify these issues and retry.`)
        setResults(reponse.result)
        setLoading(false)
        setLoaded(true)
    }

    function handleCancel() {
        setLoaded(false)
        setSuccessMessage('')
        setErrorMessage('')
    }

    return (<>
        {!loaded ?
            <div className="w-full h-full flex items-center justify-center">

                <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
                    {errorMessage !== '' && <Alert message={errorMessage} variant="error" />}
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
                    onClick={handleCancel}
                >
                    Nuevo archivo
                </button>

                <p className="text-2xl p-6">{errorMessage}</p>
                <div className="flex flex-col mx-auto items-center max-h-[50vh] gap-4 py-6 px-3 overflow-y-auto">
                    {results.map((result, index) => (
                        <RegisterCsvForm key={index} index={result.index} data={result.data} errors={result.errors} />
                    ))}
                </div>

            </div>}

    </>)
}

export default DataLoader