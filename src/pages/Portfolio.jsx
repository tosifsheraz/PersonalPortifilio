import { usePortfolioData } from '../hooks/usePortfolioData'
import { Navbar } from '../components/ui/Navbar'
import { Footer } from '../components/ui/Footer'
import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { SkillsGrid } from '../components/sections/SkillsGrid'
import { ProjectsShowcase } from '../components/sections/ProjectsShowcase'
import { ExperienceTimeline } from '../components/sections/ExperienceTimeline'
import { Contact } from '../components/sections/Contact'
import { Sparkles } from '../components/ui/Sparkles'
import { TarsRobot } from '../components/ui/TarsRobot'
import { DotNavigation } from '../components/ui/DotNavigation'
import { CurvedSeparator } from '../components/ui/CurvedSeparator'
import { motion } from 'framer-motion'

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mm-bg bg-grid">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-mm-orange"
              animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
        <p className="font-mono text-xs text-mm-muted uppercase tracking-widest">Loading portfolio</p>
      </motion.div>
    </div>
  )
}

export function Portfolio() {
  const { projects, skills, experience, config, loading } = usePortfolioData()

  if (loading) return <LoadingScreen />

  return (
    <>
      <Sparkles />
      <TarsRobot />
      <Navbar name={config?.name} />
      <DotNavigation />
      <main className="pt-14">
        <Hero config={config} />
        <CurvedSeparator color="#F6851B" />
        <About config={config} />
        <CurvedSeparator color="#037DD6" />
        <SkillsGrid skills={skills} />
        <CurvedSeparator color="#34D399" />
        <ProjectsShowcase projects={projects} />
        <CurvedSeparator color="#F6851B" />
        <ExperienceTimeline experiences={experience} />
        <CurvedSeparator color="#037DD6" />
        <Contact config={config} />
      </main>
      <Footer name={config?.name} />
    </>
  )
}
