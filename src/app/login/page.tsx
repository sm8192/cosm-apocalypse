import type { Metadata } from 'next'
import AuthCard from '@/app/ui/auth-card'
import LoginForm from '@/app/ui/login-form'

export const metadata: Metadata = {
  title: 'Sign in',
}

export default function LoginPage() {
  return (
    <AuthCard title="Welcome back" subtitle="Sign in to your account">
      <LoginForm />
    </AuthCard>
  )
}
