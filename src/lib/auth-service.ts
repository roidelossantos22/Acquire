import { supabase, isSupabaseConfigured } from './supabase'

// Simple auth service that works with both demo mode and Supabase
export const authService = {
  // Login function
  async login(email: string, password: string) {
    if (!isSupabaseConfigured) {
      // Demo mode - accept any credentials
      const isAdmin = email.toLowerCase().includes('admin')
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userRole', isAdmin ? 'admin' : 'team_member')
      localStorage.setItem('userEmail', email)
      return { success: true, role: isAdmin ? 'admin' : 'team_member' }
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      // Get user role from database
      const { data: userData } = await supabase
        .from('users')
        .select('*, roles(*)')
        .eq('email', email)
        .single()

      const role = userData?.roles?.name || 'team_member'

      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userRole', role)
      localStorage.setItem('userEmail', email)
      localStorage.setItem('userId', data.user.id)

      return { success: true, role }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Login failed' }
    }
  },

  // Logout function
  async logout() {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut()
    }

    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userId')
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true'
  },

  // Get user role
  getUserRole(): string {
    return localStorage.getItem('userRole') || 'team_member'
  },

  // Get user email
  getUserEmail(): string {
    return localStorage.getItem('userEmail') || ''
  },

  // Check if user is admin
  isAdmin(): boolean {
    return this.getUserRole() === 'admin'
  }
}
