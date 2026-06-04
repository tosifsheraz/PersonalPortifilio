import { useState, useEffect } from 'react'
import { supabase, supabaseReady } from '../../lib/supabase'
import { Button } from '../ui/Button'
import { Toast } from '../ui/Toast'
import { motion } from 'framer-motion'
import { Save, RefreshCw } from 'lucide-react'

const inputClass = 'w-full border border-mm-border bg-mm-card px-3 py-2 font-mono text-sm text-mm-white placeholder-mm-muted focus:outline-none focus:border-mm-orange transition-colors'
const labelClass = 'font-mono text-xs uppercase tracking-widest text-mm-muted block mb-1'

export function SiteConfigPanel() {
  const [form, setForm] = useState({
    name: '',
    tagline: '',
    about_text: '',
    resume_url: '',
    contact_text: '',
    social_links: '',
    login_title: '',
    login_subtitle: '',
    login_email_placeholder: '',
    login_password_placeholder: '',
    login_button_text: '',
    login_button_loading_text: '',
    login_error_prefix: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!supabaseReady) { setLoading(false); return }
    supabase.from('site_config').select('*').single().then(({ data, error }) => {
      if (!error && data) {
        setForm({
          name: data.name || '',
          tagline: data.tagline || '',
          about_text: data.about_text || '',
          resume_url: data.resume_url || '',
          contact_text: data.contact_text || '',
          social_links: JSON.stringify(data.social_links || {}, null, 2),
          login_title: data.login_title || 'Admin Login',
          login_subtitle: data.login_subtitle || '',
          login_email_placeholder: data.login_email_placeholder || 'Email',
          login_password_placeholder: data.login_password_placeholder || 'Password',
          login_button_text: data.login_button_text || 'Sign In',
          login_button_loading_text: data.login_button_loading_text || 'Signing in...',
          login_error_prefix: data.login_error_prefix || 'Error: ',
        })
      }
      setLoading(false)
    })
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    if (!supabaseReady) { setToast({ message: 'Supabase not configured', type: 'error' }); return }
    setSaving(true)

    let parsedLinks = {}
    try {
      parsedLinks = JSON.parse(form.social_links)
    } catch {
      setToast({ message: 'Social links must be valid JSON', type: 'error' })
      setSaving(false)
      return
    }

    const { error } = await supabase.from('site_config').update({
      name: form.name,
      tagline: form.tagline,
      about_text: form.about_text,
      resume_url: form.resume_url,
      contact_text: form.contact_text,
      social_links: parsedLinks,
      login_title: form.login_title,
      login_subtitle: form.login_subtitle,
      login_email_placeholder: form.login_email_placeholder,
      login_password_placeholder: form.login_password_placeholder,
      login_button_text: form.login_button_text,
      login_button_loading_text: form.login_button_loading_text,
      login_error_prefix: form.login_error_prefix,
    }).eq('id', 1)

    setSaving(false)
    if (error) {
      setToast({ message: error.message, type: 'error' })
    } else {
      setToast({ message: 'Site config saved successfully', type: 'success' })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 py-12">
        <RefreshCw size={16} className="text-mm-orange animate-spin" />
        <p className="font-mono text-sm text-mm-muted">Loading config...</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-display font-black text-2xl mb-2 text-mm-white">Site Config</h2>
      <p className="font-mono text-xs text-mm-muted mb-8">Changes here update the public portfolio instantly.</p>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSave}
        className="flex flex-col gap-5 max-w-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Your Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className={inputClass} placeholder="Nunna Dhruvith" />
          </div>
          <div>
            <label className={labelClass}>Hero Tagline</label>
            <input type="text" value={form.tagline} onChange={(e) => setForm((p) => ({ ...p, tagline: e.target.value }))} className={inputClass} placeholder="Full-Stack Developer & AI Enthusiast" />
          </div>
        </div>

        <div>
          <label className={labelClass}>About Text</label>
          <textarea rows={4} value={form.about_text} onChange={(e) => setForm((p) => ({ ...p, about_text: e.target.value }))} className={`${inputClass} resize-none`} placeholder="Tell visitors about yourself..." />
        </div>

        <div>
          <label className={labelClass}>Contact Section Text</label>
          <textarea rows={2} value={form.contact_text} onChange={(e) => setForm((p) => ({ ...p, contact_text: e.target.value }))} className={`${inputClass} resize-none`} placeholder="Open to internships, collaborations..." />
        </div>

        <div>
          <label className={labelClass}>Resume URL</label>
          <input type="url" value={form.resume_url} onChange={(e) => setForm((p) => ({ ...p, resume_url: e.target.value }))} className={inputClass} placeholder="https://..." />
        </div>

        <div>
          <label className={labelClass}>Social Links (JSON)</label>
          <textarea
            rows={4}
            value={form.social_links}
            onChange={(e) => setForm((p) => ({ ...p, social_links: e.target.value }))}
            className={`${inputClass} resize-none font-mono text-xs`}
            placeholder={'{\n  "github": "https://github.com/...",\n  "linkedin": "https://linkedin.com/in/..."\n}'}
          />
          <p className="font-mono text-xs text-mm-muted mt-1">Keys become icon labels. Supported: github, linkedin, twitter</p>
        </div>

        <div className="border-t border-mm-border pt-6 mt-2">
          <h3 className="font-display font-black text-lg mb-4 text-mm-white">Login Page Customization</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Login Title</label>
              <input type="text" value={form.login_title} onChange={(e) => setForm((p) => ({ ...p, login_title: e.target.value }))} className={inputClass} placeholder="Admin Login" />
            </div>
            <div>
              <label className={labelClass}>Login Subtitle (Optional)</label>
              <input type="text" value={form.login_subtitle} onChange={(e) => setForm((p) => ({ ...p, login_subtitle: e.target.value }))} className={inputClass} placeholder="Enter your credentials" />
            </div>
            <div>
              <label className={labelClass}>Email Placeholder</label>
              <input type="text" value={form.login_email_placeholder} onChange={(e) => setForm((p) => ({ ...p, login_email_placeholder: e.target.value }))} className={inputClass} placeholder="Email" />
            </div>
            <div>
              <label className={labelClass}>Password Placeholder</label>
              <input type="text" value={form.login_password_placeholder} onChange={(e) => setForm((p) => ({ ...p, login_password_placeholder: e.target.value }))} className={inputClass} placeholder="Password" />
            </div>
            <div>
              <label className={labelClass}>Button Text</label>
              <input type="text" value={form.login_button_text} onChange={(e) => setForm((p) => ({ ...p, login_button_text: e.target.value }))} className={inputClass} placeholder="Sign In" />
            </div>
            <div>
              <label className={labelClass}>Button Loading Text</label>
              <input type="text" value={form.login_button_loading_text} onChange={(e) => setForm((p) => ({ ...p, login_button_loading_text: e.target.value }))} className={inputClass} placeholder="Signing in..." />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Error Message Prefix</label>
              <input type="text" value={form.login_error_prefix} onChange={(e) => setForm((p) => ({ ...p, login_error_prefix: e.target.value }))} className={inputClass} placeholder="Error: " />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={saving} variant="primary">
            <Save size={15} />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </motion.form>

      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
    </div>
  )
}
