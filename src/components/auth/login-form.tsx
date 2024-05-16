"use client"

import { loginApi } from "@/app/actions/loginSubmit";
import clsx from "clsx";
import { useForm } from "react-hook-form";

const LoginForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()


  const onSubmit = async (data: any) => {
    const formData = data as {email: string, password: string}
    await loginApi(formData)
    
  }

  return (
    <form className="flex flex-col items-center gap-4 min-w-72"
      onSubmit={handleSubmit(onSubmit)}>
      <label className="text-lg flex flex-col gap-1 w-full">
        Email
        <input
          className="border-2 border-black rounded-lg p-1"
          type="email"
          {...register('email', { required: true })}
        />
        {
          errors.email?.type === 'required' &&
          <span className="text-red-500">El email es requerido</span>
        }
      </label>
      <label className="text-lg flex flex-col gap-1 w-full">
        Password
        <input
          className="border-2 border-black rounded-lg p-1"
          type="password"
          {...register('password', { required: true, minLength: 8, maxLength:32 })}
        />
        {
          errors.password?.type === 'required' &&
          <span className="text-red-500">La contraseña es requerido</span>
        }
        {
          errors.password?.type === 'minLength' &&
          <span className="text-red-500">La contraseña debe tener al menos 8 caracteres</span>
        }
        {
          errors.password?.type === 'maxLength' &&
          <span className="text-red-500">La contraseña debe tener maximo 32 caracteres</span>
        }
      </label>
      <button className={clsx("bg-gray-300 rounded-lg border-2 border-black p-1 w-24 text-lg")} type="submit" >Login </button>
    </form>
  )
}

export default LoginForm