"use client"

import { loginApi } from "@/app/actions/loginSubmit";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Alert from "../ui/alert";

const LoginForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  

  const onSubmit = async (data: any) => {
    setLoading(true)
    const formData = data as { email: string, password: string }
    const response = await loginApi(formData)


    console.log(response)
    if (!response.success) {
      setError(true)
      setErrorMessage(response.message)
    } else {
      window.history.pushState({}, '', '/')
    }

    setLoading(false)
  }

  return (
    <form className="flex flex-col items-center gap-4 min-w-72"
      onSubmit={handleSubmit(onSubmit)}
    >
      {error && <Alert message={errorMessage} variant="error" />}
      <label className="text-lg flex flex-col gap-1 w-full">
        Email
        <input
          className="border-2 border-black rounded-lg p-1 text-xl"
          type="email"
          {...register('email', { required: true })}
          placeholder="example@mail.com"
          disabled={loading}
        />
        {
          errors.email?.type === 'required' &&
          <span className="text-red-500">El email es requerido</span>
        }
      </label>
      <label className="text-lg flex flex-col gap-1 w-full">
        Password
        <input
          className="border-2 border-black rounded-lg p-1 text-xl"
          type={passwordVisible ? 'text' : 'password'}
          {...register('password', { required: true, minLength: 8, maxLength: 32 })}
          placeholder="supersecret"
          disabled={loading}
        />
        <label className="flex gap-2">
          <input 
          type="checkbox" 
          checked={passwordVisible} 
          onChange={() => setPasswordVisible(!passwordVisible)} 
          className="ml-2 w-4" />
          Mostrar contraseña.
        </label>
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
      <button className={
        clsx("bg-gray-300 rounded-lg border-2 border-black p-1 w-24 text-lg")
      } type="submit"
        disabled={loading}>
        {loading ? 'Cargando...' : 'Iniciar sesion'}
      </button>
    </form>
  )
}

export default LoginForm