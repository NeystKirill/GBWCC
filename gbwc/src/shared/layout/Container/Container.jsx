export default function Container({ children, className = '' }) {
  return <div className={`lyt-container${className ? ' ' + className : ''}`}>{children}</div>
}
