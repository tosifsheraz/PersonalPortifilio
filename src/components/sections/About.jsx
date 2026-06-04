import { motion } from 'framer-motion'
import { ScrollReveal } from '../ui/ScrollReveal'
import { AnimatedLine } from '../ui/AnimatedLine'
import { ThumbtackPin } from '../ui/ThumbtackPin'
import { staggerContainerVariant, fadeUpVariant, scaleUpVariant, rotateInVariant } from '../../lib/animations'
import { GraduationCap, MapPin, Code2, Sparkles } from 'lucide-react'

const defaultInterests = ['Arch Linux / Hyprland', 'GenAI & Cinematic Video', 'Chess', 'Sim Racing', 'Anime']

export function About({ config }) {
  const interestList = config?.interests || defaultInterests

  return (
    <section id="about" className="py-32 px-6 bg-mm-bg border-b border-mm-border relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-mm-orange/6 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-mm-blue/6 blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-20">
          <div className="flex items-center gap-6">
            <motion.span 
              className="font-mono text-sm text-mm-orange uppercase tracking-widest"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              01 /
            </motion.span>
            <h2 className="font-display font-black text-5xl md:text-6xl text-mm-white">About Me</h2>
            <div className="flex-1 ml-6">
              <AnimatedLine variant="wave" />
            </div>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div
            variants={scaleUpVariant}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2 border border-mm-border bg-mm-surface p-8 relative group"
            style={{ boxShadow: '6px 6px 0px 0px #2E2E32' }}
            whileHover={{
              y: -6,
              scale: 1.01,
              boxShadow: '10px 10px 0px 0px #F6851B',
              borderColor: '#F6851B',
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <ThumbtackPin delay={0.8} color="#F6851B" />
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                <Code2 size={20} className="text-mm-orange" />
              </motion.div>
              <p className="font-mono text-sm uppercase tracking-widest text-mm-muted">Who I Am</p>
            </div>
            <p className="font-mono text-base leading-relaxed text-mm-white/90">
              {config?.about_text || "I specialize in building robust web applications and integrating AI models. When I'm not coding, I'm customizing my Arch Linux setup (Hyprland + Fish), crafting cinematic videos/hyper-realistic images with GenAI, playing chess, sim racing, or watching anime."}
            </p>
            <div className="mt-8 flex items-center gap-3">
              <MapPin size={16} className="text-mm-orange" />
              <span className="font-mono text-sm text-mm-muted">Andhra Pradesh, India</span>
            </div>
            <div className={`absolute inset-0 border border-mm-orange/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} style={{ transform: 'translate(6px, 6px)' }} />
          </motion.div>

          <motion.div
            variants={rotateInVariant}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="border border-mm-border bg-mm-surface p-8 relative group"
            style={{ boxShadow: '6px 6px 0px 0px #2E2E32' }}
            whileHover={{
              y: -6,
              scale: 1.02,
              boxShadow: '10px 10px 0px 0px #037DD6',
              borderColor: '#037DD6',
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <ThumbtackPin delay={0.9} color="#037DD6" />
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                <GraduationCap size={20} className="text-mm-blue" />
              </motion.div>
              <p className="font-mono text-sm uppercase tracking-widest text-mm-muted">Education</p>
            </div>
            <p className="font-display font-bold text-xl leading-tight text-mm-white mb-2">
              {config?.degree || 'B.Tech Computer Science'}
            </p>
            <p className="font-mono text-base text-mm-white/80 mt-2">
              {config?.institution || 'National Institute of Technology'}
            </p>
            <p className="font-mono text-sm text-mm-muted">Andhra Pradesh</p>
            <motion.div
              whileHover={{ scale: 1.1, borderColor: '#037DD6', color: '#037DD6' }}
              className="mt-6 inline-block border border-mm-blue px-4 py-2 font-mono text-xs font-bold text-mm-blue"
            >
              Undergraduate
            </motion.div>
            <div className={`absolute inset-0 border border-mm-blue/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} style={{ transform: 'translate(6px, 6px)' }} />
          </motion.div>

          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-3 border border-mm-border bg-mm-surface p-8 relative group"
            style={{ boxShadow: '6px 6px 0px 0px #2E2E32' }}
            whileHover={{
              y: -6,
              boxShadow: '10px 10px 0px 0px #34D399',
              borderColor: '#34D399',
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <ThumbtackPin delay={1.0} color="#34D399" />
            <div className="flex items-center gap-3 mb-8">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                <Sparkles size={20} className="text-emerald-400" />
              </motion.div>
              <p className="font-mono text-sm uppercase tracking-widest text-mm-muted">Interests & Hobbies</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {interestList.map((interest, i) => (
                <motion.span
                  key={interest}
                  initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.7, rotate: 5 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  whileHover={{ 
                    scale: 1.15, 
                    borderColor: '#34D399', 
                    color: '#34D399',
                    y: -4,
                    boxShadow: '4px 4px 0px 0px #34D399',
                    transition: { duration: 0.2 }
                  }}
                  className="border border-mm-border px-4 py-2 font-mono text-sm text-mm-white cursor-default transition-colors"
                >
                  {interest}
                </motion.span>
              ))}
            </div>
            <div className={`absolute inset-0 border border-emerald-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} style={{ transform: 'translate(6px, 6px)' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
