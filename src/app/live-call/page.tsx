'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Phone, Search, RotateCcw, ArrowLeft } from 'lucide-react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Card from '@/components/Card'
import { workflows } from '@/lib/mock-data'

export default function LiveCallPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Simplified Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Exit
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-lg font-semibold text-gray-900">Live Call Mode</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => router.push('/dashboard')}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Search Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Quick search another workflow..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-8 text-center">
          <Phone className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready for Live Call</h2>
          <p className="text-gray-600 mb-6">
            Search for a workflow above, or select one of your most used workflows below.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {workflows.slice(0, 4).map((workflow) => (
              <Button
                key={workflow.id}
                variant="outline"
                size="lg"
                className="h-16 text-left px-6"
                onClick={() => router.push(`/workflows/${workflow.id}/live-call`)}
              >
                <div>
                  <div className="font-semibold">{workflow.title}</div>
                  <div className="text-sm text-gray-500">{workflow.category}</div>
                </div>
              </Button>
            ))}
          </div>

          <Button size="lg" onClick={() => router.push('/dashboard')}>
            Return to Dashboard
          </Button>
        </Card>
      </main>
    </div>
  )
}
