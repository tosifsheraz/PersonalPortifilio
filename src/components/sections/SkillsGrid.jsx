import { motion } from 'framer-motion'
import { BentoGrid } from '../ui/BentoGrid'
import { BentoCard } from '../ui/BentoCard'
import { ScrollReveal } from '../ui/ScrollReveal'
import { AnimatedLine } from '../ui/AnimatedLine'
import { ThumbtackPin } from '../ui/ThumbtackPin'
import { staggerContainerVariant, staggerFastVariant, scaleUpVariant } from '../../lib/animations'

const CATEGORIES = ['Languages', 'Frontend', 'Backend', 'AI/ML', 'DevOps', 'UI/UX']

const categoryConfig = {
  Languages: { color: 'text-mm-orange', border: 'border-mm-orange/30', dot: 'bg-mm-orange', hex: '#F6851B' },
  Frontend: { color: 'text-mm-blue-light', border: 'border-mm-blue/30', dot: 'bg-mm-blue-light', hex: '#1098FC' },
  Backend: { color: 'text-emerald-400', border: 'border-emerald-400/30', dot: 'bg-emerald-400', hex: '#34D399' },
  'AI/ML': { color: 'text-purple-400', border: 'border-purple-400/30', dot: 'bg-purple-400', hex: '#C084FC' },
  DevOps: { color: 'text-red-400', border: 'border-red-400/30', dot: 'bg-red-400', hex: '#F87171' },
  'UI/UX': { color: 'text-pink-400', border: 'border-pink-400/30', dot: 'bg-pink-400', hex: '#F472B6' },
}

export function SkillsGrid({ skills }) {
  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat)
    return acc
  }, {})

  return (
    <section id="skills" className="py-32 px-6 bg-mm-bg border-b border-mm-border relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-mm-blue/6 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '0.8s' }} />

      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-20">
          <div className="flex items-center gap-6">
            <motion.span 
              className="font-mono text-sm text-mm-orange uppercase tracking-widest"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              02 /
            </motion.span>
            <h2 className="font-display font-black text-5xl md:text-6xl text-mm-white">Skills</h2>
            <div className="flex-1 ml-6">
              <AnimatedLine variant="smooth" />
            </div>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <BentoGrid>
            {CATEGORIES.map((category, catIndex) => {
              const cfg = categoryConfig[category]
              return (
                <BentoCard 
                  key={category} 
                  span="third" 
                  className="bg-mm-card border-mm-border group relative"
                  style={{ boxShadow: '6px 6px 0px 0px #2E2E32' }}
                  initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: catIndex * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: `10px 10px 0px 0px ${cfg.hex}`,
                    borderColor: cfg.hex,
                    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                  }}
                >
                  <ThumbtackPin delay={0.8 + catIndex * 0.1} color={cfg.hex} />
                  <div className="flex items-center gap-3 mb-8">
                    <motion.span 
                      className={`w-3 h-3 rounded-full ${cfg.dot}`}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, delay: catIndex * 0.2 }}
                      style={{ boxShadow: `0 0 12px ${cfg.hex}60` }}
                    />
                    <p className={`font-display font-black text-base uppercase tracking-widest ${cfg.color}`}>
                      {category}
                    </p>
                  </div>
                  <motion.div
                    variants={staggerFastVariant}
                    initial="hidden"
                    whileInView="visible"
                    exit="hidden"
                    viewport={{ once: false }}
                    className="flex flex-wrap gap-2.5"
                  >
                    {grouped[category].length === 0 ? (
                      <span className="font-mono text-xs text-mm-muted/40">No skills yet</span>
                    ) : (
                      grouped[category].map((skill, i) => (
                        <motion.span
                          key={skill.id}
                          variants={scaleUpVariant}
                          initial="hidden"
                          whileInView="visible"
                          exit="hidden"
                          viewport={{ once: false }}
                          whileHover={{
                            scale: 1.15,
                            borderColor: cfg.hex,
                            color: cfg.hex,
                            y: -4,
                            boxShadow: `4px 4px 0px 0px ${cfg.hex}`,
                            transition: { duration: 0.2 },
                          }}
                          className={`border ${cfg.border} px-3 py-1.5 font-mono text-sm text-mm-white bg-mm-surface cursor-default`}
                        >
                          {skill.name}
                        </motion.span>
                      ))
                    )}
                  </motion.div>
                  <div className={`absolute inset-0 border opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} style={{ borderColor: `${cfg.hex}40`, transform: 'translate(6px, 6px)' }} />
                </BentoCard>
              )
            })}
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  )
}
