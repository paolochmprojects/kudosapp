import React from 'react'

const LoginPage = () => {
    return (<main className="flex flex-col gap-8 h-full justify-center items-center">
        <h1 className="text-5xl p-4">
            Sistema de Carga de datos
        </h1>
        <form className="flex flex-col items-center gap-4 min-w-72" action="">
            <div className="w-full flex flex-col gap-1">
                <label className="w-full text-xl" htmlFor="email">Email</label>
                <input className="border-2 border-black rounded-lg h-10 w-full px-4 text-xl" id="email" type="email" />
            </div>
            <div className="w-full flex flex-col gap-1">
                <label className="w-full text-xl" htmlFor="password">Password</label>
                <input className="border-2 border-black rounded-lg h-10 w-full px-4 text-xl" id="password" type="password" />
            </div>
            <button className="bg-gray-300 rounded-lg border-2 border-black p-1 w-24 text-lg" type="submit">Login</button>
        </form>
    </main>
    )
}

export default LoginPage