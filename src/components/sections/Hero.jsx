import { motion, useScroll, useTransform } from 'framer-motion'
import { Download, ArrowDown } from 'lucide-react'
import { Button } from '../ui/Button'
import { useTypewriter } from '../../hooks/useTypewriter'
import { fadeUpVariant, staggerContainerVariant } from '../../lib/animations'
import { useRef } from 'react'

const taglineColors = ['text-gradient-orange', 'text-gradient-blue', 'text-gradient-orange']

export function Hero({ config }) {
  const ref = useRef(null)
  const taglines = config?.taglines || ['Full-Stack Developer', 'AI Enthusiast', 'Open Source Builder']
  const currentText = useTypewriter(taglines)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center bg-mm-bg bg-grid overflow-hidden px-6 py-20">
      
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-mm-orange/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-mm-blue/5 blur-3xl" />
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-mm-orange"
            style={{
              left: `${10 + i * 8}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 10, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        variants={staggerContainerVariant}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl w-full"
      >
        <motion.div
          variants={fadeUpVariant}
          className="inline-flex items-center gap-2 border border-mm-border bg-mm-surface px-4 py-1.5 mb-8"
          whileHover={{ scale: 1.05, borderColor: '#F6851B' }}
        >
          <span className="w-2 h-2 rounded-full bg-mm-green animate-pulse" />
          <span className="font-mono text-xs text-mm-muted uppercase tracking-widest">Available for opportunities</span>
        </motion.div>

        <motion.p variants={fadeUpVariant} className="font-mono text-sm uppercase tracking-widest mb-3 text-mm-muted">
          Hello, I am
        </motion.p>

        <motion.h1
          variants={fadeUpVariant}
          className="font-display font-black text-5xl md:text-8xl leading-none tracking-tight text-mm-white mb-4"
        >
          {config?.name || 'Nunna Dhruvith'}
        </motion.h1>

        <motion.div
          variants={fadeUpVariant}
          className="font-display font-bold text-2xl md:text-4xl mb-8 h-12 flex items-center"
        >
          <span className="text-gradient-orange">{currentText}</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="ml-1 inline-block w-0.5 h-8 bg-mm-orange"
          />
        </motion.div>

        <motion.p variants={fadeUpVariant} className="font-mono text-sm text-mm-muted max-w-xl mb-10 leading-relaxed">
          B.Tech Computer Science @ NIT Andhra Pradesh. Building robust web apps and integrating AI models.
        </motion.p>

        <motion.div variants={fadeUpVariant} className="flex flex-wrap gap-4">
          <Button href={config?.resume_url || '#'} variant="primary" className="text-sm px-8 py-3">
            <Download size={16} />
            Download Resume
          </Button>
          <Button 
            href="#projects" 
            variant="secondary" 
            className="text-sm px-8 py-3"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View Projects
          </Button>
        </motion.div>

        <motion.div
          variants={fadeUpVariant}
          className="mt-16 flex items-center gap-3 text-mm-muted"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={16} className="text-mm-orange" />
          </motion.div>
          <span className="font-mono text-xs uppercase tracking-widest">Scroll to explore</span>
        </motion.div>
      </motion.div>
    </section>
  )
}
