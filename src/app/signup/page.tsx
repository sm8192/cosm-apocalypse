import type { Metadata } from 'next'
import AuthCard from '@/app/ui/auth-card'
import SignupForm from '@/app/ui/signup-form'

export const metadata: Metadata = {
  title: 'Sign up',
}

export default function SignupPage() {
  return (
    <AuthCard title="Create your account" subtitle="Get started in seconds">
      <SignupForm />
    </AuthCard>
  )
}
