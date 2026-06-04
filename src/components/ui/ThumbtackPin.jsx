import { motion } from 'framer-motion'

export function ThumbtackPin({ delay = 0.8, color = '#F6851B' }) {
  return (
    <motion.div
      className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
      initial={{ scale: 0, y: -30, opacity: 0 }}
      whileInView={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0, y: -30, opacity: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        delay,
        duration: 0.5,
        type: 'spring',
        stiffness: 300,
        damping: 12,
      }}
    >
      <div className="relative">
        <div
          className="w-6 h-6 rounded-full relative"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${color}ff 0%, ${color}dd 50%, ${color}aa 100%)`,
            boxShadow: `
              0 3px 12px ${color}80,
              0 1px 3px rgba(0,0,0,0.5),
              inset -2px -2px 4px rgba(0,0,0,0.4),
              inset 2px 2px 4px rgba(255,255,255,0.4)
            `,
          }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.6)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}
          />
        </div>
        
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 w-1.5 h-4"
          style={{
            background: `linear-gradient(180deg, ${color}dd 0%, ${color}66 100%)`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.5), inset -1px 0 1px rgba(0,0,0,0.3)',
            borderRadius: '0 0 2px 2px',
          }}
        />
        
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: color }}
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  )
}
