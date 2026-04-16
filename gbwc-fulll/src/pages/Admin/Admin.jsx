/**
 * src/pages/Admin/Admin.jsx
 *
 * Добавь в App.jsx маршрут:
 *   <Route path="/admin/*" element={<Admin />} />
 *
 * Добавь в .env:
 *   VITE_API_URL=https://your-backend.vercel.app/api
 */
import { useState, useEffect, useCallback } from 'react'
import './Admin.css'

const API = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

// ─── API helpers ──────────────────────────────────────────────────────────────
function getToken()      { return localStorage.getItem('gbwc_admin_at') }
function setToken(t)     { localStorage.setItem('gbwc_admin_at', t) }
function clearToken()    { localStorage.removeItem('gbwc_admin_at'); localStorage.removeItem('gbwc_rt') }

async function apiFetch(path, opts = {}) {
  const token = getToken()
  const res = await fetch(`${API}${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opts.headers,
    },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw Object.assign(new Error(err.error || `Ошибка ${res.status}`), { status: res.status })
  }
  return res.json().catch(() => null)
}

// ─── Статусы ──────────────────────────────────────────────────────────────────
const STATUSES = {
  new:        { label: 'Новая',      color: '#e8b84b' },
  inprogress: { label: 'В работе',   color: '#4b9ee8' },
  done:       { label: 'Завершена',  color: '#4bbc7a' },
}

function StatusBadge({ status }) {
  const s = STATUSES[status] || { label: status, color: '#aaa' }
  return (
    <span className="adm-badge" style={{ background: s.color + '22', color: s.color, border: `1px solid ${s.color}55` }}>
      {s.label}
    </span>
  )
}

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const submit = async e => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      setToken(data.tokens.accessToken)
      localStorage.setItem('gbwc_rt', data.tokens.refreshToken)
      onLogin(data.user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="adm-login-wrap">
      <div className="adm-login-card">
        <div className="adm-login-logo">GBWC</div>
        <h1 className="adm-login-title">Админ-панель</h1>
        <form onSubmit={submit}>
          <div className="adm-field">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
          </div>
          <div className="adm-field">
            <label>Пароль</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <p className="adm-error">{error}</p>}
          <button className="adm-btn adm-btn--primary adm-btn--full" disabled={loading}>
            {loading ? 'Вход…' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Contact detail modal ─────────────────────────────────────────────────────
function ContactModal({ contact, onClose, onStatusChange, onDelete }) {
  const [changing, setChanging] = useState(false)

  const changeStatus = async status => {
    setChanging(true)
    try {
      const updated = await apiFetch(`/contact/${contact.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })
      onStatusChange(updated)
    } catch (err) {
      alert(err.message)
    } finally {
      setChanging(false)
    }
  }

  const del = async () => {
    if (!confirm('Удалить эту заявку?')) return
    try {
      await apiFetch(`/contact/${contact.id}`, { method: 'DELETE' })
      onDelete(contact.id)
    } catch (err) {
      alert(err.message)
    }
  }

  const fmt = s => new Date(s).toLocaleString('ru-RU', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' })

  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div className="adm-modal" onClick={e => e.stopPropagation()}>
        <div className="adm-modal-header">
          <div>
            <h2 className="adm-modal-title">{contact.subject}</h2>
            <span className="adm-modal-date">{fmt(contact.created_at)}</span>
          </div>
          <button className="adm-modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="adm-modal-meta">
          <div className="adm-meta-row"><span>Имя</span><strong>{contact.name}</strong></div>
          <div className="adm-meta-row"><span>Email</span><a href={`mailto:${contact.email}`}>{contact.email}</a></div>
          {contact.company && <div className="adm-meta-row"><span>Компания</span><strong>{contact.company}</strong></div>}
          <div className="adm-meta-row"><span>Статус</span><StatusBadge status={contact.status} /></div>
        </div>

        <div className="adm-modal-message">
          <div className="adm-modal-message-label">Сообщение</div>
          <div className="adm-modal-message-body">{contact.message}</div>
        </div>

        <div className="adm-modal-actions">
          <div className="adm-status-btns">
            {Object.entries(STATUSES).map(([key, { label }]) => (
              <button
                key={key}
                className={`adm-btn adm-btn--status ${contact.status === key ? 'active' : ''}`}
                style={contact.status === key ? { background: STATUSES[key].color, color: '#fff' } : {}}
                onClick={() => changeStatus(key)}
                disabled={changing || contact.status === key}
              >
                {label}
              </button>
            ))}
          </div>
          <button className="adm-btn adm-btn--danger" onClick={del}>Удалить</button>
        </div>
      </div>
    </div>
  )
}

// ─── Main dashboard ───────────────────────────────────────────────────────────
function Dashboard({ user, onLogout }) {
  const [contacts, setContacts]   = useState([])
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 })
  const [stats, setStats]         = useState({ new: 0, inprogress: 0, done: 0 })
  const [filterStatus, setFilter] = useState('all')
  const [search, setSearch]       = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading]     = useState(true)
  const [selected, setSelected]   = useState(null)
  const [page, setPage]           = useState(1)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page, limit: 20 })
      if (filterStatus !== 'all') params.set('status', filterStatus)
      if (search) params.set('search', search)
      const data = await apiFetch(`/contact?${params}`)
      setContacts(data.items)
      setPagination(data.pagination)
      setStats(data.stats)
    } catch (err) {
      if (err.status === 401) onLogout()
    } finally {
      setLoading(false)
    }
  }, [page, filterStatus, search, onLogout])

  useEffect(() => { load() }, [load])

  const handleStatusChange = updated => {
    setContacts(cs => cs.map(c => c.id === updated.id ? updated : c))
    if (selected?.id === updated.id) setSelected(updated)
  }
  const handleDelete = id => {
    setContacts(cs => cs.filter(c => c.id !== id))
    setSelected(null)
  }

  const doSearch = e => {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  const fmt = s => new Date(s).toLocaleString('ru-RU', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' })

  return (
    <div className="adm-root">
      {/* Sidebar */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar-logo">GBWC</div>
        <nav className="adm-nav">
          <div className="adm-nav-label">Заявки</div>
          {[['all', 'Все'], ...Object.entries(STATUSES).map(([k,v]) => [k, v.label])].map(([key, label]) => (
            <button
              key={key}
              className={`adm-nav-item ${filterStatus === key ? 'active' : ''}`}
              onClick={() => { setFilter(key); setPage(1) }}
            >
              <span>{label}</span>
              {key !== 'all' && <span className="adm-nav-count">{stats[key] || 0}</span>}
              {key === 'all' && <span className="adm-nav-count">{Object.values(stats).reduce((a,b)=>a+b,0)}</span>}
            </button>
          ))}
        </nav>
        <div className="adm-sidebar-user">
          <div className="adm-sidebar-email">{user.email}</div>
          <button className="adm-btn adm-btn--ghost" onClick={onLogout}>Выйти</button>
        </div>
      </aside>

      {/* Main */}
      <main className="adm-main">
        <div className="adm-topbar">
          <h1 className="adm-page-title">
            {filterStatus === 'all' ? 'Все заявки' : STATUSES[filterStatus]?.label}
            <span className="adm-total"> · {pagination.total}</span>
          </h1>
          <form className="adm-search" onSubmit={doSearch}>
            <input
              type="text"
              placeholder="Поиск по имени, email, теме…"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
            <button type="submit" className="adm-btn adm-btn--primary">Найти</button>
            {search && (
              <button type="button" className="adm-btn adm-btn--ghost" onClick={() => { setSearch(''); setSearchInput(''); setPage(1) }}>
                Сбросить
              </button>
            )}
          </form>
        </div>

        {loading ? (
          <div className="adm-loading">Загрузка…</div>
        ) : contacts.length === 0 ? (
          <div className="adm-empty">Заявок не найдено</div>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Дата</th>
                  <th>Имя</th>
                  <th>Email</th>
                  <th>Тема</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(c => (
                  <tr key={c.id} className="adm-row" onClick={() => setSelected(c)}>
                    <td className="adm-cell-id">{c.id}</td>
                    <td className="adm-cell-date">{fmt(c.created_at)}</td>
                    <td><strong>{c.name}</strong>{c.company && <div className="adm-company">{c.company}</div>}</td>
                    <td><a href={`mailto:${c.email}`} onClick={e => e.stopPropagation()}>{c.email}</a></td>
                    <td className="adm-cell-subject">{c.subject}</td>
                    <td><StatusBadge status={c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="adm-pagination">
            <button className="adm-btn adm-btn--ghost" onClick={() => setPage(p => p-1)} disabled={page <= 1}>← Назад</button>
            <span>Страница {page} / {pagination.pages}</span>
            <button className="adm-btn adm-btn--ghost" onClick={() => setPage(p => p+1)} disabled={page >= pagination.pages}>Вперёд →</button>
          </div>
        )}
      </main>

      {selected && (
        <ContactModal
          contact={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

// ─── Root component ───────────────────────────────────────────────────────────
export default function Admin() {
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (!token) { setChecking(false); return }
    apiFetch('/auth/me')
      .then(u => setUser(u))
      .catch(() => clearToken())
      .finally(() => setChecking(false))
  }, [])

  const logout = () => { clearToken(); setUser(null) }

  if (checking) return <div className="adm-splash">GBWC</div>
  if (!user)    return <LoginScreen onLogin={u => setUser(u)} />
  return <Dashboard user={user} onLogout={logout} />
}
