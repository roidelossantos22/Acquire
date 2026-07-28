'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, User, Bell, Shield, HelpCircle } from 'lucide-react'
import Button from '@/components/Button'
import Card from '@/components/Card'
import Input from '@/components/Input'

export default function SettingsPage() {
  const router = useRouter()

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
              <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Profile Section */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <User className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
            </div>
            <div className="space-y-4">
              <Input
                label="Name"
                placeholder="Your name"
                defaultValue="Demo User"
              />
              <Input
                label="Email"
                type="email"
                placeholder="your.email@example.com"
                defaultValue="user@example.com"
              />
              <Button>Save Changes</Button>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Bell className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Workflow Updates</p>
                  <p className="text-sm text-gray-600">Get notified when workflows are updated</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Review Reminders</p>
                  <p className="text-sm text-gray-600">Get reminded about workflow reviews</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">System Announcements</p>
                  <p className="text-sm text-gray-600">Receive system-wide announcements</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
            </div>
          </Card>

          {/* Security Settings */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Security</h2>
            </div>
            <div className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                placeholder="••••••••"
              />
              <Input
                label="New Password"
                type="password"
                placeholder="••••••••"
              />
              <Input
                label="Confirm New Password"
                type="password"
                placeholder="••••••••"
              />
              <Button>Update Password</Button>
            </div>
          </Card>

          {/* Help Section */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <HelpCircle className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Help & Support</h2>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                User Guide
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Contact Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Report an Issue
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
