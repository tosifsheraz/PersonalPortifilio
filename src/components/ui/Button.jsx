import { motion } from 'framer-motion'

const variantStyles = {
  primary: {
    base: 'bg-mm-orange text-mm-bg border-2 border-mm-orange font-display font-bold',
    shadow: '4px 4px 0px 0px #E2761B',
    hoverShadow: '2px 2px 0px 0px #E2761B',
    tapShadow: '0px 0px 0px 0px #E2761B',
  },
  secondary: {
    base: 'bg-transparent text-mm-white border-2 border-mm-border font-display font-bold',
    shadow: '4px 4px 0px 0px #2E2E32',
    hoverShadow: '2px 2px 0px 0px #F6851B',
    tapShadow: '0px 0px 0px 0px #2E2E32',
  },
  blue: {
    base: 'bg-mm-blue text-white border-2 border-mm-blue font-display font-bold',
    shadow: '4px 4px 0px 0px #0260A4',
    hoverShadow: '2px 2px 0px 0px #0260A4',
    tapShadow: '0px 0px 0px 0px #0260A4',
  },
  danger: {
    base: 'bg-mm-red text-white border-2 border-mm-red font-display font-bold',
    shadow: '4px 4px 0px 0px #9B1C1C',
    hoverShadow: '2px 2px 0px 0px #9B1C1C',
    tapShadow: '0px 0px 0px 0px #9B1C1C',
  },
  ghost: {
    base: 'bg-transparent text-mm-muted border-2 border-mm-border font-display font-bold',
    shadow: 'none',
    hoverShadow: 'none',
    tapShadow: 'none',
  },
}

export function Button({ children, onClick, disabled = false, variant = 'primary', className = '', type = 'button', href }) {
  const v = variantStyles[variant] || variantStyles.primary
  const base = `inline-flex items-center gap-2 px-5 py-2.5 text-sm cursor-pointer select-none ${v.base}`
  const disabledClass = disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''

  const motionProps = disabled
    ? {}
    : {
        whileHover: {
          x: 2,
          y: 2,
          boxShadow: v.hoverShadow,
          transition: { duration: 0.12 },
        },
        whileTap: {
          x: 4,
          y: 4,
          boxShadow: v.tapShadow,
          transition: { duration: 0.08 },
        },
      }

  const style = { boxShadow: v.shadow }

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        style={style}
        {...motionProps}
        className={`${base} ${disabledClass} ${className}`}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      {...motionProps}
      className={`${base} ${disabledClass} ${className}`}
    >
      {children}
    </motion.button>
  )
}
