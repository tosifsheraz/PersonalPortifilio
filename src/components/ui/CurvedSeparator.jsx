import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function CurvedSeparator({ color = '#F6851B', className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const pathLength = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  const curvedPath = 'M 0 20 Q 200 0, 400 20 T 800 20 T 1200 20 T 1600 20 T 2000 20'

  return (
    <div ref={ref} className={`w-full h-8 relative overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 2000 40"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id={`curve-gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="50%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.2" />
          </linearGradient>
          <filter id={`curve-glow-${color}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <motion.path
          d={curvedPath}
          fill="none"
          stroke={`url(#curve-gradient-${color})`}
          strokeWidth="3"
          strokeLinecap="round"
          style={{ pathLength }}
          filter={`url(#curve-glow-${color})`}
        />
        
        <motion.path
          d={curvedPath}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeOpacity="0.2"
          style={{ pathLength }}
          filter="blur(8px)"
        />
      </svg>
    </div>
  )
}
