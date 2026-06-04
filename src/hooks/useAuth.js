import { useAuthContext } from '../context/AuthContext'
import { supabase, supabaseReady } from '../lib/supabase'

export function useAuth() {
  const { session } = useAuthContext()

  async function signIn(email, password) {
    if (!supabaseReady) return { message: 'Supabase is not configured. Add your credentials to .env.local' }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return error || null
  }

  async function signOut() {
    if (!supabaseReady) return
    await supabase.auth.signOut()
  }

  return { session, signIn, signOut }
}
