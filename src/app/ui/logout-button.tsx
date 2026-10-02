import { logout } from '@/app/actions/auth'

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="h-10 rounded-full border border-black/[.08] px-5 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
      >
        Sign out
      </button>
    </form>
  )
}
