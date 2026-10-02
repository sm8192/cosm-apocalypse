import * as z from 'zod'

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { error: 'Name must be at least 2 characters long.' })
    .max(255, { error: 'Name must be at most 255 characters long.' })
    .trim(),
  password: z
    .string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, { error: 'Contain at least one special character.' })
    .trim(),
})

export const LoginFormSchema = z.object({
  name: z.string().min(1, { error: 'Name is required.' }).trim(),
  password: z.string().min(1, { error: 'Password is required.' }),
})

export type FormState =
  | {
      errors?: {
        name?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export type SessionPayload = {
  userId: string
  expiresAt: Date
}
