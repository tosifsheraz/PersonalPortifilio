import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useState } from 'react'

export function AnimatedPet() {
  const controls = useAnimationControls()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        await controls.start({
          x: [0, 100, 200, 300, 400],
          y: [0, -30, 0, -40, 0],
          rotate: [0, 5, -5, 5, 0],
          transition: { duration: 3, ease: [0.22, 1, 0.36, 1] },
        })
        
        setIsVisible(false)
        await new Promise(resolve => setTimeout(resolve, 100))
        
        await controls.start({
          x: -200,
          transition: { duration: 0 },
        })
        
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        setIsVisible(true)
        await controls.start({
          x: [400, 300, 200, 100, 0],
          y: [0, -25, 0, -35, 0],
          rotate: [0, -5, 5, -5, 0],
          transition: { duration: 3, ease: [0.22, 1, 0.36, 1] },
        })
        
        await controls.start({
          scale: [1, 0.95, 1, 0.95, 1],
          transition: { duration: 2, repeat: 2 },
        })
        
        await new Promise(resolve => setTimeout(resolve, 4000))
      }
    }

    sequence()
  }, [controls])

  if (!isVisible) return null

  return (
    <motion.div
      animate={controls}
      className="fixed bottom-8 left-0 z-40 pointer-events-none"
      initial={{ x: 0, y: 0 }}
    >
      <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
        <motion.g
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <rect x="30" y="50" width="40" height="30" rx="8" fill="#F6851B" />
          
          <circle cx="35" cy="35" r="8" fill="#F6851B" />
          <circle cx="65" cy="35" r="8" fill="#F6851B" />
          
          <rect x="25" y="30" width="8" height="15" rx="4" fill="#F6851B" />
          <rect x="67" y="30" width="8" height="15" rx="4" fill="#F6851B" />
          
          <circle cx="45" cy="60" r="3" fill="#0D0D0D" />
          <circle cx="55" cy="60" r="3" fill="#0D0D0D" />
          
          <motion.path
            d="M 42 68 Q 50 72, 58 68"
            stroke="#0D0D0D"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            animate={{
              d: [
                'M 42 68 Q 50 72, 58 68',
                'M 42 68 Q 50 70, 58 68',
                'M 42 68 Q 50 72, 58 68',
              ],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          <motion.g
            animate={{
              x: [0, 2, 0, -2, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <rect x="20" y="78" width="6" height="12" rx="3" fill="#F6851B" />
            <rect x="35" y="78" width="6" height="12" rx="3" fill="#F6851B" />
            <rect x="59" y="78" width="6" height="12" rx="3" fill="#F6851B" />
            <rect x="74" y="78" width="6" height="12" rx="3" fill="#F6851B" />
          </motion.g>
          
          <motion.path
            d="M 70 55 Q 85 50, 90 55"
            stroke="#F6851B"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            animate={{
              rotate: [0, 20, -20, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '70px 55px' }}
          />
          
          <motion.circle
            cx="38"
            cy="58"
            r="2"
            fill="#FFAB40"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.circle
            cx="62"
            cy="58"
            r="2"
            fill="#FFAB40"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
          />
        </motion.g>
      </svg>
    </motion.div>
  )
}
