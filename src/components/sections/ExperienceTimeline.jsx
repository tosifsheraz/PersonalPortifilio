import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { AnimatedLine } from '../ui/AnimatedLine'

const typeConfig = {
  work: {
    borderColor: '#3B82F6',
    dotBg: 'bg-blue-500',
    labelColor: 'text-blue-400',
    bgGradient: 'from-blue-500/20 to-blue-500/5',
    hex: '#3B82F6',
  },
  volunteer: {
    borderColor: '#34D399',
    dotBg: 'bg-emerald-400',
    labelColor: 'text-emerald-400',
    bgGradient: 'from-emerald-400/20 to-emerald-400/5',
    hex: '#34D399',
  },
  achievement: {
    borderColor: '#F6851B',
    dotBg: 'bg-mm-orange',
    labelColor: 'text-mm-orange',
    bgGradient: 'from-mm-orange/20 to-mm-orange/5',
    hex: '#F6851B',
  },
}

function ExperienceCard({ exp, cfg }) {
  return (
    <div
      className={`relative p-6 md:p-8 bg-gradient-to-br ${cfg.bgGradient} backdrop-blur-sm`}
      style={{
        border: `3px solid ${cfg.borderColor}`,
        backgroundColor: '#2A2A2E',
        boxShadow: `10px 10px 0px 0px #1C1C1E`,
      }}
    >
      <div className="absolute inset-0 bg-mm-surface/90" style={{ zIndex: -1 }} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="font-display font-black text-xl md:text-2xl text-mm-white group-hover:text-gradient-orange transition-all duration-300">
            {exp.role}
          </h3>
          <span
            className={`px-2 py-1 md:px-3 md:py-1.5 font-mono text-xs ${cfg.labelColor} font-bold uppercase tracking-wider shrink-0`}
            style={{
              border: `2px solid ${cfg.borderColor}`,
              backgroundColor: `${cfg.hex}30`,
              boxShadow: `0 0 20px ${cfg.hex}50`,
            }}
          >
            {exp.type}
          </span>
        </div>
        
        <p className={`font-mono text-base md:text-lg ${cfg.labelColor} mb-2 font-semibold`}>
          {exp.organization}
        </p>
        
        <p className="font-mono text-sm text-mm-muted mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-mm-orange" />
          {exp.duration}
        </p>
        
        <p className="font-mono text-sm md:text-base text-mm-white/90 leading-relaxed">
          {exp.description}
        </p>
      </div>
    </div>
  )
}

function TimelineDot({ cfg, index }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1, type: 'spring' }}
      className={`w-6 h-6 rounded-full ${cfg.dotBg} relative z-10`}
      style={{ boxShadow: `0 0 30px ${cfg.hex}` }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: cfg.hex }}
        animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
      />
    </motion.div>
  )
}

function TimelineEntry({ exp, index }) {
  const isLeft = index % 2 === 0
  const cfg = typeConfig[exp.type] || typeConfig.work

  return (
    <div className="relative mb-20 last:mb-0">
      {/* Mobile layout - simple vertical stack */}
      <div className="block md:hidden">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative group"
        >
          <div className="flex justify-center mb-4">
            <TimelineDot cfg={cfg} index={index} />
          </div>
          <ExperienceCard exp={exp} cfg={cfg} />
        </motion.div>
      </div>

      {/* Desktop layout - alternating left/right grid */}
      <div className="hidden md:grid md:grid-cols-[1fr_60px_1fr] gap-8 items-center">
        {isLeft ? (
          <>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              <ExperienceCard exp={exp} cfg={cfg} />
              <motion.div
                className="absolute top-1/2 -right-12 w-12 h-[3px]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                style={{
                  transformOrigin: 'left',
                  background: `linear-gradient(to right, ${cfg.hex}, transparent)`,
                }}
              />
            </motion.div>

            <div className="flex items-center justify-center">
              <TimelineDot cfg={cfg} index={index} />
            </div>

            <div />
          </>
        ) : (
          <>
            <div />

            <div className="flex items-center justify-center">
              <TimelineDot cfg={cfg} index={index} />
            </div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              <ExperienceCard exp={exp} cfg={cfg} />
              <motion.div
                className="absolute top-1/2 -left-12 w-12 h-[3px]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                style={{
                  transformOrigin: 'right',
                  background: `linear-gradient(to left, ${cfg.hex}, transparent)`,
                }}
              />
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

export function ExperienceTimeline({ experiences }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.7', 'end 0.3'],
  })

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  const totalHeight = experiences.length * 350
  
  const createCurvedPath = () => {
    let path = 'M 50 0'
    const segments = experiences.length
    
    for (let i = 0; i < segments; i++) {
      const y1 = i * 350 + 175
      const y2 = (i + 1) * 350
      const controlX = i % 2 === 0 ? 70 : 30
      
      path += ` Q ${controlX} ${y1}, 50 ${y2}`
    }
    
    return path
  }

  return (
    <section id="experience" className="py-32 px-6 bg-mm-bg border-b border-mm-border relative overflow-x-clip">
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-mm-orange/5 blur-3xl pointer-events-none -translate-x-1/2 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-mm-blue/5 blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-20">
          <div className="flex items-center gap-6">
            <motion.span 
              className="font-mono text-sm text-mm-orange uppercase tracking-widest"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              04 /
            </motion.span>
            <h2 className="font-display font-black text-5xl md:text-6xl text-mm-white">Experience</h2>
            <div className="flex-1 ml-6">
              <AnimatedLine variant="default" />
            </div>
          </div>
        </ScrollReveal>

        <div ref={containerRef} className="relative">
          <svg
            className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none hidden md:block"
            width="100"
            height={totalHeight}
            style={{ height: `${totalHeight}px` }}
          >
            <defs>
              <linearGradient id="rope-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F6851B" stopOpacity="0.8" />
                <stop offset="30%" stopColor="#3B82F6" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#34D399" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#F6851B" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <motion.path
              d={createCurvedPath()}
              fill="none"
              stroke="url(#rope-gradient)"
              strokeWidth="5"
              strokeLinecap="round"
              style={{ pathLength }}
              initial={{ pathLength: 0 }}
              filter="url(#glow)"
            />
            
            <motion.path
              d={createCurvedPath()}
              fill="none"
              stroke="url(#rope-gradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeOpacity="0.3"
              style={{ pathLength }}
              initial={{ pathLength: 0 }}
              filter="blur(10px)"
            />
          </svg>

          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <TimelineEntry key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
