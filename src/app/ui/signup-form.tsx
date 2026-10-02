'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { signup } from '@/app/actions/auth'

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="username"
          placeholder="Ada Lovelace"
          className="h-11 rounded-lg border border-zinc-300 bg-white px-3 text-sm text-black outline-none transition-colors focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-100"
        />
        {state?.errors?.name && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          className="h-11 rounded-lg border border-zinc-300 bg-white px-3 text-sm text-black outline-none transition-colors focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-100"
        />
        {state?.errors?.password && (
          <div className="text-sm text-red-600 dark:text-red-400">
            <p>Password must:</p>
            <ul className="list-inside list-disc">
              {state.errors.password.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {state?.message && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300"
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="h-11 rounded-full bg-foreground text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-60 dark:hover:bg-[#ccc]"
      >
        {pending ? 'Creating account…' : 'Create account'}
      </button>

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
        >
          Sign in
        </Link>
      </p>
    </form>
  )
}
