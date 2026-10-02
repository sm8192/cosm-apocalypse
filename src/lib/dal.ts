import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { decrypt } from '@/lib/session'
import { sql } from '@/lib/db'

/**
 * Data Access Layer. Centralizes auth checks so every data read verifies the
 * session close to where the data is used, per the Next.js data-security guide.
 */

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    redirect('/login')
  }

  return { isAuth: true, userId: session.userId }
})

export const getCurrentUser = cache(async () => {
  const session = await verifySession()

  try {
    const rows = (await sql`
      SELECT id, name, created_at
      FROM users
      WHERE id = ${session.userId}
    `) as { id: string; name: string; created_at: string }[]

    return rows[0] ?? null
  } catch (error) {
    console.error('Failed to fetch current user:', error)
    return null
  }
})
