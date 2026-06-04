import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Sparkles() {
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    const handleClick = (e) => {
      const newSparkles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        angle: (i * 360) / 8,
      }))
      setSparkles((prev) => [...prev, ...newSparkles])
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => !newSparkles.find((ns) => ns.id === s.id)))
      }, 1000)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{
              x: sparkle.x,
              y: sparkle.y,
              scale: 0,
              opacity: 1,
            }}
            animate={{
              x: sparkle.x + Math.cos((sparkle.angle * Math.PI) / 180) * 60,
              y: sparkle.y + Math.sin((sparkle.angle * Math.PI) / 180) * 60,
              scale: [0, 1, 0],
              opacity: [1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute w-1 h-1 rounded-full bg-mm-orange"
            style={{
              boxShadow: '0 0 8px 2px #F6851B',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
