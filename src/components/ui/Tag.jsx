export function Tag({ children, className = '' }) {
  return (
    <span className={`inline-block border border-mm-border px-2 py-0.5 text-xs font-mono bg-mm-surface text-mm-muted ${className}`}>
      {children}
    </span>
  )
}
