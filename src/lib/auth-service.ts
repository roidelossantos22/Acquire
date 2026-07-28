import { supabase, isSupabaseConfigured } from './supabase'

// Production-ready auth service that uses Supabase authentication
export const authService = {
  // Login function
  async login(email: string, password: string) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: 'Authentication service not configured' }
    }

    try {
      const response = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (response.error) throw response.error

      // Get user role from database
      let role = 'team_member'
      try {
        const { data: userData } = await supabase
          .from('users')
          .select('*, roles(*)')
          .eq('email', email)
          .single()
        
        if (userData) {
          role = userData.roles?.name || 'team_member'
        }
      } catch (dbError) {
        console.error('Database error fetching user role:', dbError)
        // If user doesn't exist in users table, default to team_member
        role = 'team_member'
      }

      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userRole', role)
      localStorage.setItem('userEmail', email)
      localStorage.setItem('userId', response.data.user.id)

      return { success: true, role }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Invalid email or password' }
    }
  },

  // Logout function
  async logout() {
    if (isSupabaseConfigured && supabase) {
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
  },

  // Create new user (admin only)
  async createUser(email: string, password: string, firstName: string, lastName: string, role: string) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: 'Authentication service not configured' }
    }

    try {
      // Check if current user is admin
      if (!this.isAdmin()) {
        return { success: false, error: 'Only admins can create users' }
      }

      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailConfirm: true // Auto-confirm email
        }
      })

      if (authError) throw authError

      // Get role ID
      const { data: roleData } = await supabase
        .from('roles')
        .select('id')
        .eq('name', role)
        .single()

      if (!roleData) {
        throw new Error('Role not found')
      }

      // Create user record in database
      const { error: dbError } = await supabase
        .from('users')
        .insert({
          id: authData.user?.id,
          email,
          password_hash: 'MANAGED_BY_SUPABASE_AUTH',
          first_name: firstName,
          last_name: lastName,
          role_id: roleData.id,
          is_active: true
        })

      if (dbError) throw dbError

      return { success: true }
    } catch (error) {
      console.error('Create user error:', error)
      return { success: false, error: 'Failed to create user' }
    }
  }
}
