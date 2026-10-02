import 'server-only'
import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set. Add it to your .env file.')
}

// Neon's serverless driver. `sql` is a tagged-template function that runs a
// single SQL statement over HTTP, which is ideal for serverless/edge runtimes
// like Vercel. Interpolated values are sent as parameters, not string-concatenated,
// so this is safe against SQL injection.
export const sql = neon(process.env.DATABASE_URL)
