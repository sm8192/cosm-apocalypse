'use server'

import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import { sql } from '@/lib/db'
import { createSession, deleteSession } from '@/lib/session'
import {
  SignupFormSchema,
  LoginFormSchema,
  type FormState,
} from '@/lib/definitions'

type DbUser = {
  id: string
  name: string
  password: string
}

export async function signup(
  _state: FormState,
  formData: FormData
): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, password } = validatedFields.data

  // 2. Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10)

  // 3. Insert the user. ON CONFLICT lets us detect an existing name without a
  // separate round trip; it returns no rows when the name is already taken.
  let user: { id: string } | undefined
  try {
    const rows = (await sql`
      INSERT INTO users (name, password)
      VALUES (${name}, ${hashedPassword})
      ON CONFLICT (name) DO NOTHING
      RETURNING id
    `) as { id: string }[]
    user = rows[0]
  } catch (error) {
    console.error('Signup DB error:', error)
    return { message: 'An error occurred while creating your account.' }
  }

  if (!user) {
    return {
      errors: { name: ['An account with this name already exists.'] },
    }
  }

  // 4. Create session, then redirect
  await createSession(user.id)
  redirect('/dashboard')
}

export async function login(
  _state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    name: formData.get('name'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, password } = validatedFields.data

  let user: DbUser | undefined
  try {
    const rows = (await sql`
      SELECT id, name, password
      FROM users
      WHERE name = ${name}
    `) as DbUser[]
    user = rows[0]
  } catch (error) {
    console.error('Login DB error:', error)
    return { message: 'An error occurred while signing in.' }
  }

  // Use a generic error for both "no such user" and "wrong password" so we
  // don't reveal which names are registered. Always run a hash comparison to
  // keep timing roughly constant whether or not the user exists.
  const passwordMatch = user
    ? await bcrypt.compare(password, user.password)
    : await bcrypt.compare(password, '$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidin')

  if (!user || !passwordMatch) {
    return { message: 'Invalid name or password.' }
  }

  await createSession(user.id)
  redirect('/dashboard')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
