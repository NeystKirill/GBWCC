export default function SplitSection({ children, reversed = false, wideLeft = false, wideRight = false, className = '' }) {
  const cls = [
    'split-section',
    reversed   ? 'split-section--reversed'   : '',
    wideLeft   ? 'split-section--wide-left'  : '',
    wideRight  ? 'split-section--wide-right' : '',
    className,
  ].filter(Boolean).join(' ')
  return <div className={cls}>{children}</div>
}

export function SplitText({ children })  { return <div className="split-section__text">{children}</div>  }
export function SplitMedia({ children }) { return <div className="split-section__media">{children}</div> }
