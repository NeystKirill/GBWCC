export default function Section({ children, dark, warm, tight, className = '' }) {
  const cls = [
    'lyt-section',
    dark   ? 'lyt-section--dark'  : 'lyt-section--white',
    warm   ? 'lyt-section--warm'  : '',
    tight  ? 'lyt-section--tight' : '',
    className,
  ].filter(Boolean).join(' ')
  return <section className={cls}>{children}</section>
}
