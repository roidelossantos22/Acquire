'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Eye, Plus, Trash2, AlertTriangle } from 'lucide-react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Card from '@/components/Card'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export default function CreateWorkflowPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    status: 'draft',
    whenToUse: '',
    whenNotToUse: '',
    content: [
      { type: 'action', title: '', content: '' }
    ]
  })

  const addContentBlock = (type: string) => {
    setFormData({
      ...formData,
      content: [
        ...formData.content,
        { type, title: '', content: '' }
      ]
    })
  }

  const removeContentBlock = (index: number) => {
    setFormData({
      ...formData,
      content: formData.content.filter((_, i) => i !== index)
    })
  }

  const updateContentBlock = (index: number, field: string, value: string) => {
    const updatedContent = [...formData.content]
    updatedContent[index] = { ...updatedContent[index], [field]: value }
    setFormData({ ...formData, content: updatedContent })
  }

  const handleSave = async (publish: boolean = false) => {
    setSaving(true)
    try {
      if (isSupabaseConfigured && supabase) {
        // Save to Supabase
        const { data, error } = await supabase
          .from('workflows')
          .insert({
            title: formData.title,
            slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
            description: formData.description,
            category_id: formData.category ? (await supabase.from('categories').select('id').eq('slug', formData.category).single()).data?.id : null,
            status: publish ? 'published' : 'draft',
            content: formData.content,
            search_keywords: [],
            common_phrases: [],
            reading_time_minutes: 5
          })
          .select()
          .single()

        if (error) throw error
      } else {
        // Demo mode - just simulate save
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      if (publish) {
        router.push('/admin/workflows')
      } else {
        alert('Draft saved successfully')
      }
    } catch (error) {
      console.error('Error saving workflow:', error)
      alert('Error saving workflow. Please try again.')
    } finally {
      setSaving(false)
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
              <h1 className="text-lg font-semibold text-gray-900">Create Workflow</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => router.push('/admin/workflows')}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSave(false)}
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button
                size="sm"
                onClick={() => handleSave(true)}
                disabled={saving}
              >
                Publish
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Basic Information */}
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="space-y-4">
              <Input
                label="Workflow Title"
                placeholder="e.g., New Patient Reservation Fee"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Brief description of this workflow..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">Select category</option>
                    <option value="weight-loss">Weight Loss</option>
                    <option value="scheduling">Scheduling</option>
                    <option value="insurance">Insurance</option>
                    <option value="skin-care">Skin Care</option>
                    <option value="rpm-ccm">RPM/CCM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="needs-review">Needs Review</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          {/* Usage Guidelines */}
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Usage Guidelines</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">When to Use</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="Describe when this workflow should be used..."
                  value={formData.whenToUse}
                  onChange={(e) => setFormData({ ...formData, whenToUse: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">When Not to Use</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="Describe when this workflow should NOT be used..."
                  value={formData.whenNotToUse}
                  onChange={(e) => setFormData({ ...formData, whenNotToUse: e.target.value })}
                />
              </div>
            </div>
          </Card>

          {/* Workflow Content */}
          <Card className="p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Workflow Steps</h2>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addContentBlock('action')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Action
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addContentBlock('say')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Script
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addContentBlock('important')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Warning
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {formData.content.map((block, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-red-600 hover:text-red-700"
                    onClick={() => removeContentBlock(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>

                  <div className="space-y-3 pr-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Block Type</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={block.type}
                        onChange={(e) => updateContentBlock(index, 'type', e.target.value)}
                      >
                        <option value="action">Action Step</option>
                        <option value="say">Say This (Script)</option>
                        <option value="important">Important/Warning</option>
                        <option value="exception">Exception</option>
                        <option value="escalate">Escalate</option>
                      </select>
                    </div>

                    <Input
                      label="Title"
                      placeholder="Step title or heading"
                      value={block.title}
                      onChange={(e) => updateContentBlock(index, 'title', e.target.value)}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Step content or script text..."
                        value={block.content}
                        onChange={(e) => updateContentBlock(index, 'content', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {formData.content.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No content blocks yet. Add your first step above.</p>
              </div>
            )}
          </Card>

          {/* Autosave Indicator */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Last saved: Just now</span>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span>Autosave enabled</span>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
