import { useState } from 'react'
import DynamicList from '../../components/DynamicList'
import LangTabs from '../../components/LangTabs'

const DEFAULT_SLIDES = [
  { videoId: 'HvmRX-bCl5Y', title: 'Opening GBWC', tag: 'GBWC · Institutional Platform', lines: ['Global','Businesswomen','Council —','Институциональная','диалоговая платформа'] },
  { videoId: 'yLAvCrhiRwM', title: 'I Пленарное заседание', tag: 'Astana · 2023', lines: ['Инфраструктура','развития','women-led','бизнеса'] },
  { videoId: 'c8zthz-qD8Y', title: 'II Пленарное заседание', tag: 'Astana · 2024', lines: ['Интеграция','в глобальные','рынки'] },
]

export default function HomeHeroEditor({ content, onSave }) {
  const [slides, setSlides] = useState(content?.slides || DEFAULT_SLIDES)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const save = async () => {
    setSaving(true); setMsg('')
    try {
      await onSave({ slides })
      setMsg('✅ Сохранено')
    } catch { setMsg('❌ Ошибка сохранения') }
    finally { setSaving(false) }
  }

  return (
    <div className="adm-form">
      <div className="adm-form-body">
        <div className="adm-section-info" style={{ marginBottom: 20 }}>
          Настройте слайды видео-героя на главной странице. Каждый слайд — это YouTube-видео с текстовым оверлеем.
        </div>

        <DynamicList
          items={slides}
          onChange={setSlides}
          defaultItem={() => ({ videoId: '', title: '', tag: '', lines: [''] })}
          renderItem={(slide, onChange, idx) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--adm-gold)', marginBottom: 4 }}>
                Слайд {idx + 1}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div className="adm-field" style={{ margin: 0 }}>
                  <label className="adm-field-label">YouTube Video ID</label>
                  <input className="adm-input" value={slide.videoId} onChange={e => onChange({ ...slide, videoId: e.target.value })} placeholder="например: HvmRX-bCl5Y" />
                </div>
                <LangTabs 
                  label="Название слайда" 
                  value={slide.title || {}} 
                  onChange={v => onChange({ ...slide, title: v })} 
                />
              </div>
              <LangTabs 
                label="Тег (eyebrow)" 
                value={slide.tag || {}} 
                onChange={v => onChange({ ...slide, tag: v })} 
                placeholder="например: GBWC · Institutional Platform"
              />
              <div className="adm-field" style={{ margin: 0 }}>
                <label className="adm-field-label">Строки заголовка (по одной на строку в каждом языке)</label>
                <div className="adm-lang-tabs-container">
                  <LangTabs
                    value={(() => {
                      // Compact lines array into per-language newline-separated strings
                      const obj = { ru: '', en: '', kk: '' }
                      if (Array.isArray(slide.lines)) {
                        slide.lines.forEach(line => {
                          if (typeof line === 'string') {
                            obj.ru += (obj.ru ? '\n' : '') + line
                          } else if (line && typeof line === 'object') {
                            ['ru','en','kk'].forEach(l => {
                              if (line[l]) obj[l] += (obj[l] ? '\n' : '') + line[l]
                            })
                          }
                        })
                      }
                      return obj
                    })()}
                    onChange={v => {
                      // Split back into array of multilingual objects
                      const ru = v.ru.split('\n')
                      const en = v.en.split('\n')
                      const kk = v.kk.split('\n')
                      const max = Math.max(ru.length, en.length, kk.length)
                      const lines = []
                      for (let i = 0; i < max; i++) {
                        lines.push({ ru: ru[i] || '', en: en[i] || '', kk: kk[i] || '' })
                      }
                      onChange({ ...slide, lines })
                    }}
                    multiline
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}
        />
      </div>
      <div className="adm-form-footer">
        {msg && <span style={{ fontSize: 13 }}>{msg}</span>}
        <button className="adm-btn adm-btn--primary" onClick={save} disabled={saving}>
          {saving ? 'Сохранение…' : 'Сохранить'}
        </button>
      </div>
    </div>
  )
}
