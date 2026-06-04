import { motion } from 'framer-motion'
import { fadeUpVariant } from '../../lib/animations'

const spanClasses = {
  full: 'col-span-1 md:col-span-2 lg:col-span-3',
  half: 'col-span-1 md:col-span-1',
  third: 'col-span-1',
}

export function BentoCard({ children, className = '', span = 'third', accent = '', noHover = false }) {
  return (
    <motion.div
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      whileHover={noHover ? {} : {
        y: -6,
        boxShadow: '6px 6px 0px 0px #F6851B',
        borderColor: '#F6851B',
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      style={{ boxShadow: '4px 4px 0px 0px #2E2E32', borderColor: '#2E2E32' }}
      className={`
        border-2 bg-mm-card p-6 rounded-none
        ${spanClasses[span]}
        ${accent}
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}
