import React from 'react'

interface Props {
  searchParams?: { message: string }
}

export default function Login({ searchParams } : Props) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 h-screen">
      <a
        href="/"
        className="flex items-center absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover group text-sm"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </a>

      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-md" htmlFor="email">
          Teléfono
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6 border-violet-300"
          name="email"
          placeholder="+56912345678"
          required
        />
        <label className="text-md" htmlFor="password">
          Contraseña
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6 border-violet-300"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button
          className="bg-violet-500 rounded-md px-4 py-2 mb-2 text-white dark:text-black"
        >
          Iniciar Sesión
        </button>
        <button
          className="bg-amber-500 border border-foreground/20 rounded-md px-4 py-2 text-white mb-2"
        >
          Registrarse
        </button>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}
