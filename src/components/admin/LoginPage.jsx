import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { supabase, supabaseReady } from '../../lib/supabase'
import { Button } from '../ui/Button'
import { Lock } from 'lucide-react'
import { motion } from 'framer-motion'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [config, setConfig] = useState(null)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!supabaseReady) return
    supabase.from('site_config').select('login_title, login_subtitle, login_email_placeholder, login_password_placeholder, login_button_text, login_button_loading_text, login_error_prefix').single().then(({ data }) => {
      if (data) setConfig(data)
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const err = await signIn(email, password)
    if (err) {
      const prefix = config?.login_error_prefix || 'Error: '
      setError(prefix + err.message)
      setLoading(false)
      return
    }
    navigate('/admin/dashboard')
  }

  const loginTitle = config?.login_title || 'Admin Login'
  const loginSubtitle = config?.login_subtitle || ''
  const emailPlaceholder = config?.login_email_placeholder || 'Email'
  const passwordPlaceholder = config?.login_password_placeholder || 'Password'
  const buttonText = config?.login_button_text || 'Sign In'
  const buttonLoadingText = config?.login_button_loading_text || 'Signing in...'

  const inputClass = 'w-full border border-mm-border bg-mm-card px-4 py-3 font-mono text-sm text-mm-white placeholder-mm-muted focus:outline-none focus:border-mm-orange transition-colors duration-200'

  return (
    <div className="min-h-screen flex items-center justify-center bg-mm-bg bg-grid px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm border border-mm-border bg-mm-surface p-8"
        style={{ boxShadow: '6px 6px 0px 0px #F6851B' }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="border border-mm-orange p-2 bg-mm-orange/10">
            <Lock size={18} className="text-mm-orange" />
          </div>
          <h1 className="font-display font-black text-2xl text-mm-white">{loginTitle}</h1>
        </div>

        {loginSubtitle && (
          <p className="font-mono text-xs text-mm-muted mb-6">{loginSubtitle}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
          <input
            type="email"
            placeholder={emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass}
          />
          <input
            type="password"
            placeholder={passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputClass}
          />

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-xs text-mm-red border border-mm-red/30 bg-mm-red/10 px-3 py-2"
            >
              {error}
            </motion.p>
          )}

          <Button type="submit" disabled={loading} variant="primary" className="w-full justify-center mt-2">
            {loading ? buttonLoadingText : buttonText}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
