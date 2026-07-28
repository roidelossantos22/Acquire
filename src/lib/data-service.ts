import { supabase } from './supabase'
import { categories as mockCategories, workflows as mockWorkflows, scripts as mockScripts } from './mock-data'

// Helper function to check if supabase is available
const checkSupabase = () => {
  if (!supabase) {
    throw new Error('Supabase not configured')
  }
  return supabase
}

// Data service that uses Supabase with fallback to mock data for development
export const dataService = {
  // Get categories
  async getCategories() {
    try {
      const client = checkSupabase()
      
      const { data, error } = await client
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')

      if (error) throw error
      return data.map(cat => ({
        name: cat.name,
        slug: cat.slug,
        count: 0, // Will be updated when we implement counts
        description: cat.description
      }))
    } catch (error) {
      console.error('Error fetching categories:', error)
      return mockCategories // Fallback to mock data
    }
  },

  // Get workflows
  async getWorkflows() {
    try {
      const client = checkSupabase()
      
      const { data, error } = await client
        .from('workflows')
        .select(`
          *,
          categories:category_id (name, slug)
        `)
        .eq('status', 'published')

      if (error) throw error

      return data.map(wf => ({
        id: parseInt(wf.id),
        title: wf.title,
        slug: wf.slug,
        description: wf.description,
        category: wf.categories?.name || 'Uncategorized',
        tags: wf.search_keywords || [],
        whenToUse: '',
        whenNotToUse: '',
        status: wf.status,
        lastUpdated: new Date(wf.updated_at).toISOString().split('T')[0],
        updatedBy: 'Admin',
        version: '1.0',
        readingTime: wf.reading_time_minutes || 5,
        content: wf.content || []
      }))
    } catch (error) {
      console.error('Error fetching workflows:', error)
      return mockWorkflows
    }
  },

  // Get workflow by ID
  async getWorkflowById(id: number) {
    try {
      const client = checkSupabase()
      
      const { data, error } = await client
        .from('workflows')
        .select(`
          *,
          categories:category_id (name, slug)
        `)
        .eq('id', id.toString())
        .single()

      if (error) throw error

      return {
        id: parseInt(data.id),
        title: data.title,
        slug: data.slug,
        description: data.description,
        category: data.categories?.name || 'Uncategorized',
        tags: data.search_keywords || [],
        whenToUse: '',
        whenNotToUse: '',
        status: data.status,
        lastUpdated: new Date(data.updated_at).toISOString().split('T')[0],
        updatedBy: 'Admin',
        version: '1.0',
        readingTime: data.reading_time_minutes || 5,
        content: data.content || []
      }
    } catch (error) {
      console.error('Error fetching workflow:', error)
      return mockWorkflows.find(w => w.id === id) || mockWorkflows[0]
    }
  },

  // Search workflows
  async searchWorkflows(query: string) {
    try {
      const client = checkSupabase()
      
      const { data, error } = await client
        .from('workflows')
        .select(`
          *,
          categories:category_id (name, slug)
        `)
        .eq('status', 'published')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .limit(20)

      if (error) throw error

      return data.map(wf => ({
        id: parseInt(wf.id),
        title: wf.title,
        slug: wf.slug,
        description: wf.description,
        category: wf.categories?.name || 'Uncategorized',
        tags: wf.search_keywords || [],
        lastUpdated: new Date(wf.updated_at).toISOString().split('T')[0],
        readingTime: wf.reading_time_minutes || 5
      }))
    } catch (error) {
      console.error('Error searching workflows:', error)
      return mockWorkflows.filter(wf =>
        wf.title.toLowerCase().includes(query.toLowerCase()) ||
        wf.description.toLowerCase().includes(query.toLowerCase())
      )
    }
  },

  // Get scripts
  async getScripts() {
    try {
      const client = checkSupabase()
      
      const { data, error } = await client
        .from('scripts')
        .select('*')
        .eq('is_active', true)

      if (error) throw error

      return data.map(script => ({
        id: parseInt(script.id),
        title: script.title,
        content: script.content,
        internalNote: script.internal_note,
        channel: script.communication_channel || 'phone',
        situation: script.situation,
        workflowId: script.workflow_id ? parseInt(script.workflow_id) : null
      }))
    } catch (error) {
      console.error('Error fetching scripts:', error)
      return mockScripts
    }
  },

  // Get workflows by category
  async getWorkflowsByCategory(categorySlug: string) {
    try {
      const client = checkSupabase()
      
      const { data, error } = await client
        .from('workflows')
        .select(`
          *,
          categories:category_id (name, slug)
        `)
        .eq('status', 'published')

      if (error) throw error

      return data
        .filter(wf => wf.categories?.slug === categorySlug)
        .map(wf => ({
          id: parseInt(wf.id),
          title: wf.title,
          slug: wf.slug,
          description: wf.description,
          category: wf.categories?.name || 'Uncategorized',
          tags: wf.search_keywords || [],
          lastUpdated: new Date(wf.updated_at).toISOString().split('T')[0],
          readingTime: wf.reading_time_minutes || 5
        }))
    } catch (error) {
      console.error('Error fetching workflows by category:', error)
      return mockWorkflows.filter(wf => {
        const mockSlug = wf.category.toLowerCase().replace(/\s+/g, '-')
        return mockSlug === categorySlug
      })
    }
  }
}
