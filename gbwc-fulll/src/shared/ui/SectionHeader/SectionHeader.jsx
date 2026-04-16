/**
 * shared/ui/SectionHeader
 * Reusable eyebrow + title block used across ALL sections.
 * Props: eyebrow, title, subtitle, light (bool — white text variant)
 */
import './SectionHeader.css'
export default function SectionHeader({ eyebrow, title, subtitle, light = false, center = false }) {
  return (
    <div className={`sec-header${light ? ' sec-header--light' : ''}${center ? ' sec-header--center' : ''}`}>
      {eyebrow && (
        <div className="sec-header-eye">
          <span className="sec-header-gem" />
          {eyebrow}
        </div>
      )}
      {title && <h2 className="sec-header-title">{title}</h2>}
      {subtitle && <p className="sec-header-sub">{subtitle}</p>}
    </div>
  )
}
