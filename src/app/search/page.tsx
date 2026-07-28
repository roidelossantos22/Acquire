'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, Phone, Clock, BookOpen } from 'lucide-react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Card from '@/components/Card'
import { useRouter } from 'next/navigation'
import { dataService } from '@/lib/data-service'

function SearchPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    category: 'all',
    status: 'all',
    timeFrame: 'all'
  })

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) {
      setQuery(q)
      performSearch(q)
    } else {
      loadAllWorkflows()
    }
  }, [searchParams])

  const performSearch = async (searchQuery: string) => {
    setLoading(true)
    try {
      const searchResults = await dataService.searchWorkflows(searchQuery)
      setResults(searchResults)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadAllWorkflows = async () => {
    setLoading(true)
    try {
      const allWorkflows = await dataService.getWorkflows()
      setResults(allWorkflows)
    } catch (error) {
      console.error('Error loading workflows:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <a href="/dashboard" className="text-xl font-bold text-gray-900">Acquire Workflow</a>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => router.push('/dashboard')}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search a service, patient concern, policy, or keyword…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </form>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <Card className="p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Filter className="w-4 h-4 text-gray-600" />
                <h3 className="font-medium text-gray-900">Filters</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedFilters.category}
                    onChange={(e) => setSelectedFilters({ ...selectedFilters, category: e.target.value })}
                  >
                    <option value="all">All Categories</option>
                    <option value="weight-loss">Weight Loss</option>
                    <option value="scheduling">Scheduling</option>
                    <option value="insurance">Insurance</option>
                    <option value="skin-care">Skin Care</option>
                    <option value="rpm-ccm">RPM/CCM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedFilters.status}
                    onChange={(e) => setSelectedFilters({ ...selectedFilters, status: e.target.value })}
                  >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Frame</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedFilters.timeFrame}
                    onChange={(e) => setSelectedFilters({ ...selectedFilters, timeFrame: e.target.value })}
                  >
                    <option value="all">All Time</option>
                    <option value="week">Past Week</option>
                    <option value="month">Past Month</option>
                    <option value="year">Past Year</option>
                  </select>
                </div>

                <Button variant="outline" className="w-full" size="sm">
                  Apply Filters
                </Button>
              </div>
            </Card>
          </aside>

          {/* Search Results */}
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-gray-600">
                Found {results.length} results for "{query}"
              </p>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8 text-gray-500">Searching...</div>
              ) : results.length === 0 ? (
                <Card className="p-12 text-center">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't find any workflows matching your search.
                  </p>
                  <Button variant="outline" onClick={() => router.push('/feedback')}>
                    Report Missing Workflow
                  </Button>
                </Card>
              ) : (
                results.map((result) => (
                  <Card key={result.id} className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {result.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{result.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {result.category}
                          </span>
                          {result.tags && result.tags.map((tag: string) => (
                            <span key={tag} className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {result.readingTime} min read
                          </div>
                          <div>Updated: {result.lastUpdated}</div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          size="sm"
                          onClick={() => router.push(`/workflows/${result.id}`)}
                        >
                          Open Workflow
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => router.push(`/workflows/${result.id}/live-call`)}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Live Call Mode
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>

            {/* No Results State */}
            {results.length === 0 && (
              <Card className="p-12 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any workflows matching your search.
                </p>
                <Button variant="outline" onClick={() => router.push('/feedback')}>
                  Report Missing Workflow
                </Button>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  )
}
