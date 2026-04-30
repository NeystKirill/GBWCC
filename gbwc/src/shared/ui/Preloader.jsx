import { useEffect, useState } from 'react'
import './Preloader.css'

export default function Preloader() {
  const [visible] = useState(() => !sessionStorage.getItem('gbwc_loaded'))
  const [phase, setPhase] = useState('intro')

  useEffect(() => {
    if (!visible) return
    sessionStorage.setItem('gbwc_loaded', '1')
    const t1 = setTimeout(() => setPhase('out'), 1800)
    const t2 = setTimeout(() => setPhase('done'), 2400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [visible])

  if (!visible || phase === 'done') return null

  return (
    <div className={`pl ${phase === 'out' ? 'pl--out' : ''}`}>
      <div className="pl-wrap">
        <img src="/img/own/logo.svg" alt="GBWC" className="pl-logo" />
        <div className={`pl-letters ${phase === 'out' ? 'pl-letters--hide' : ''}`}>
          {['G','B','W','C'].map((l, i) => (
            <span key={i} className="pl-char" style={{ animationDelay: `${0.35 + i * 0.18}s` }}>{l}</span>
          ))}
        </div>
      </div>
      <div className="pl-footer">
        <div className="pl-line" />
        <p className="pl-name">Global Businesswomen Council</p>
      </div>
    </div>
  )
}
