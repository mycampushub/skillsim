import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Development mode check
const isDevelopment = import.meta.env.DEV

// For development, provide a mock client if no real credentials are available
if (isDevelopment && (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://your-project-id.supabase.co')) {
  console.warn(
    '⚠️ Development Mode: Using mock Supabase client.\n' +
    'To connect to real Supabase, update your .env file with actual credentials.\n' +
    'See .env.example for instructions.'
  )
}

// Create client (real or mock)
export const supabase = createClient(
  supabaseUrl || 'https://mock.supabase.co', 
  supabaseAnonKey || 'mock-key', 
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
)

// Auth helpers
export const authHelpers = {
  signUp: async (email: string, password: string, metadata?: any) => {
    if (isDevelopment && (!supabaseUrl || supabaseUrl === 'https://your-project-id.supabase.co')) {
      // Mock response for development
      return {
        data: {
          user: {
            id: 'mock-user-id',
            email,
            user_metadata: metadata,
            created_at: new Date().toISOString()
          }
        },
        error: null
      }
    }
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
  },

  signIn: async (email: string, password: string) => {
    if (isDevelopment && (!supabaseUrl || supabaseUrl === 'https://your-project-id.supabase.co')) {
      // Mock response for development
      return {
        data: {
          user: {
            id: 'mock-user-id',
            email,
            created_at: new Date().toISOString()
          },
          session: {
            access_token: 'mock-token',
            refresh_token: 'mock-refresh',
            expires_in: 3600,
            user: {
              id: 'mock-user-id',
              email
            }
          }
        },
        error: null
      }
    }
    return await supabase.auth.signInWithPassword({
      email,
      password
    })
  },

  signOut: async () => {
    if (isDevelopment && (!supabaseUrl || supabaseUrl === 'https://your-project-id.supabase.co')) {
      return { error: null }
    }
    return await supabase.auth.signOut()
  },

  resetPassword: async (email: string) => {
    if (isDevelopment && (!supabaseUrl || supabaseUrl === 'https://your-project-id.supabase.co')) {
      return { error: null }
    }
    return await supabase.auth.resetPasswordForEmail(email)
  },

  getCurrentUser: async () => {
    if (isDevelopment && (!supabaseUrl || supabaseUrl === 'https://your-project-id.supabase.co')) {
      return { user: null }
    }
    const { data: { user } } = await supabase.auth.getUser()
    return { user }
  }
}

// Admin helpers
export const adminHelpers = {
  createAdminUser: async (email: string, password: string, name: string, phone: string) => {
    if (isDevelopment && (!supabaseUrl || supabaseUrl === 'https://your-project-id.supabase.co')) {
      // Mock response for development
      return {
        user: {
          id: 'mock-admin-id',
          email,
          user_metadata: { name, phone, role: 'admin' },
          created_at: new Date().toISOString()
        },
        error: null
      }
    }
    
    // First create the user
    const { data, error } = await authHelpers.signUp(email, password, { name, phone, role: 'admin' })
    
    if (error) return { user: null, error }
    
    // Then create admin profile in database (if tables exist)
    try {
      const { error: profileError } = await supabase
        .from('admin_users')
        .insert([{
          user_id: data.user?.id,
          email,
          name,
          phone,
          role: 'admin',
          created_at: new Date().toISOString()
        }])
      
      // If table doesn't exist, we'll just return the user without admin profile
      if (profileError && !profileError.message.includes('relation "admin_users" does not exist')) {
        console.warn('Admin profile creation failed:', profileError)
      }
    } catch (err) {
      console.warn('Admin profile creation failed:', err)
    }
    
    return { user: data.user, error: null }
  },

  checkAdminRole: async (userId: string) => {
    if (isDevelopment && (!supabaseUrl || supabaseUrl === 'https://your-project-id.supabase.co')) {
      // Mock response for development - treat all users as non-admin except mock admin
      return { isAdmin: userId === 'mock-admin-id' }
    }
    
    try {
      // First check user table for admin role
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single()
      
      if (!userError && userData && userData.role === 'admin') {
        return { isAdmin: true }
      }
      
      // Then check admin_users table for extended admin info
      const { data, error } = await supabase
        .from('admin_users')
        .select('role, permissions')
        .eq('user_id', userId)
        .single()
      
      if (error || !data) {
        return { isAdmin: false }
      }
      
      return { isAdmin: data.role === 'admin', permissions: data.permissions }
    } catch (err) {
      console.error('Error checking admin role:', err)
      return { isAdmin: false }
    }
  }
}

// Database helpers (for when database is available)
export const dbHelpers = {
  // User profiles
  createUserProfile: async (userId: string, profile: any) => {
    if (isDevelopment && (!supabaseUrl || supabaseUrl === 'https://your-project-id.supabase.co')) {
      // Mock response for development
      return { data: { id: userId, ...profile }, error: null }
    }
    
    try {
      return await supabase
        .from('users')
        .insert([{ id: userId, ...profile, created_at: new Date().toISOString() }])
    } catch (err) {
      console.warn('User profile creation failed:', err)
      return { data: null, error: null }
    }
  },

  getUserProfile: async (userId: string) => {
    if (isDevelopment && (!supabaseUrl || supabaseUrl === 'https://your-project-id.supabase.co')) {
      // Mock response for development
      return { 
        data: {
          id: userId,
          name: 'Mock User',
          email: 'mock@example.com',
          role: 'user',
          created_at: new Date().toISOString()
        }, 
        error: null 
      }
    }
    
    try {
      return await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()
    } catch (err) {
      console.warn('User profile fetch failed:', err)
      return { data: null, error: null }
    }
  },

  updateUserProfile: async (userId: string, updates: any) => {
    if (isDevelopment && (!supabaseUrl || supabaseUrl === 'https://your-project-id.supabase.co')) {
      // Mock response for development
      return { data: { id: userId, ...updates }, error: null }
    }
    
    try {
      return await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
    } catch (err) {
      console.warn('User profile update failed:', err)
      return { data: null, error: null }
    }
  }
}

export default supabase