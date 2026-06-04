import { motion } from 'framer-motion'
import { fadeUpVariant } from '../../lib/animations'

export function ScrollReveal({ children, className = '', variant = fadeUpVariant, delay = 0, amount = 0.2 }) {
  return (
    <motion.div
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
