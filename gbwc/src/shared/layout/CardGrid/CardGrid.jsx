export default function CardGrid({ children, cols = 3, className = '' }) {
  return (
    <div className={`card-grid card-grid--${cols} ${className}`.trim()}>
      {children}
    </div>
  )
}
