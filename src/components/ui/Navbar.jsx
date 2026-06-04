import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar({ name }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const navY = useTransform(scrollY, [0, 200], [0, -80])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.header
      style={{ y: navY }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-mm-bg/95 backdrop-blur-md border-b border-mm-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="font-display font-black text-lg tracking-tight text-mm-white">
          <span className="text-gradient-orange">{name?.split(' ')[0] || 'ND'}</span>
          <span className="text-mm-muted ml-1 font-mono text-sm">.dev</span>
        </a>

        <nav className="hidden md:flex items-center gap-1 ml-auto">
          {links.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
              whileHover={{ color: '#F6851B' }}
              className="font-mono text-sm px-3 py-1.5 text-mm-muted hover:text-mm-orange transition-colors duration-150 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-3 right-3 h-px bg-mm-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
            </motion.a>
          ))}
        </nav>

        <button
          className="md:hidden border border-mm-border p-1.5 text-mm-white ml-auto"
          onClick={() => setOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-mm-border bg-mm-bg overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-sm py-3 border-b border-mm-border text-mm-muted hover:text-mm-orange transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
