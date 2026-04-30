import { useState, useEffect } from 'react'
import api from '../../../services/api'

export default function SettingsSection() {
  const [settings, setSettings] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const data = await api.settings.listRaw()
      setSettings(data)
    } catch (err) {
      setError('Ошибка загрузки настроек')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const handleChange = (key, value) => {
    setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s))
    setSuccess(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    setSuccess(false)
    try {
      // Convert list back to object for PATCH
      const payload = settings.reduce((acc, s) => {
        acc[s.key] = s.value
        return acc
      }, {})
      await api.settings.update(payload)
      setSuccess(true)
      // Apply style changes instantly to local document for preview
      const root = document.documentElement
      if (payload.font_size_body) root.style.setProperty('--text-body', payload.font_size_body)
      if (payload.font_size_h2)   root.style.setProperty('--text-h2',   payload.font_size_h2)
      if (payload.font_size_h3)   root.style.setProperty('--text-h3',   payload.font_size_h3)
      if (payload.site_title)     document.title = payload.site_title
    } catch (err) {
      setError('Ошибка при сохранении')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="adm-loading">Загрузка…</div>

  const groups = settings.reduce((acc, s) => {
    const g = s.group || 'general'
    if (!acc[g]) acc[g] = []
    acc[g].push(s)
    return acc
  }, {})

  return (
    <div className="adm-settings">
      <div className="adm-section-info">
        Здесь вы можете настроить глобальные параметры сайта, такие как размеры шрифтов и заголовок страницы.
      </div>

      {Object.entries(groups).map(([group, groupSettings]) => (
        <div key={group} className="adm-settings-group">
          <h3 className="adm-settings-group-title">
            {group === 'styles' ? '🎨 Стили' : group === 'general' ? '⚙️ Основные' : group}
          </h3>
          <div className="adm-form-body">
            {groupSettings.map(s => (
              <div key={s.key} className="adm-field">
                <label className="adm-field-label">{s.label || s.key}</label>
                {s.type === 'boolean' ? (
                  <label className="adm-toggle">
                    <input type="checkbox" checked={s.value} onChange={e => handleChange(s.key, e.target.checked)} />
                    <span>Включено</span>
                  </label>
                ) : s.key.includes('bio') || s.key.includes('desc') ? (
                  <textarea 
                    className="adm-input" 
                    value={s.value || ''} 
                    onChange={e => handleChange(s.key, e.target.value)}
                    rows={4}
                  />
                ) : (
                  <input 
                    className="adm-input" 
                    value={s.value || ''} 
                    onChange={e => handleChange(s.key, e.target.value)} 
                  />
                )}
                <div className="adm-field-hint" style={{fontSize:'12px',color:'#888',marginTop:'4px'}}>Ключ: <code>{s.key}</code></div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="adm-form-footer" style={{marginTop:'30px', borderTop:'1px solid #eee', paddingTop:'20px'}}>
        {error && <div className="adm-error" style={{marginBottom:'10px'}}>{error}</div>}
        {success && <div className="adm-success" style={{marginBottom:'10px', color:'#4bbc7a'}}>✅ Настройки сохранены и применены!</div>}
        <button 
          className="adm-btn adm-btn--primary" 
          onClick={handleSave} 
          disabled={saving}
        >
          {saving ? 'Сохранение…' : 'Сохранить все изменения'}
        </button>
      </div>

      <style>{`
        .adm-settings-group { margin-bottom: 40px; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #eee; }
        .adm-settings-group-title { margin-bottom: 20px; font-size: 18px; color: var(--navy); border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; }
      `}</style>
    </div>
  )
}
