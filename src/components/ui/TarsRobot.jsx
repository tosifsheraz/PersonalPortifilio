import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

const PW = 18
const PH = 52
const GAP = 2
const TOTAL_W = PW * 4 + GAP * 3
const CANVAS_H = 140
const SHELF_TOP = 70
const SHELF_Y = 92
const SHELF_ROBOT_X = 30
const SHELF_ROBOT_SCALE = 1.16
const SHELF_ROBOT_TOP = SHELF_TOP + SHELF_Y - (40 + PH) * SHELF_ROBOT_SCALE

const BASE_ORANGE = '#f97316'
const LIGHT_ORANGE = '#fb923c'
const C_PANEL = '#080808'
const C_DETAIL = '#1c1c1c'
const C_SHADOW = 'rgba(249,115,22,0.4)'

const BOOKS = [
  { x: 5, tilt: -7, width: 17, height: 61, color: '#101010', accent: '#f97316', label: '01', fall: -14 },
  { x: 24, tilt: 4, width: 18, height: 66, color: '#1c1c1c', accent: '#fb923c', label: '10', fall: 12 },
  { x: 44, tilt: -4, width: 17, height: 63, color: '#090909', accent: '#ea580c', label: '11', fall: -8 },
  { x: 158, tilt: 6, width: 18, height: 64, color: '#202020', accent: '#fdba74', label: '00', fall: 10 },
  { x: 178, tilt: -6, width: 17, height: 68, color: '#111111', accent: '#ea580c', label: '01', fall: -12 },
  { x: 197, tilt: 5, width: 18, height: 62, color: '#1c1c1c', accent: '#fb923c', label: '10', fall: 15 },
]

const BOOK_ONLY_BOOKS = [
  { x: 5, tilt: -6, width: 18, height: 63, color: '#101010', accent: '#f97316', label: '01', fall: -12 },
  { x: 25, tilt: 4, width: 18, height: 67, color: '#1c1c1c', accent: '#fb923c', label: '10', fall: 10 },
  { x: 45, tilt: -3, width: 17, height: 64, color: '#090909', accent: '#ea580c', label: '11', fall: -8 },
  { x: 64, tilt: 5, width: 18, height: 66, color: '#202020', accent: '#fdba74', label: '00', fall: 12 },
  { x: 84, tilt: -5, width: 17, height: 62, color: '#111111', accent: '#ea580c', label: '01', fall: -10 },
  { x: 103, tilt: 4, width: 18, height: 68, color: '#1c1c1c', accent: '#fb923c', label: '10', fall: 14 },
  { x: 123, tilt: -4, width: 18, height: 64, color: '#090909', accent: '#f97316', label: '11', fall: -9 },
  { x: 143, tilt: 6, width: 17, height: 66, color: '#202020', accent: '#fdba74', label: '00', fall: 11 },
  { x: 162, tilt: -5, width: 18, height: 68, color: '#111111', accent: '#ea580c', label: '01', fall: -13 },
  { x: 182, tilt: 5, width: 18, height: 62, color: '#1c1c1c', accent: '#fb923c', label: '10', fall: 15 },
]

function Panel({ x, angle, glowPulse }) {
  const accentOpacity = 0.6 + glowPulse * 0.4
  const circuitOpacity = 0.3 + glowPulse * 0.2

  return (
    <g transform={`translate(${x}, 0) rotate(${angle}, ${PW / 2}, 0)`}>
      <rect width={PW + 2} height={PH + 2} x="-1" y="-1" fill="none" stroke={BASE_ORANGE} strokeWidth="3" strokeOpacity="0.2" rx="3" />
      <rect width={PW} height={PH} fill={C_PANEL} stroke={BASE_ORANGE} strokeWidth="1.5" rx="2" />
      <rect x="1.5" y="1.5" width={PW - 3} height={PH - 3} fill={C_DETAIL} rx="1" />
      <g opacity={circuitOpacity} stroke={BASE_ORANGE} strokeWidth="0.5" fill="none">
        <path d={`M ${PW * 0.2}, 10 H ${PW * 0.8} V 20 H ${PW * 0.2} V 10`} />
        <path d={`M ${PW * 0.3}, 14 H ${PW * 0.7} V 16 H ${PW * 0.3} V 14`} />
        <path d={`M ${PW * 0.5}, 22 V 30 H ${PW * 0.2} V 32 M ${PW * 0.5}, 30 H ${PW * 0.8} V 32`} />
        <circle cx={PW * 0.5} cy="22" r="1.2" fill={BASE_ORANGE} />
        <line x1="3" y1="38" x2={PW - 3} y2="38" />
        <line x1={PW * 0.2} y1="42" x2={PW * 0.3} y2="44" />
        <line x1={PW * 0.3} y1="42" x2={PW * 0.2} y2="44" />
        <line x1={PW * 0.5} y1="42" x2={PW * 0.5} y2="44" />
        <line x1={PW * 0.8} y1="42" x2={PW * 0.7} y2="44" />
        <line x1={PW * 0.7} y1="42" x2={PW * 0.8} y2="44" />
      </g>
      <circle cx={PW / 2} cy="4" r="1.8" fill={LIGHT_ORANGE} opacity={accentOpacity} />
      <rect x={PW - 2.5} y="6" width="1.2" height={PH - 12} fill={LIGHT_ORANGE} opacity={accentOpacity * 0.8} rx="0.6" />
    </g>
  )
}

function TarsSVG({ walkPhase, glowPulse, isWalking, releaseProgress }) {
  const t = isWalking ? walkPhase : 0
  const waddle = Math.sin(t) * 8
  const bounce = Math.abs(Math.sin(t * 2)) * 4
  const groundOpacity = useTransform(releaseProgress, [0.06, 0.12], [0, 1])
  const angA = Math.sin(t) * 28
  const angD = -Math.sin(t) * 28
  const angB = Math.cos(t) * 4
  const angC = Math.cos(t) * 4

  return (
    <svg width={TOTAL_W + 40} height={CANVAS_H} viewBox={`0 0 ${TOTAL_W + 40} ${CANVAS_H}`} className="overflow-visible">
      <motion.ellipse style={{ opacity: groundOpacity }} cx={TOTAL_W / 2 + 20} cy={40 + PH + 4} rx={TOTAL_W / 1.5} ry="6" fill={C_SHADOW} />
      <g transform={`translate(20, ${40 - bounce}) rotate(${waddle}, ${TOTAL_W / 2}, ${PH})`}>
        <Panel x={0 * (PW + GAP)} angle={angA} glowPulse={glowPulse} />
        <Panel x={1 * (PW + GAP)} angle={angB} glowPulse={glowPulse} />
        <Panel x={2 * (PW + GAP)} angle={angC} glowPulse={glowPulse} />
        <Panel x={3 * (PW + GAP)} angle={angD} glowPulse={glowPulse} />
      </g>
      <motion.line
        style={{ opacity: groundOpacity }}
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

function Book({ book, index, releaseProgress }) {
  const y = useTransform(releaseProgress, (value) => {
    if (value <= 0.035) return 0
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 900
    return ((value - 0.035) / 0.105) * (windowHeight - SHELF_TOP + 120 + index * 18)
  })
  const x = useTransform(releaseProgress, [0.035, 0.13], [0, book.fall])
  const rotate = useTransform(releaseProgress, [0, 0.035, 0.13], [book.tilt, book.tilt, book.tilt + book.fall * 1.8])
  const opacity = useTransform(releaseProgress, [0.09, 0.145], [1, 0])

  return (
    <motion.g style={{ x, y, rotate, opacity, transformBox: 'fill-box', transformOrigin: 'center bottom' }}>
      <rect x={book.x} y={92 - book.height} width={book.width} height={book.height} fill={book.color} stroke={book.accent} strokeWidth="1.4" rx="2" />
      <rect x={book.x + 3} y={97 - book.height} width="2" height={book.height - 10} fill={book.accent} opacity="0.75" rx="1" />
      <rect x={book.x + book.width - 5} y={97 - book.height} width="2" height={book.height - 10} fill={book.accent} opacity="0.2" rx="1" />
      <g fill="none" stroke={book.accent} strokeWidth="0.65" opacity="0.65">
        <path d={`M ${book.x + 7} ${107 - book.height} H ${book.x + book.width - 5} V ${117 - book.height} H ${book.x + 7} Z`} />
        <line x1={book.x + 7} y1="76" x2={book.x + book.width - 5} y2="76" />
      </g>
      <circle cx={book.x + book.width - 8} cy={102 - book.height} r="1.3" fill={book.accent} />
      <text x={book.x + book.width / 2 + 1} y="87" fill={book.accent} opacity="0.8" fontSize="4.5" fontFamily="monospace" textAnchor="middle">
        {book.label}
      </text>
    </motion.g>
  )
}

function Bookshelf({ releaseProgress, side = 'left', books = BOOKS }) {
  const shelfOpacity = useTransform(releaseProgress, [0.045, 0.11], [1, 0])
  const shelfY = useTransform(releaseProgress, [0.045, 0.12], [0, 22])

  return (
    <motion.svg
      width="225"
      height="118"
      viewBox="0 0 225 118"
      style={{ position: 'fixed', top: SHELF_TOP, [side]: 12, zIndex: 40, overflow: 'visible', pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {books.map((book, index) => <Book key={book.x} book={book} index={index} releaseProgress={releaseProgress} />)}
      <motion.g style={{ opacity: shelfOpacity, y: shelfY }}>
        <rect x="0" y="92" width="220" height="8" fill="#111111" stroke="#f97316" strokeWidth="1.4" rx="1" />
        <rect x="6" y="100" width="208" height="3" fill="#f97316" opacity="0.28" />
        <circle cx="10" cy="96" r="1.2" fill="#fb923c" />
        <circle cx="210" cy="96" r="1.2" fill="#fb923c" />
      </motion.g>
    </motion.svg>
  )
}

export function TarsRobot() {
  const [walkPhase, setWalkPhase] = useState(0)
  const [glowPulse, setGlowPulse] = useState(0.5)
  const [isWalking, setIsWalking] = useState(false)
  const frameRef = useRef(0)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 145, damping: 28, mass: 0.65 })
  const resolvedX = useTransform(smoothProgress, (value) => {
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000
    if (value <= 0.04) return SHELF_ROBOT_X
    if (value < 0.13) return SHELF_ROBOT_X * (1 - (value - 0.04) / 0.09)
    const visibleTravel = Math.max(windowWidth - TOTAL_W - 100, 0)
    if (value < 0.92) return ((value - 0.13) / 0.79) * visibleTravel
    return visibleTravel + ((value - 0.92) / 0.08) * (TOTAL_W + 140)
  })
  const y = useTransform(smoothProgress, (value) => {
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 900
    const floor = windowHeight - (40 + PH) - 8
    if (value <= 0.04) return SHELF_ROBOT_TOP
    if (value < 0.07) return SHELF_ROBOT_TOP + ((value - 0.04) / 0.03) * (floor + 30 - SHELF_ROBOT_TOP)
    if (value < 0.095) return floor + 30 - ((value - 0.07) / 0.025) * 56
    if (value < 0.118) return floor - 26 + ((value - 0.095) / 0.023) * 36
    if (value < 0.14) return floor + 10 - ((value - 0.118) / 0.022) * 10
    return floor
  })
  const scale = useTransform(smoothProgress, [0, 0.04, 0.12], [SHELF_ROBOT_SCALE, SHELF_ROBOT_SCALE, 1])
  const robotOpacity = useTransform(smoothProgress, [0.91, 0.985], [1, 0])

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (value) => setIsWalking(value > 0.14))
    return unsubscribe
  }, [smoothProgress])

  useEffect(() => {
    if (!isWalking) return
    let raf
    const tick = () => {
      frameRef.current += 1
      setGlowPulse(0.45 + Math.sin(frameRef.current * 0.05) * 0.3)
      setWalkPhase((previous) => previous + 0.06)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isWalking])

  return (
    <>
      <Bookshelf releaseProgress={smoothProgress} />
      <Bookshelf releaseProgress={smoothProgress} side="right" books={BOOK_ONLY_BOOKS} />
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 12,
          x: resolvedX,
          y,
          scale,
          opacity: robotOpacity,
          transformOrigin: 'top left',
          width: `${TOTAL_W + 40}px`,
          height: `${CANVAS_H}px`,
          zIndex: 50,
          pointerEvents: 'none',
        }}
      >
        <TarsSVG walkPhase={walkPhase} glowPulse={glowPulse} isWalking={isWalking} releaseProgress={smoothProgress} />
      </motion.div>
    </>
  )
}
