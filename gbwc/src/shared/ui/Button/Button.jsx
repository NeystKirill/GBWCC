/**
 * shared/ui/Button
 * Unified button. variant: 'primary' | 'secondary' | 'ghost' | 'outline'
 */
import { Link } from 'react-router-dom'
import './Button.css'

export default function Button({ children, to, href, onClick, variant = 'primary', className = '', ...props }) {
  const cls = `btn btn--${variant}${className ? ' ' + className : ''}`
  if (to)   return <Link to={to} className={cls} {...props}>{children}</Link>
  if (href) return <a href={href} className={cls} target="_blank" rel="noreferrer" {...props}>{children}</a>
  return <button onClick={onClick} className={cls} {...props}>{children}</button>
}
