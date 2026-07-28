'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Phone, MessageSquare, Mail, FileText, Copy, Check, Filter } from 'lucide-react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Card from '@/components/Card'
import { dataService } from '@/lib/data-service'

export default function ScriptsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const [channelFilter, setChannelFilter] = useState('all')
  const [scripts, setScripts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadScripts() {
      try {
        const scriptsData = await dataService.getScripts()
        setScripts(scriptsData)
      } catch (error) {
        console.error('Error loading scripts:', error)
      } finally {
        setLoading(false)
      }
    }
    loadScripts()
  }, [])

  const copyScript = (scriptId: number, text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(scriptId.toString())
    setTimeout(() => setCopied(null), 2000)
  }

  const filteredScripts = scripts.filter(script => {
    const matchesSearch = script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         script.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesChannel = channelFilter === 'all' || script.channel === channelFilter
    return matchesSearch && matchesChannel
  })

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'phone': return <Phone className="w-4 h-4" />
      case 'sms': return <MessageSquare className="w-4 h-4" />
      case 'email': return <Mail className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
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
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-lg font-semibold text-gray-900">Script Library</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => router.push('/dashboard')}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search scripts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={channelFilter}
                onChange={(e) => setChannelFilter(e.target.value)}
              >
                <option value="all">All Channels</option>
                <option value="phone">Phone</option>
                <option value="sms">SMS</option>
                <option value="email">Email</option>
              </select>
            </div>
          </div>
        </div>

        {/* Scripts Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading scripts...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredScripts.map((script) => (
              <Card key={script.id} className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getChannelIcon(script.channel)}
                    <span className="text-sm font-medium text-gray-600 capitalize">
                      {script.channel}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyScript(script.id, script.content)}
                  >
                    {copied === script.id.toString() ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2">{script.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{script.situation}</p>

                <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 italic">
                  "{script.content}"
                </div>

                {script.workflowId && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-3 text-left"
                    onClick={() => router.push(`/workflows/${script.workflowId}`)}
                  >
                    View Related Workflow →
                  </Button>
                )}
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredScripts.length === 0 && (
          <Card className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No scripts found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria.
            </p>
          </Card>
        )}

        {/* Copy Confirmation Toast */}
        {copied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
            Script copied. Review patient-specific details before sending.
          </div>
        )}
      </main>
    </div>
  )
}
