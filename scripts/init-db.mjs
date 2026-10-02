import { neon } from '@neondatabase/serverless'
import { readFileSync } from 'node:fs'

const env = readFileSync(new URL('../.env', import.meta.url), 'utf8')
const match = env.match(/^DATABASE_URL\s*=\s*"?([^"\n]+)"?/m)
if (!match) {
  console.error('DATABASE_URL not found in .env')
  process.exit(1)
}

const sql = neon(match[1])

try {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name       VARCHAR(255) UNIQUE NOT NULL,
      password   TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  console.log('users table ready.')

  const cols = await sql`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'users'
    ORDER BY ordinal_position
  `
  console.log('Columns:')
  for (const c of cols) {
    console.log(`  - ${c.column_name} (${c.data_type}, nullable=${c.is_nullable})`)
  }
} catch (err) {
  console.error('INIT FAILED:', err.message)
  process.exit(1)
}
