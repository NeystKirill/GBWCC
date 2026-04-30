/**
 * Admin — redirects to the new standalone admin-app (localhost:5174/admin)
 * The old inline admin panel has been replaced by the full-featured admin-app.
 */
import { useEffect } from 'react'

export default function Admin() {
  useEffect(() => {
    // Redirect to the standalone admin-app
    const adminUrl = window.location.hostname === 'localhost'
      ? 'http://localhost:5174/admin/'
      : `${window.location.origin}/admin/`
    window.location.replace(adminUrl)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a14',
      color: '#b8914a',
      fontFamily: 'sans-serif',
      gap: 16,
    }}>
      <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 4 }}>GBWC</div>
      <div style={{ fontSize: 14, opacity: 0.6, color: '#fff' }}>
        Перенаправление в Админ-панель…
      </div>
      <div style={{
        width: 36, height: 36, border: '3px solid rgba(184,145,74,.2)',
        borderTopColor: '#b8914a', borderRadius: '50%',
        animation: 'spin .8s linear infinite',
      }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <a
        href="http://localhost:5174/admin/"
        style={{ marginTop: 8, color: '#b8914a', fontSize: 13, opacity: 0.7 }}
      >
        Открыть вручную →
      </a>
    </div>
  )
}
