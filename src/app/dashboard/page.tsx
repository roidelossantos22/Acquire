'use client'

import { useState, useEffect } from 'react'
import { Search, BookOpen, Clock, Star, Phone, FileText, LayoutDashboard, LogOut, User } from 'lucide-react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Card from '@/components/Card'
import { useRouter } from 'next/navigation'
import { dataService } from '@/lib/data-service'
import { authService } from '@/lib/auth-service'

export default function DashboardPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState<any[]>([])
  const [workflows, setWorkflows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [categoriesData, workflowsData] = await Promise.all([
          dataService.getCategories(),
          dataService.getWorkflows()
        ])
        setCategories(categoriesData)
        setWorkflows(workflowsData)
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleLogout = async () => {
    await authService.logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">Acquire Workflow</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="/dashboard" className="text-gray-900 font-medium">Dashboard</a>
                <a href="/search" className="text-gray-600 hover:text-gray-900">Search</a>
                <a href="/categories" className="text-gray-600 hover:text-gray-900">Categories</a>
                <a href="/scripts" className="text-gray-600 hover:text-gray-900">Scripts</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => router.push('/settings')}>
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search a service, patient concern, policy, or keyword…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </form>
        </div>

        {/* Live Call Mode Button */}
        <div className="mb-8">
          <Button
            size="lg"
            className="w-full md:w-auto bg-green-600 hover:bg-green-700"
            onClick={() => router.push('/live-call')}
          >
            <Phone className="w-5 h-5 mr-2" />
            Start Live Call Mode
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{loading ? '...' : workflows.length}</p>
                <p className="text-sm text-gray-600">Total Workflows</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{loading ? '...' : categories.length}</p>
                <p className="text-sm text-gray-600">Categories</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <Star className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-sm text-gray-600">Bookmarked</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">7</p>
                <p className="text-sm text-gray-600">Scripts</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Most Used Workflows */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Most Used Workflows</h2>
              {loading ? (
                <div className="text-center py-4 text-gray-500">Loading...</div>
              ) : (
                <div className="space-y-3">
                  {workflows.slice(0, 3).map((workflow) => (
                    <div
                      key={workflow.id}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => router.push(`/workflows/${workflow.id}`)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{workflow.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{workflow.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              {workflow.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              {workflow.readingTime} min read
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Recently Updated */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recently Updated</h2>
              {loading ? (
                <div className="text-center py-4 text-gray-500">Loading...</div>
              ) : (
                <div className="space-y-3">
                  {workflows.map((workflow) => (
                    <div
                      key={workflow.id}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => router.push(`/workflows/${workflow.id}`)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{workflow.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{workflow.category}</p>
                        </div>
                        <span className="text-xs text-gray-500">{workflow.lastUpdated}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              {loading ? (
                <div className="text-center py-4 text-gray-500">Loading...</div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {categories.map((category) => (
                    <a
                      key={category.slug}
                      href={`/categories/${category.slug}`}
                      className="flex justify-between items-center p-2 rounded hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-gray-700">{category.name}</span>
                      <span className="text-sm text-gray-500">{category.count}</span>
                    </a>
                  ))}
                </div>
              )}
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/bookmarks')}>
                  <Star className="w-4 h-4 mr-2" />
                  My Bookmarks
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/history')}>
                  <Clock className="w-4 h-4 mr-2" />
                  Recently Viewed
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/scripts')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Script Library
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
