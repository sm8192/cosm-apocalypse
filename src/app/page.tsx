import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-4 font-sans dark:bg-black">
      <main className="flex w-full max-w-md flex-col items-center gap-8 text-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50">
            cosm-apocalypse
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Sign in or create an account to get started.
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/login"
            className="flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] sm:w-40"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="flex h-12 items-center justify-center rounded-full border border-solid border-black/[.08] px-6 text-sm font-medium transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] sm:w-40"
          >
            Create account
          </Link>
        </div>
      </main>
    </div>
  )
}
