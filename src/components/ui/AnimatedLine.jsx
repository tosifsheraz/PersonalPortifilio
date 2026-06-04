import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function AnimatedLine({ variant = 'default', className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.9'],
  })

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  const variants = {
    default: {
      stroke: '#F6851B',
      strokeWidth: 2,
      height: 2,
    },
    thick: {
      stroke: '#037DD6',
      strokeWidth: 3,
      height: 3,
    },
    gradient: {
      stroke: 'url(#line-gradient)',
      strokeWidth: 2,
      height: 2,
    },
  }

  const config = variants[variant] || variants.default

  return (
    <div ref={ref} className={`relative w-full ${className}`} style={{ height: `${config.height}px` }}>
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F6851B" />
            <stop offset="50%" stopColor="#037DD6" />
            <stop offset="100%" stopColor="#F6851B" />
          </linearGradient>
        </defs>
        <motion.line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke={config.stroke}
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
          initial={{ pathLength: 0 }}
        />
      </svg>
    </div>
  )
}
