import { useState, useEffect } from 'react'
import ConfirmModal from '../components/ConfirmModal'
import { auth } from '../../../services/api'

export default function UsersSection() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [form, setForm] = useState({ email: '', password: '', role: 'admin' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const data = await auth.listUsers()
      setUsers(Array.isArray(data) ? data : [])
    } catch {}
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    setError(''); setSaving(true)
    try {
      await auth.createUser(form)
      setCreating(false)
      setForm({ email: '', password: '', role: 'admin' })
      load()
    } catch (err) { setError(err.message) }
    finally { setSaving(false) }
  }

  const handleToggle = async (id, active) => {
    await auth.updateUser(id, { active: !active })
    load()
  }

  const handleDelete = async () => {
    await auth.deleteUser(deleting)
    setDeleting(null)
    load()
  }

  return (
    <>
      <div className="adm-section-header">
        <button className="adm-btn adm-btn--primary" onClick={() => setCreating(!creating)}>
          {creating ? 'Отмена' : '+ Новый пользователь'}
        </button>
      </div>

      {creating && (
        <form className="adm-form adm-form--inline" onSubmit={handleCreate}>
          <div className="adm-form-body" style={{ display:'flex', gap:12, flexWrap:'wrap', alignItems:'flex-end' }}>
            <div className="adm-field" style={{flex:1,minWidth:200}}>
              <label className="adm-field-label">Email</label>
              <input className="adm-input" type="email" value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} required />
            </div>
            <div className="adm-field" style={{flex:1,minWidth:200}}>
              <label className="adm-field-label">Пароль</label>
              <input className="adm-input" type="password" value={form.password} onChange={e => setForm(f=>({...f,password:e.target.value}))} required minLength={6} />
            </div>
            <div className="adm-field" style={{width:150}}>
              <label className="adm-field-label">Роль</label>
              <select className="adm-input adm-select" value={form.role} onChange={e => setForm(f=>({...f,role:e.target.value}))}>
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </div>
            <button className="adm-btn adm-btn--primary" type="submit" disabled={saving}>{saving ? 'Создание…' : 'Создать'}</button>
          </div>
          {error && <p className="adm-error" style={{padding:'0 16px 16px'}}>{error}</p>}
        </form>
      )}

      {loading ? <div className="adm-loading">Загрузка…</div> : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>#</th><th>Email</th><th>Роль</th><th>Статус</th><th>Создан</th><th>Действия</th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="adm-row">
                  <td className="adm-cell-id">{u.id}</td>
                  <td><strong>{u.email}</strong></td>
                  <td><span className="adm-badge">{u.role}</span></td>
                  <td>
                    {u.active
                      ? <span className="adm-badge" style={{background:'#4bbc7a22',color:'#4bbc7a'}}>Активен</span>
                      : <span className="adm-badge" style={{background:'#e85c5c22',color:'#e85c5c'}}>Заблокирован</span>}
                  </td>
                  <td className="adm-cell-date">{new Date(u.created_at).toLocaleDateString('ru-RU')}</td>
                  <td className="adm-cell-actions">
                    <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => handleToggle(u.id, u.active)}>
                      {u.active ? '🔒' : '🔓'}
                    </button>
                    <button className="adm-btn adm-btn--danger adm-btn--sm" onClick={() => setDeleting(u.id)}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {deleting && <ConfirmModal title="Удаление пользователя" message="Удалить этого пользователя?" onConfirm={handleDelete} onCancel={() => setDeleting(null)} />}
    </>
  )
}
