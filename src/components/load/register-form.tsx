
import React from 'react'
import { Data, Error, Field } from "@/app/actions/interface/csvresponse.interface"
import { useForm } from 'react-hook-form'
import { IoReload } from "react-icons/io5";


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

    const { register, handleSubmit } = useForm<RegisterCsvForm>()

    const email = errors.find((error) => error.field === Field.Email)
    const name = errors.find((error) => error.field === Field.Name)
    const password = errors.find((error) => error.field === Field.Password)
    const age = errors.find((error) => error.field === Field.Age)
    
    const onSubmit = (data: RegisterCsvForm) => {
        console.log(data)
    }

    return (
        <form className="flex gap-3 items-start" onSubmit={handleSubmit(onSubmit)}>
            <div className="text-3xl">
                {index}
            </div>
            <label className="flex flex-col">
                Email
                <input
                    className="border-2 border-black rounded-lg p-1 text-xl"
                    defaultValue={data.email}
                    type="email" {...register("email", { required: true })} />
                {email?.errors && <p className="text-red-500">{email?.errors}</p>}
            </label>
            <label className="flex flex-col">
                Name
                <input
                    className="border-2 border-black rounded-lg p-1 text-xl"
                    defaultValue={data.name}
                    type="text" {...register("name", { required: true })} />
                {name?.errors && <p className="text-red-500">{name?.errors}</p>}
            </label>
            <label className="flex flex-col">
                Password
                <input
                    className="border-2 border-black rounded-lg p-1 text-xl"
                    defaultValue={data.password}
                    type="password" {...register("password", { required: true })} />
                {password?.errors && <p className="text-red-500">{password.errors}</p>}
            </label>
            <label className="flex flex-col">
                Age
                <input
                    className="border-2 border-black rounded-lg p-1 text-xl"
                    defaultValue={data.age}
                    type="text" {...register("age", { required: true })} />
                {age?.errors && <p className="text-red-500">{age.errors}</p>}
            </label>
            <div className="pt-6">
                <button className="flex gap-1 items-center justify-center bg-black text-white p-2 rounded-lg w-28" type="submit">
                    <IoReload />
                    Reintentar
                </button>
            </div>
        </form>
    )
}

export default RegisterCsvForm