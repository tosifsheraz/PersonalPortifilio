import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const PW = 18
const PH = 52
const GAP = 2
const TOTAL_W = PW * 4 + GAP * 3
const CANVAS_H = 140

const BASE_ORANGE = '#f97316'
const LIGHT_ORANGE = '#fb923c'
const C_PANEL = '#080808'
const C_DETAIL = '#1c1c1c'
const C_SHADOW = 'rgba(249,115,22,0.4)'

// Bounce animation on load
const BOUNCE_HEIGHT = 300
const BOUNCE_DURATION = 0.8

function Panel({ x, y, angle, glowPulse, isWalking }) {
  const accentOpacity = 0.6 + glowPulse * 0.4
  const circuitOpacity = 0.3 + glowPulse * 0.2

  return (
    <g transform={`translate(${x}, ${y}) rotate(${angle}, ${PW / 2}, 0)`}>
      <rect
        width={PW + 2}
        height={PH + 2}
        x="-1"
        y="-1"
        fill="none"
        stroke={BASE_ORANGE}
        strokeWidth="3"
        strokeOpacity="0.2"
        rx="3"
      />
      
      <rect
        width={PW}
        height={PH}
        fill={C_PANEL}
        stroke={BASE_ORANGE}
        strokeWidth="1.5"
        rx="2"
      />
      <rect x="1.5" y="1.5" width={PW - 3} height={PH - 3} fill={C_DETAIL} rx="1" />
      
      <g opacity={circuitOpacity} stroke={BASE_ORANGE} strokeWidth="0.5" fill="none">
        <path d={`M ${PW*0.2}, 10 H ${PW*0.8} V 20 H ${PW*0.2} V 10`} />
        <path d={`M ${PW*0.3}, 14 H ${PW*0.7} V 16 H ${PW*0.3} V 14`} />
        <path d={`M ${PW*0.5}, 22 V 30 H ${PW*0.2} V 32 M ${PW*0.5}, 30 H ${PW*0.8} V 32`} />
        <circle cx={PW*0.5} cy="22" r="1.2" fill={BASE_ORANGE}/>
        <line x1="3" y1="38" x2={PW-3} y2="38"/>
        <line x1={PW*0.2} y1="42" x2={PW*0.3} y2="44"/>
        <line x1={PW*0.3} y1="42" x2={PW*0.2} y2="44"/>
        <line x1={PW*0.5} y1="42" x2={PW*0.5} y2="44"/>
        <line x1={PW*0.8} y1="42" x2={PW*0.7} y2="44"/>
        <line x1={PW*0.7} y1="42" x2={PW*0.8} y2="44"/>
      </g>
      
      <circle
        cx={PW / 2}
        cy="4"
        r="1.8"
        fill={LIGHT_ORANGE}
        opacity={accentOpacity}
      />
      <rect
        x={PW - 2.5}
        y="6"
        width="1.2"
        height={PH - 12}
        fill={LIGHT_ORANGE}
        opacity={accentOpacity * 0.8}
        rx="0.6"
      />
    </g>
  )
}

function TarsSVG({ walkPhase, glowPulse, isWalking }) {
  // Only apply walking animations when scrolling/moving horizontally
  const t = isWalking ? walkPhase : 0
  const waddle = Math.sin(t) * 8
  const bounce = Math.abs(Math.sin(t * 2)) * 4
  
  const angA = Math.sin(t) * 28
  const angD = -Math.sin(t) * 28
  const angB = Math.cos(t) * 4
  const angC = Math.cos(t) * 4

  return (
    <svg
      width={TOTAL_W + 40}
      height={CANVAS_H}
      viewBox={`0 0 ${TOTAL_W + 40} ${CANVAS_H}`}
      className="overflow-visible"
    >
      <ellipse
        cx={TOTAL_W / 2 + 20}
        cy={40 + PH + 4}
        rx={TOTAL_W / 1.5}
        ry="6"
        fill={C_SHADOW}
        opacity={0.4 - glowPulse * 0.1}
      />

      <g transform={`translate(20, ${40 - bounce}) rotate(${waddle}, ${TOTAL_W / 2}, ${PH})`}>
        <Panel x={0 * (PW + GAP)} y={0} angle={angA} glowPulse={glowPulse} isWalking={isWalking} />
        <Panel x={1 * (PW + GAP)} y={0} angle={angB} glowPulse={glowPulse} isWalking={isWalking} />
        <Panel x={2 * (PW + GAP)} y={0} angle={angC} glowPulse={glowPulse} isWalking={isWalking} />
        <Panel x={3 * (PW + GAP)} y={0} angle={angD} glowPulse={glowPulse} isWalking={isWalking} />
      </g>
      
      <line
        x1="-20"
        y1={40 + PH + 6}
        x2={TOTAL_W + 60}
        y2={40 + PH + 6}
        stroke={BASE_ORANGE}
        strokeWidth="1.5"
        strokeOpacity="0.15"
        strokeDasharray="6 6"
      />
    </svg>
  )
}

export function TarsRobot() {
  const [walkPhase, setWalkPhase] = useState(0)
  const [glowPulse, setGlowPulse] = useState(0.5)
  const [hasScrolled, setHasScrolled] = useState(false)
  const frameRef = useRef(0)
  const [loadingComplete, setLoadingComplete] = useState(false)

  const { scrollYProgress } = useScroll()
  
  // Drop animation - starts at -BOUNCE_HEIGHT, bounces to 0
  const [dropY, setDropY] = useState(-BOUNCE_HEIGHT)
  
  // Horizontal movement based on scroll
  const xProgress = useTransform(scrollYProgress, [0, 1], [0, 1])
  const xSpring = useSpring(xProgress, { stiffness: 100, damping: 30 })
  
  const x = useTransform(xSpring, (value) => {
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000
    return value * (windowWidth - TOTAL_W - 80)
  })

  // Opacity fades in at start and out at end
  const opacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0])

  // Detect if user has scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (scrollYProgress.get() > 0.01 && !hasScrolled) {
        setHasScrolled(true)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasScrolled, scrollYProgress])

  // Drop animation on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true)
      // Trigger bounce animation
      setDropY(0)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let raf
    
    const tick = () => {
      frameRef.current++
      setGlowPulse(0.45 + Math.sin(frameRef.current * 0.05) * 0.3)
      setWalkPhase((prev) => prev + 0.06)
      raf = requestAnimationFrame(tick)
    }
    
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 40,
        bottom: 20,
        x,
        opacity,
        width: `${TOTAL_W + 40}px`,
        height: `${CANVAS_H}px`,
        zIndex: 50,
        pointerEvents: 'none',
      }}
      initial={{ y: -BOUNCE_HEIGHT }}
      animate={loadingComplete ? { y: [0, -40, -20, -8, 0], transition: { duration: BOUNCE_DURATION, type: 'spring', bounce: 0.6 } } : { y: -BOUNCE_HEIGHT }}
    >
      <TarsSVG walkPhase={walkPhase} glowPulse={glowPulse} isWalking={hasScrolled} />
    </motion.div>
  )
}
