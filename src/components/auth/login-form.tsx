"use client"

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Alert from "../ui/alert";
import clsx from "clsx";

const LoginForm = () => {

  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true)
    if (!emailInputRef.current || !passwordInputRef.current) return

    const email = emailInputRef.current.value
    const password = passwordInputRef.current.value
    const data = JSON.stringify({ email, password })

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
      cache: 'no-cache',
    },)

    if (response.ok) return router.push('/')

    const result = await response.json()

    setError(true)
    setErrorMessage(result.message)

    setLoading(false)
  }


  useEffect(() => {
    setTimeout(() => {
      setError(false)
      setErrorMessage('')
    }, 2000)
  })

  return (<form className="flex flex-col items-center gap-4 min-w-72" onSubmit={handleSubmit}>
    {error && <Alert message={errorMessage} variant="error" />}
    <div className="w-full flex flex-col gap-1">
      <label className="w-full text-xl" htmlFor="email">Email</label>
      <input ref={emailInputRef} name="email" className="border-2 border-black rounded-lg h-10 w-full px-4 text-xl" id="email" type="email" required />
    </div>
    <div className="w-full flex flex-col gap-1">
      <label className="w-full text-xl" htmlFor="password">Password</label>
      <input ref={passwordInputRef} name="password" className="border-2 border-black rounded-lg h-10 w-full px-4 text-xl" id="password" type="password" required />
    </div>
    <button className={clsx("bg-gray-300 rounded-lg border-2 border-black p-1 w-24 text-lg", loading ? 'opacity-30' : '')} type="submit" disabled={loading}>{loading ? 'Loading...' : 'Login'} </button>
  </form>)
}

export default LoginForm