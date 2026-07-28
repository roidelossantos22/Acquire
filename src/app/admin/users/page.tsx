'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, UserPlus, Shield, Users } from 'lucide-react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Card from '@/components/Card'
import { authService } from '@/lib/auth-service'

export default function UserManagementPage() {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'team_member'
  })
  const [message, setMessage] = useState('')

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setIsCreating(true)

    try {
      const result = await authService.createUser(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.role
      )

      if (result.success) {
        setMessage('User created successfully!')
        setFormData({ email: '', password: '', firstName: '', lastName: '', role: 'team_member' })
      } else {
        setMessage(result.error || 'Failed to create user')
      }
    } catch (error) {
      setMessage('An error occurred while creating user')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-lg font-semibold text-gray-900">User Management</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => router.push('/admin/dashboard')}>
                <Shield className="w-4 h-4 mr-2" />
                Admin Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Create User Form */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <UserPlus className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Create New User</h2>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>

              <Input
                type="email"
                label="Email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <Input
                type="password"
                label="Password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="team_member">Team Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {message && (
                <div className={`p-3 rounded ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {message}
                </div>
              )}

              <Button
                type="submit"
                disabled={isCreating}
                className="w-full"
              >
                {isCreating ? 'Creating User...' : 'Create User'}
              </Button>
            </form>
          </Card>

          {/* User Info */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">User Management Info</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-600">
              <p>• Only admins can create new user accounts</p>
              <p>• Team members can view workflows and scripts</p>
              <p>• Admins can create, edit, and delete workflows</p>
              <p>• All user accounts are managed through Supabase authentication</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
