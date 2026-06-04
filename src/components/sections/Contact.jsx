import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Link, Send, Mail, MessageSquare } from 'lucide-react'
import { Button } from '../ui/Button'
import { ScrollReveal } from '../ui/ScrollReveal'
import { AnimatedLine } from '../ui/AnimatedLine'
import { scaleUpVariant, fadeLeftVariant, fadeRightVariant, staggerContainerVariant } from '../../lib/animations'

const iconMap = { github: Code2, linkedin: Link }

export function Contact({ config }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState(null)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setIsSubmitting(true)
    try {
      await new Promise((res) => setTimeout(res, 1200))
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = config?.social_links || { github: 'https://github.com', linkedin: 'https://linkedin.com' }

  const inputClass = 'w-full border border-mm-border bg-mm-card px-5 py-4 font-mono text-sm text-mm-white placeholder-mm-muted focus:outline-none focus:border-mm-orange focus:shadow-[0_0_20px_rgba(246,133,27,0.2)] transition-all duration-300'

  return (
    <section id="contact" className="py-32 px-6 bg-mm-bg border-b border-mm-border relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-mm-orange/6 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-mm-blue/5 blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-20">
          <div className="flex items-center gap-6">
            <motion.span 
              className="font-mono text-sm text-mm-orange uppercase tracking-widest"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              05 /
            </motion.span>
            <h2 className="font-display font-black text-5xl md:text-6xl text-mm-white">Get In Touch</h2>
            <div className="flex-1 ml-6">
              <AnimatedLine variant="bounce" />
            </div>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <motion.div 
            variants={fadeLeftVariant}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            viewport={{ once: false, amount: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {[
                { field: 'name', type: 'text', icon: MessageSquare },
                { field: 'email', type: 'email', icon: Mail }
              ].map(({ field, type, icon: Icon }) => (
                <motion.div 
                  key={field}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative">
                    <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-mm-muted pointer-events-none" />
                    <input
                      type={type}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={form[field]}
                      onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                      className={`${inputClass} pl-12`}
                    />
                  </div>
                  {errors[field] && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-mono text-xs text-mm-red mt-2 ml-1"
                    >
                      {errors[field]}
                    </motion.p>
                  )}
                </motion.div>
              ))}
              <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                <textarea
                  placeholder="Your message..."
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className={`${inputClass} resize-none`}
                />
                {errors.message && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono text-xs text-mm-red mt-2 ml-1"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </motion.div>

              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-mono text-sm font-bold text-mm-green border border-mm-green/30 bg-mm-green/10 px-5 py-3"
                >
                  ✓ Message sent successfully!
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-mono text-sm font-bold text-mm-red border border-mm-red/30 bg-mm-red/10 px-5 py-3"
                >
                  ✗ Something went wrong. Please try again.
                </motion.p>
              )}

              <Button type="submit" disabled={isSubmitting} variant="primary" className="self-start mt-2 text-base px-6 py-3">
                <Send size={16} />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>

          <motion.div 
            variants={fadeRightVariant}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            viewport={{ once: false, amount: 0.3 }}
            className="flex flex-col gap-8"
          >
            <motion.div 
              className="border border-mm-border bg-mm-card p-8 relative group"
              style={{ boxShadow: '6px 6px 0px 0px #2E2E32' }}
              whileHover={{
                y: -6,
                scale: 1.02,
                boxShadow: '10px 10px 0px 0px #F6851B',
                borderColor: '#F6851B',
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <p className="font-display font-black text-2xl mb-4 text-mm-white">
                Let's build something <span className="text-gradient-orange">great.</span>
              </p>
              <p className="font-mono text-base text-mm-white/80 leading-relaxed">
                {config?.contact_text || 'Open to internships, collaborations, and interesting projects. Drop a message or connect on socials.'}
              </p>
              <div className={`absolute inset-0 border border-mm-orange/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} style={{ transform: 'translate(6px, 6px)' }} />
            </motion.div>

            <div>
              <p className="font-mono text-sm uppercase tracking-widest text-mm-muted mb-5">Find me on</p>
              <div className="flex gap-4">
                {Object.entries(socialLinks).map(([platform, url], i) => {
                  const Icon = iconMap[platform.toLowerCase()] || Code2
                  return (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      viewport={{ once: false }}
                      transition={{ delay: i * 0.1, type: 'spring', stiffness: 300 }}
                      whileHover={{ 
                        y: -6, 
                        scale: 1.1,
                        borderColor: '#F6851B', 
                        color: '#F6851B',
                        boxShadow: '6px 6px 0px 0px #F6851B',
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ y: 0, scale: 1.05 }}
                      className="border border-mm-border p-4 bg-mm-card text-mm-muted transition-colors duration-150"
                      style={{ boxShadow: '4px 4px 0px 0px #2E2E32' }}
                      aria-label={platform}
                    >
                      <Icon size={24} />
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
