import { motion } from 'framer-motion'

export function Footer({ name }) {
  return (
    <footer className="border-t border-mm-border bg-mm-bg px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-display font-black text-lg text-gradient-orange">{name?.split(' ')[0] || 'ND'}</span>
          <span className="font-mono text-mm-muted text-sm">.dev</span>
        </div>
        <p className="font-mono text-xs text-mm-muted">
          Built with React · Vite · Tailwind · Framer Motion · Supabase
        </p>
        <p className="font-mono text-xs text-mm-muted">
          © {new Date().getFullYear()} {name || 'Nunna Dhruvith'}
        </p>
      </div>
    </footer>
  )
}
