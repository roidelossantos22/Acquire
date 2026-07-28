'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, FileText, Clock } from 'lucide-react'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { dataService } from '@/lib/data-service'

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const [categoryWorkflows, setCategoryWorkflows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCategoryWorkflows() {
      try {
        const workflows = await dataService.getWorkflowsByCategory(params.slug as string)
        setCategoryWorkflows(workflows)
      } catch (error) {
        console.error('Error loading category workflows:', error)
      } finally {
        setLoading(false)
      }
    }
    loadCategoryWorkflows()
  }, [params.slug])

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
              <h1 className="text-lg font-semibold text-gray-900 capitalize">{Array.isArray(params.slug) ? params.slug[0]?.replace(/-/g, ' ') : params.slug?.replace(/-/g, ' ')}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => router.push('/dashboard')}>
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <Card className="p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2 capitalize">{Array.isArray(params.slug) ? params.slug[0]?.replace(/-/g, ' ') : params.slug?.replace(/-/g, ' ')}</h1>
              <p className="text-gray-600">
                {loading ? 'Loading...' : `${categoryWorkflows.length} workflows in this category`}
              </p>
            </div>
          </div>
        </Card>

        {/* Workflows in Category */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading workflows...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {categoryWorkflows.map((workflow) => (
              <Card
                key={workflow.id}
                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => router.push(`/workflows/${workflow.id}`)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {workflow.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{workflow.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {workflow.tags && workflow.tags.map((tag: string) => (
                        <span key={tag} className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {workflow.readingTime} min read
                      </div>
                      <div>Updated: {workflow.lastUpdated}</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button size="sm">Open Workflow</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {!loading && categoryWorkflows.length === 0 && (
          <Card className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No workflows yet</h3>
            <p className="text-gray-600">
              This category doesn't have any workflows yet.
            </p>
          </Card>
        )}
      </main>
    </div>
  )
}
