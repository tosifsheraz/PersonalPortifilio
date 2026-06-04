export const fadeUpVariant = {
  hidden: { opacity: 0, y: 60, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeDownVariant = {
  hidden: { opacity: 0, y: -40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeLeftVariant = {
  hidden: { opacity: 0, x: -80, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeRightVariant = {
  hidden: { opacity: 0, x: 80, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export const scaleUpVariant = {
  hidden: { opacity: 0, scale: 0.7, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
  },
}

export const staggerContainerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

export const staggerFastVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const pressVariant = {
  whileTap: { 
    x: 3, 
    y: 3, 
    scale: 0.98,
    boxShadow: 'none',
    transition: { duration: 0.1 }
  },
}

export const cardHoverVariant = {
  rest: { 
    y: 0, 
    scale: 1,
    boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
    filter: 'brightness(1)'
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: '12px 12px 0px 0px #F6851B',
    filter: 'brightness(1.1)',
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
}

export const glowPulseVariant = {
  initial: { opacity: 0.4, scale: 1 },
  animate: {
    opacity: [0.4, 1, 0.4],
    scale: [1, 1.05, 1],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const slideInLeftVariant = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

export const slideInRightVariant = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    x: 100,
    opacity: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

export const rotateInVariant = {
  hidden: { opacity: 0, rotate: -10, scale: 0.9 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
  },
}

export const magneticVariant = {
  rest: { x: 0, y: 0 },
  hover: (custom) => ({
    x: custom?.x || 0,
    y: custom?.y || 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  }),
}

