
import React, { useState } from 'react'
import { Data, Error, Field } from "@/app/actions/interface/csvresponse.interface"
import { useForm } from 'react-hook-form'
import { IoReload } from "react-icons/io5";
import { registerUser } from '@/app/actions/register-user';
import clsx from 'clsx';


interface RegisterCsvForm {

    email: string
    name: string
    password: string
    age: number | undefined
}

interface RegisterFormProps {
    index: number
    data: Data
    errors: Error[]
}
const RegisterCsvForm = ({ index, data, errors }: RegisterFormProps) => {

    const { register, handleSubmit, formState: { errors: formErrors } } = useForm<RegisterCsvForm>()
    const [passVisible, setPassVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [completed, setCompleted] = useState(false)

    const email = errors.find((error) => error.field === Field.Email)
    const name = errors.find((error) => error.field === Field.Name)
    const password = errors.find((error) => error.field === Field.Password)
    const age = errors.find((error) => error.field === Field.Age)

    const onSubmit = async (data: RegisterCsvForm) => {
        setLoading(true)

        if (!data.age) {
            data.age = undefined
        } else {
            data.age = Number(data.age)
        }

        const response = await registerUser(data)

        if(response?.success) {
            setCompleted(true)
            setLoading(false)
            return
        }

        console.log(response)

        setLoading(false)
    }

    return (
        <form className="flex gap-3 items-start" onSubmit={handleSubmit(onSubmit)}>
            <div className="text-3xl pt-6">
                {index}
            </div>
            <label className="flex flex-col">
                Email
                <input
                    className="border-2 border-black rounded-lg p-1 text-xl"
                    defaultValue={data.email}
                    type="email" {...register("email", { required: true })} />
                {email?.errors && <p className="text-red-500">{email?.errors}</p>}
                {formErrors.email?.type === 'required' && <p className="text-red-500">El email es requerido</p>}
            </label>
            <label className="flex flex-col">
                Name
                <input
                    className="border-2 border-black rounded-lg p-1 text-xl"
                    defaultValue={data.name}
                    type="text" {...register("name", { required: true })} />
                {name?.errors && <p className="text-red-500">{name?.errors}</p>}
                {formErrors.name?.type === 'required' && <p className="text-red-500">El nombre es requerido</p>}
            </label>
            <label className="flex flex-col">
                Password
                <input
                    className="border-2 border-black rounded-lg p-1 text-xl"
                    defaultValue={data.password}
                    type={passVisible ? "text" : "password"} {...register("password", { required: true })} />
                <label className="flex gap-1 items-center">
                    <input
                        type="checkbox"
                        onChange={() => setPassVisible(!passVisible)}
                        className="my-2 h-4" />
                    Mostrar contraseña.
                </label>
                {password?.errors && <p className="text-red-500">{password.errors}</p>}
                {formErrors.password?.type === 'required' && <p className="text-red-500">La contraseña es requerida</p>}
            </label>
            <label className="flex flex-col w-28">
                Age
                <input
                    className="border-2 border-black rounded-lg p-1 text-xl"
                    defaultValue={data.age}
                    type="number"
                    {...register("age", { min: 18, max: 100 })}
                />
                {age?.errors && <p className="text-red-500">{age.errors}</p>}
                {formErrors.age?.type === 'min' && <p className="text-red-500">La edad debe ser mayor a 18</p>}
                {formErrors.age?.type === 'max' && <p className="text-red-500">La edad debe ser menor a 100</p>}
            </label>
            <div className="pt-6">
                <button
                    className={clsx(
                        loading || completed && "opacity-50", 
                        "flex gap-1 items-center justify-center bg-black text-white p-2 rounded-lg w-28"
                    )}
                    type="submit"
                    disabled={loading || completed}>
                    <IoReload />
                    {loading ? 'Cargando...' : 'Reintentar'}
                </button>
            </div>
        </form>
    )
}

export default RegisterCsvForm