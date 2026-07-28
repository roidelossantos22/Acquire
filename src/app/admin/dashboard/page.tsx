'use client'

import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  FileText, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Search,
  Users,
  MessageSquare,
  Settings,
  ArrowLeft,
  Plus
} from 'lucide-react'
import Button from '@/components/Button'
import Card from '@/components/Card'

// Mock admin data
const mockStats = {
  totalWorkflows: 48,
  draftWorkflows: 5,
  needsReview: 3,
  outdated: 2,
  totalUsers: 12,
  activeUsers: 8
}

const mockRecentActivity = [
  { action: 'Workflow updated', user: 'Dr. Smith', time: '2 hours ago', item: 'New Patient Reservation Fee' },
  { action: 'New workflow created', user: 'Admin User', time: '5 hours ago', item: 'Insurance Verification' },
  { action: 'Category modified', user: 'Admin User', time: '1 day ago', item: 'Cosmetic Services' },
  { action: 'Workflow published', user: 'Dr. Johnson', time: '2 days ago', item: 'Botox Consultation' }
]

const mockTopSearches = [
  { term: 'reservation fee', count: 45 },
  { term: 'cancel appointment', count: 32 },
  { term: 'insurance', count: 28 },
  { term: 'botox', count: 24 },
  { term: 'new patient', count: 21 }
]

const mockNoResults = [
  { term: 'refund policy', count: 8 },
  { term: 'late arrival', count: 5 },
  { term: 'provider concern', count: 3 }
]

const mockNegativeFeedback = [
  { workflow: 'Appointment Scheduling', count: 3 },
  { workflow: 'Insurance Verification', count: 2 }
]

export default function AdminDashboardPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Team View
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => router.push('/settings')}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <Button size="lg" onClick={() => router.push('/admin/workflows/create')}>
            <Plus className="w-5 h-5 mr-2" />
            Create New Workflow
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Workflows</p>
                <p className="text-3xl font-bold text-gray-900">{mockStats.totalWorkflows}</p>
              </div>
              <FileText className="w-10 h-10 text-blue-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Draft Workflows</p>
                <p className="text-3xl font-bold text-gray-900">{mockStats.draftWorkflows}</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Needs Review</p>
                <p className="text-3xl font-bold text-gray-900">{mockStats.needsReview}</p>
              </div>
              <AlertTriangle className="w-10 h-10 text-orange-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Users</p>
                <p className="text-3xl font-bold text-gray-900">{mockStats.activeUsers}</p>
              </div>
              <Users className="w-10 h-10 text-green-600" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {mockRecentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.item}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{activity.user}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Searches */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Search Terms (7 days)</h2>
              <div className="space-y-3">
                {mockTopSearches.map((search, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                      <span className="text-gray-900">{search.term}</span>
                    </div>
                    <span className="text-sm text-gray-500">{search.count} searches</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Searches with No Results */}
            <Card className="p-6 border-2 border-red-200">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-semibold text-gray-900">Searches with No Results</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">Consider creating workflows for these topics</p>
              <div className="space-y-3">
                {mockNoResults.map((search, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                    <span className="text-gray-900">{search.term}</span>
                    <span className="text-sm text-red-600">{search.count} times</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Create Workflow from Missing Search
              </Button>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/admin/workflows')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Manage Workflows
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/admin/categories')}>
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Manage Categories
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/admin/users')}>
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/admin/analytics')}>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/admin/feedback')}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Review Feedback
                </Button>
              </div>
            </Card>

            {/* Negative Feedback Alerts */}
            <Card className="p-6 border-2 border-orange-200">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <h2 className="text-lg font-semibold text-gray-900">Needs Attention</h2>
              </div>
              <div className="space-y-3">
                {mockNegativeFeedback.map((item, index) => (
                  <div key={index} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="font-medium text-gray-900">{item.workflow}</p>
                    <p className="text-sm text-orange-600">{item.count} negative feedback reports</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* System Status */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Database</span>
                  <span className="text-green-600 font-medium">Connected</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Search Index</span>
                  <span className="text-green-600 font-medium">Up to date</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Backup</span>
                  <span className="text-green-600 font-medium">Last: 2h ago</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
