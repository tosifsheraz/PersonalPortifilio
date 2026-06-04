import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export function DotNavigation() {
  const [activeSection, setActiveSection] = useState('about')
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [100, 200], [0, 1])

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const element = document.getElementById(id)
      if (!element) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.5, rootMargin: '-100px 0px -100px 0px' }
      )

      observer.observe(element)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  const handleClick = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <motion.nav
      style={{ opacity }}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4"
    >
      {sections.map(({ id, label }) => {
        const isActive = activeSection === id
        return (
          <motion.button
            key={id}
            onClick={() => handleClick(id)}
            className="group relative flex items-center justify-end"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="absolute right-6 font-mono text-xs text-mm-white bg-mm-surface border border-mm-border px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
              initial={{ x: 10, opacity: 0 }}
              whileHover={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
            <motion.div
              className={`w-2 h-2 rounded-full border-2 transition-colors duration-200 ${
                isActive
                  ? 'bg-mm-orange border-mm-orange'
                  : 'bg-transparent border-mm-muted group-hover:border-mm-orange'
              }`}
              animate={isActive ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        )
      })}
    </motion.nav>
  )
}
