import type { Metadata } from 'next'
import { getCurrentUser } from '@/lib/dal'
import LogoutButton from '@/app/ui/logout-button'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  // getCurrentUser() calls verifySession(), which redirects to /login when
  // there is no valid session, so this page is protected.
  const user = await getCurrentUser()

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <header className="flex items-center justify-between border-b border-black/[.06] px-6 py-4 dark:border-white/[.1]">
        <span className="text-sm font-semibold tracking-tight text-black dark:text-zinc-50">
          cosm-apocalypse
        </span>
        <LogoutButton />
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Welcome{user?.name ? `, ${user.name}` : ''} 👋
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          You are signed in{user?.name ? ` as ${user.name}` : ''}. This page is
          protected and only visible to authenticated users.
        </p>
      </main>
    </div>
  )
}
