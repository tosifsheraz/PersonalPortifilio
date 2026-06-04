import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

export function ScrollScrubVideo({ videoSrc, className = '' }) {
  const trackRef = useRef(null)
  const videoRef = useRef(null)
  const [videoDuration, setVideoDuration] = useState(0)
  const rafRef = useRef(null)
  const targetTimeRef = useRef(0)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration)
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata)
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (videoDuration > 0) {
      targetTimeRef.current = latest * videoDuration
    }
  })

  useEffect(() => {
    const video = videoRef.current
    if (!video || videoDuration === 0) return

    const updateVideoTime = () => {
      const targetTime = targetTimeRef.current
      const currentTime = video.currentTime
      const diff = Math.abs(targetTime - currentTime)

      if (diff > 0.01) {
        video.currentTime = currentTime + (targetTime - currentTime) * 0.1
      }

      rafRef.current = requestAnimationFrame(updateVideoTime)
    }

    rafRef.current = requestAnimationFrame(updateVideoTime)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [videoDuration])

  return (
    <div ref={trackRef} className={`relative ${className}`} style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-mm-bg overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-full"
        >
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 pointer-events-none border-4 border-mm-orange/20" />
        </motion.div>
      </div>
    </div>
  )
}
