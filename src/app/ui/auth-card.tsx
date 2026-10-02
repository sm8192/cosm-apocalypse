export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-black">
      <div className="w-full max-w-sm rounded-2xl border border-black/[.06] bg-white p-8 shadow-sm dark:border-white/[.1] dark:bg-zinc-950">
        <div className="mb-8 flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            {title}
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  )
}
