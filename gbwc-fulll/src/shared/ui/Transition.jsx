import './Transition.css'

export default function Transition({ variant }) {
  const hasGem = variant === 'hero-plenary'

  return (
    <div className={`transition-band transition-band--${variant}`}>
      {hasGem && (
        <>
          <div className="transition-band__glow" />
          <div className="transition-band__divider">
            <div className="transition-band__line transition-band__line--left" />
            <div className="transition-gem" />
            <div className="transition-band__line transition-band__line--right" />
          </div>
        </>
      )}
    </div>
  )
}
