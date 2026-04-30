/**
 * Shared UI primitives for API states
 */

export function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '80px 24px', gap: '20px',
    }}>
      <div style={{
        width: 44, height: 44,
        border: '3px solid rgba(184,145,74,.2)',
        borderTopColor: '#b8914a',
        borderRadius: '50%',
        animation: 'gbwc-spin .8s linear infinite',
      }} />
      <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>{text}</p>
      <style>{`@keyframes gbwc-spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '80px 24px', gap: '16px', textAlign: 'center',
    }}>
      <div style={{ fontSize: '2.5rem' }}>⚠️</div>
      <p style={{ color: '#c0392b', fontSize: '0.95rem', margin: 0 }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '10px 24px', background: '#b8914a', color: '#fff',
            border: 'none', borderRadius: '4px', cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          Retry
        </button>
      )}
    </div>
  )
}

export function EmptyState({ text = 'No items found.' }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '80px 24px',
    }}>
      <p style={{ color: '#aaa', fontSize: '1rem', margin: 0 }}>{text}</p>
    </div>
  )
}

export function Pagination({ page, pages, onPage }) {
  if (pages <= 1) return null
  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '48px' }}>
      {Array.from({ length: pages }, (_, i) => i + 1).map(n => (
        <button
          key={n}
          onClick={() => onPage(n)}
          style={{
            width: 40, height: 40, border: 'none', borderRadius: '4px',
            background: n === page ? '#b8914a' : 'rgba(0,0,0,.08)',
            color:      n === page ? '#fff'    : '#333',
            cursor: 'pointer', fontWeight: n === page ? 700 : 400,
            transition: 'background .2s',
          }}
        >
          {n}
        </button>
      ))}
    </div>
  )
}
