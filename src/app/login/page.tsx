'use client'

import { useState } from 'react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Card from '@/components/Card'
import { useRouter } from 'next/navigation'
import { authService } from '@/lib/auth-service'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await authService.login(email, password)
      
      if (result.success) {
        router.push('/dashboard')
      } else {
        setError(result.error || 'Login failed. Please try again.')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Acquire Workflow</h1>
          <p className="text-gray-600">Clinic Operations Guide</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Forgot password?
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>For demo: use any email/password</p>
          <p className="mt-1">Include 'admin' in email for admin access</p>
        </div>
      </Card>
    </div>
  )
}
