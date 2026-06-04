import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Toast({ message, type = 'error', onDismiss }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      onDismiss?.()
    }, 4000)
    return () => clearTimeout(t)
  }, [onDismiss])

  const colors = {
    error: 'bg-mm-card border-mm-red text-mm-red',
    success: 'bg-mm-card border-mm-green text-mm-green',
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 border px-4 py-3 font-mono text-sm ${colors[type]}`}
        >
          <span>{message}</span>
          <button onClick={() => { setVisible(false); onDismiss?.() }} className="ml-2 opacity-60 hover:opacity-100">
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
