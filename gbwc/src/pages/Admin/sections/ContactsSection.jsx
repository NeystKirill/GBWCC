import { useState, useEffect, useCallback } from 'react'
import { useResource } from '../hooks/useResource'
import StatusBadge from '../components/StatusBadge'
import Pagination from '../components/Pagination'
import ConfirmModal from '../components/ConfirmModal'

const STATUSES = [
  { key: 'all', label: 'Все' },
  { key: 'new', label: 'Новые' },
  { key: 'read', label: 'Прочитанные' },
  { key: 'archived', label: 'В архиве' },
]

export default function ContactsSection() {
  const { items, loading, pagination, list } = useResource('/contact')
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [stats, setStats] = useState({})

  const load = useCallback(async () => {
    const params = { page, limit: 20 }
    if (filter !== 'all') params.status = filter
    if (search) params.search = search
    const data = await list(params)
    if (data?.stats) setStats(data.stats)
  }, [page, filter, search, list])

  useEffect(() => { load() }, [load])

  const changeStatus = async (id, status) => {
    const token = localStorage.getItem('gbwc_token')
    const res = await fetch(`/api/contact/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    })
    if (res.ok) {
      const updated = await res.json()
      if (selected?.id === id) setSelected(updated)
      load()
    }
  }

  const doDelete = async () => {
    if (!deleting) return
    const token = localStorage.getItem('gbwc_token')
    await fetch(`/api/contact/${deleting}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    setDeleting(null)
    setSelected(null)
    load()
  }

  const doSearch = (e) => {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  const fmt = s => new Date(s).toLocaleString('ru-RU', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' })

  return (
    <>
      <div className="adm-section-header">
        <div className="adm-filter-tabs">
          {STATUSES.map(s => (
            <button
              key={s.key}
              className={`adm-filter-tab ${filter === s.key ? 'active' : ''}`}
              onClick={() => { setFilter(s.key); setPage(1) }}
            >
              {s.label}
              {s.key !== 'all' && stats[s.key] > 0 && (
                <span className="adm-filter-count">{stats[s.key]}</span>
              )}
            </button>
          ))}
        </div>
        <form className="adm-search" onSubmit={doSearch}>
          <input
            placeholder="Поиск по имени, email..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <button type="submit" className="adm-btn adm-btn--primary adm-btn--sm">Найти</button>
          {search && (
            <button type="button" className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => { setSearch(''); setSearchInput(''); setPage(1) }}>
              Сбросить
            </button>
          )}
        </form>
      </div>

      {loading ? (
        <div className="adm-loading">Загрузка…</div>
      ) : items.length === 0 ? (
        <div className="adm-empty">Заявок не найдено</div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>#</th><th>Дата</th><th>Имя</th><th>Email</th><th>Тема</th><th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {items.map(c => (
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

      <Pagination pagination={pagination} page={page} onPageChange={setPage} />

      {selected && (
        <div className="adm-modal-overlay" onClick={() => setSelected(null)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <div className="adm-modal-header">
              <div>
                <h2 className="adm-modal-title">{selected.subject || 'Без темы'}</h2>
                <span className="adm-modal-date">{fmt(selected.created_at)}</span>
              </div>
              <button className="adm-modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="adm-modal-meta">
              <div className="adm-meta-row"><span>Имя</span><strong>{selected.name}</strong></div>
              <div className="adm-meta-row"><span>Email</span><a href={`mailto:${selected.email}`}>{selected.email}</a></div>
              {selected.company && <div className="adm-meta-row"><span>Компания</span><strong>{selected.company}</strong></div>}
              <div className="adm-meta-row"><span>Статус</span><StatusBadge status={selected.status} /></div>
            </div>
            <div className="adm-modal-message">
              <div className="adm-modal-message-label">Сообщение</div>
              <div className="adm-modal-message-body">{selected.message}</div>
            </div>
            <div className="adm-modal-actions">
              <div className="adm-status-btns">
                {['new','read','archived'].map(s => (
                  <button
                    key={s}
                    className={`adm-btn adm-btn--status ${selected.status === s ? 'active' : ''}`}
                    onClick={() => changeStatus(selected.id, s)}
                    disabled={selected.status === s}
                  >{STATUSES.find(st => st.key === s)?.label || s}</button>
                ))}
              </div>
              <button className="adm-btn adm-btn--danger" onClick={() => setDeleting(selected.id)}>Удалить</button>
            </div>
          </div>
        </div>
      )}

      {deleting && (
        <ConfirmModal
          title="Удаление заявки"
          message="Вы уверены, что хотите удалить эту заявку?"
          onConfirm={doDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </>
  )
}
