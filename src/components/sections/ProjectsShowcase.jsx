import { motion } from 'framer-motion'
import { Code2, ExternalLink, Star } from 'lucide-react'
import { Tag } from '../ui/Tag'
import { Button } from '../ui/Button'
import { ScrollReveal } from '../ui/ScrollReveal'
import { AnimatedLine } from '../ui/AnimatedLine'
import { ThumbtackPin } from '../ui/ThumbtackPin'
import { scaleUpVariant } from '../../lib/animations'

export function ProjectsShowcase({ projects }) {
  return (
    <section id="projects" className="py-32 px-6 bg-mm-bg border-b border-mm-border relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-mm-orange/6 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1.2s' }} />

      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-20">
          <div className="flex items-center gap-6">
            <motion.span 
              className="font-mono text-sm text-mm-orange uppercase tracking-widest"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              03 /
            </motion.span>
            <h2 className="font-display font-black text-5xl md:text-6xl text-mm-white">Projects</h2>
            <div className="flex-1 ml-6">
              <AnimatedLine variant="zigzag" />
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-between gap-6 bg-mm-card border border-mm-border p-6 relative group"
              style={{ boxShadow: '6px 6px 0px 0px #2E2E32' }}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: project.featured ? '12px 12px 0px 0px #F6851B' : '10px 10px 0px 0px #037DD6',
                borderColor: project.featured ? '#F6851B' : '#037DD6',
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <ThumbtackPin delay={0.8 + i * 0.1} color={project.featured ? '#F6851B' : '#037DD6'} />
              <motion.div
                variants={scaleUpVariant}
                initial="hidden"
                whileInView="visible"
                exit="hidden"
                viewport={{ once: false, amount: 0.3 }}
              >
                <div className="flex items-start justify-between mb-4">
                  {project.featured && (
                    <motion.span
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: false }}
                      transition={{ type: 'spring', stiffness: 300, delay: i * 0.1 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="inline-flex items-center gap-1.5 border border-mm-orange/50 bg-mm-orange/10 px-3 py-1 font-mono text-xs font-bold text-mm-orange"
                    >
                      <Star size={12} />
                      Featured
                    </motion.span>
                  )}
                </div>
                <h3 className="font-display font-black text-2xl mb-3 text-mm-white group-hover:text-gradient-orange transition-all duration-300">{project.title}</h3>
                <p className="font-mono text-sm text-mm-muted leading-relaxed mb-5">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {(project.tech_stack || []).map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      viewport={{ once: false }}
                      transition={{ delay: techIndex * 0.05 }}
                    >
                      <Tag>{tech}</Tag>
                    </motion.span>
                  ))}
                </div>
              </motion.div>
              <div className="flex gap-3 flex-wrap pt-4 border-t border-mm-border">
                {project.github_url && (
                  <Button href={project.github_url} variant="secondary" className="text-sm px-4 py-2">
                    <Code2 size={15} />
                    Code
                  </Button>
                )}
                {project.live_url && (
                  <Button href={project.live_url} variant="primary" className="text-sm px-4 py-2">
                    <ExternalLink size={15} />
                    Live Demo
                  </Button>
                )}
              </div>
              <div className={`absolute inset-0 border opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} style={{ borderColor: project.featured ? '#F6851B40' : '#037DD640', transform: 'translate(6px, 6px)' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
