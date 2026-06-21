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
    interests: '',
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
          interests: Array.isArray(data.interests) ? data.interests.join(', ') : '',
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
      interests: form.interests ? form.interests.split(',').map(i => i.trim()).filter(Boolean) : [],
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
            <label className={labelClass}>Hero Taglines (Comma Separated)</label>
            <input type="text" value={form.tagline} onChange={(e) => setForm((p) => ({ ...p, tagline: e.target.value }))} className={inputClass} placeholder="Full-Stack Developer, AI Enthusiast, Open Source Builder, UI/UX Designer" />
          </div>
        </div>

        <div>
          <label className={labelClass}>About Text</label>
          <textarea rows={4} value={form.about_text} onChange={(e) => setForm((p) => ({ ...p, about_text: e.target.value }))} className={`${inputClass} resize-none`} placeholder="Tell visitors about yourself..." />
        </div>

        <div>
          <label className={labelClass}>Interests (Comma Separated)</label>
          <input type="text" value={form.interests} onChange={(e) => setForm((p) => ({ ...p, interests: e.target.value }))} className={inputClass} placeholder="Arch Linux, Chess, Anime..." />
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
