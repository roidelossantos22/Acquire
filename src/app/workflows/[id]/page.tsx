'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Phone, Star, Clock, AlertTriangle, FileText, Copy, Check, ChevronRight, Home } from 'lucide-react'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { dataService } from '@/lib/data-service'

export default function WorkflowDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [workflow, setWorkflow] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadWorkflow() {
      try {
        const workflowData = await dataService.getWorkflowById(parseInt(params.id as string))
        setWorkflow(workflowData)
      } catch (error) {
        console.error('Error loading workflow:', error)
      } finally {
        setLoading(false)
      }
    }
    loadWorkflow()
  }, [params.id])

  const copyScript = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderContentBlock = (block: any) => {
    switch (block.type) {
      case 'action':
        return (
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h4 className="font-medium text-gray-900 mb-1">{block.title}</h4>
            <p className="text-gray-700">{block.content}</p>
          </div>
        )
      case 'say':
        return (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-green-900">{block.title}</h4>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyScript(block.content)}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-green-800 italic">"{block.content}"</p>
          </div>
        )
      case 'important':
        return (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-900 mb-1">{block.title}</h4>
                <p className="text-amber-800">{block.content}</p>
              </div>
            </div>
          </div>
        )
      case 'exception':
        return (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-1">⚠️ {block.title}</h4>
            <p className="text-purple-800">{block.content}</p>
          </div>
        )
      case 'escalate':
        return (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-medium text-red-900 mb-1">🚨 {block.title}</h4>
            <p className="text-red-800">{block.content}</p>
          </div>
        )
      default:
        return (
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-1">{block.title}</h4>
            <p className="text-gray-700">{block.content}</p>
          </div>
        )
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
              <h1 className="text-lg font-semibold text-gray-900">Workflow Detail</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/workflows/${params.id}/live-call`)}
              >
                <Phone className="w-4 h-4 mr-2" />
                Live Call Mode
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard')}>
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading workflow...</p>
          </div>
        ) : (
          <>
            {/* Workflow Header */}
            <Card className="p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{workflow.title}</h1>
                  <p className="text-gray-600">{workflow.description}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Star className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {workflow.category}
                </span>
                {workflow.tags && workflow.tags.map((tag: string) => (
                  <span key={tag} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
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
                <div>By: {workflow.updatedBy}</div>
                <div>Version: {workflow.version}</div>
              </div>
            </Card>

            {/* When to Use */}
            <Card className="p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">✅ When to Use</h3>
                  <p className="text-gray-700">{workflow.whenToUse}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">❌ When Not to Use</h3>
                  <p className="text-gray-700">{workflow.whenNotToUse}</p>
                </div>
              </div>
            </Card>

            {/* Workflow Content */}
            <Card className="p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Steps</h2>
              <div className="space-y-4">
                {workflow.content && workflow.content.map((block: any, index: number) => (
                  <div key={index}>
                    {renderContentBlock(block)}
                  </div>
                ))}
              </div>
            </Card>

            {/* Related Workflows */}
            <Card className="p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Workflows</h2>
              <div className="space-y-2">
                <p className="text-gray-500 text-sm">Related workflows will be loaded from database</p>
              </div>
            </Card>
          </>
        )}

        {/* Feedback Section */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Was this helpful?</h2>
          <div className="flex gap-2 mb-4">
            <Button
              variant={feedback === 'yes' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFeedback('yes')}
            >
              Yes
            </Button>
            <Button
              variant={feedback === 'partial' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFeedback('partial')}
            >
              Partially
            </Button>
            <Button
              variant={feedback === 'no' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFeedback('no')}
            >
              No
            </Button>
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Report outdated information
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              Suggest an improvement
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              Report a missing workflow
            </Button>
          </div>
        </Card>
      </main>
    </div>
  )
}
