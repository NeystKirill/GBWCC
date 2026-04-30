import { useState } from 'react'
import LangTabs from '../../components/LangTabs'
import DynamicList from '../../components/DynamicList'
import ImageUpload from '../../components/ImageUpload'

const TABS = ['Hero', 'Мандат', 'Направления', 'Хронология', 'Принципы', 'Основатель', 'Секретариат', 'Миссия', 'CTA']

export default function AboutPageEditor({ content, onSave }) {
  const [tab, setTab] = useState(0)
  const [form, setForm] = useState(content || {
    heroEye: {}, heroTitle: {}, heroDesc: {}, stats: [],
    mandateEye: {}, mandateTitle: {}, mandateParas: {}, asideCards: [],
    dirEye: {}, dirTitle: {}, dirs: [],
    timelineEye: {}, timelineTitle: {}, timeline: [],
    princEye: {}, princTitle: {}, princs: [],
    founderEye: {}, founderPhoto: '', founderTitle: {}, founderRole: {}, founderBio: {}, founderPoints: {},
    secretEye: {}, secretTitle: {}, team: [],
    mvvEye: {}, mission: {}, vision: {}, values: [],
    ctaText: {}, ctaInit: {}, ctaPart: {},
  })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const save = async () => {
    setSaving(true); setMsg('')
    try { await onSave(form); setMsg('✅ Сохранено') }
    catch { setMsg('❌ Ошибка') }
    finally { setSaving(false) }
  }

  return (
    <div className="adm-form">
      <div className="adm-form-tabs">
        {TABS.map((t, i) => (
          <button key={t} className={`adm-form-tab ${tab === i ? 'active' : ''}`} onClick={() => setTab(i)}>{t}</button>
        ))}
      </div>

      <div className="adm-form-body">
        {tab === 0 && (<>
          <LangTabs label="Eyebrow" value={form.heroEye || {}} onChange={v => set('heroEye', v)} />
          <LangTabs label="Заголовок" value={form.heroTitle || {}} onChange={v => set('heroTitle', v)} />
          <LangTabs label="Описание" value={form.heroDesc || {}} onChange={v => set('heroDesc', v)} multiline rows={3} />
          <h3 style={{ margin: '20px 0 10px', fontSize: 15, color: 'var(--adm-navy)' }}>Статистики Hero</h3>
          <DynamicList
            items={form.stats || []}
            onChange={v => set('stats', v)}
            defaultItem={() => ({ n: '', l: {} })}
            renderItem={(item, onChange) => (
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div className="adm-field" style={{ margin: 0, width: 80 }}>
                  <label className="adm-field-label">Число</label>
                  <input className="adm-input" value={item.n || ''} onChange={e => onChange({ ...item, n: e.target.value })} />
                </div>
                <div style={{ flex: 1 }}>
                  <LangTabs label="Подпись" value={item.l || {}} onChange={v => onChange({ ...item, l: v })} />
                </div>
              </div>
            )}
          />
        </>)}

        {tab === 1 && (<>
          <LangTabs label="Eyebrow" value={form.mandateEye || {}} onChange={v => set('mandateEye', v)} />
          <LangTabs label="Заголовок" value={form.mandateTitle || {}} onChange={v => set('mandateTitle', v)} />
          <div className="adm-field">
            <label className="adm-field-label">Абзацы (один на строку)</label>
            <div className="adm-lang-grid">
              {['ru', 'en', 'kk'].map(l => (
                <div key={l} className="adm-lang-col">
                  <span className="adm-lang-tag">{l.toUpperCase()}</span>
                  <textarea
                    className="adm-input adm-textarea"
                    rows={8}
                    value={Array.isArray(form.mandateParas?.[l]) ? form.mandateParas[l].join('\n\n') : (form.mandateParas?.[l] || '')}
                    onChange={e => {
                      const paras = e.target.value.split('\n\n').filter(Boolean)
                      set('mandateParas', { ...form.mandateParas, [l]: paras })
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <h3 style={{ margin: '20px 0 10px', fontSize: 15, color: 'var(--adm-navy)' }}>Карточки справа</h3>
          <DynamicList
            items={form.asideCards || []}
            onChange={v => set('asideCards', v)}
            defaultItem={() => ({ label: '', num: '', sub: '' })}
            renderItem={(item, onChange) => (
              <div style={{ display: 'flex', gap: 10 }}>
                <input className="adm-input" placeholder="Лейбл" value={item.label || ''} onChange={e => onChange({ ...item, label: e.target.value })} />
                <input className="adm-input adm-input--sm" placeholder="Число" value={item.num || ''} onChange={e => onChange({ ...item, num: e.target.value })} />
                <input className="adm-input" placeholder="Подпись" value={item.sub || ''} onChange={e => onChange({ ...item, sub: e.target.value })} />
              </div>
            )}
          />
        </>)}

        {tab === 2 && (<>
          <LangTabs label="Eyebrow" value={form.dirEye || {}} onChange={v => set('dirEye', v)} />
          <LangTabs label="Заголовок" value={form.dirTitle || {}} onChange={v => set('dirTitle', v)} />
          <h3 style={{ margin: '20px 0 10px', fontSize: 15, color: 'var(--adm-navy)' }}>Направления</h3>
          <DynamicList
            items={form.dirs || []}
            onChange={v => set('dirs', v)}
            defaultItem={() => ({ n: '', title: {}, desc: {} })}
            renderItem={(item, onChange, idx) => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input className="adm-input adm-input--sm" placeholder="Номер (01)" value={item.n || ''} onChange={e => onChange({ ...item, n: e.target.value })} />
                <LangTabs label="Название" value={item.title || {}} onChange={v => onChange({ ...item, title: v })} />
                <LangTabs label="Описание" value={item.desc || {}} onChange={v => onChange({ ...item, desc: v })} multiline rows={2} />
              </div>
            )}
          />
        </>)}

        {tab === 3 && (<>
          <LangTabs label="Eyebrow" value={form.timelineEye || {}} onChange={v => set('timelineEye', v)} />
          <LangTabs label="Заголовок" value={form.timelineTitle || {}} onChange={v => set('timelineTitle', v)} />
          <h3 style={{ margin: '20px 0 10px', fontSize: 15, color: 'var(--adm-navy)' }}>Хронология</h3>
          <DynamicList
            items={form.timeline || []}
            onChange={v => set('timeline', v)}
            defaultItem={() => ({ year: '', title: {}, desc: {} })}
            renderItem={(item, onChange) => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input className="adm-input adm-input--sm" placeholder="Год" value={item.year || ''} onChange={e => onChange({ ...item, year: e.target.value })} />
                <LangTabs label="Заголовок" value={item.title || {}} onChange={v => onChange({ ...item, title: v })} />
                <LangTabs label="Описание" value={item.desc || {}} onChange={v => onChange({ ...item, desc: v })} multiline rows={3} />
              </div>
            )}
          />
        </>)}

        {tab === 4 && (<>
          <LangTabs label="Eyebrow" value={form.princEye || {}} onChange={v => set('princEye', v)} />
          <LangTabs label="Заголовок" value={form.princTitle || {}} onChange={v => set('princTitle', v)} />
          <h3 style={{ margin: '20px 0 10px', fontSize: 15, color: 'var(--adm-navy)' }}>Принципы</h3>
          <DynamicList
            items={form.princs || []}
            onChange={v => set('princs', v)}
            defaultItem={() => ({ n: '', title: {}, desc: {} })}
            renderItem={(item, onChange) => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input className="adm-input adm-input--sm" placeholder="Номер" value={item.n || ''} onChange={e => onChange({ ...item, n: e.target.value })} />
                <LangTabs label="Название" value={item.title || {}} onChange={v => onChange({ ...item, title: v })} />
                <LangTabs label="Описание" value={item.desc || {}} onChange={v => onChange({ ...item, desc: v })} multiline rows={2} />
              </div>
            )}
          />
        </>)}

        {tab === 5 && (<>
          <LangTabs label="Eyebrow" value={form.founderEye || {}} onChange={v => set('founderEye', v)} />
          <ImageUpload label="Фото основателя" value={form.founderPhoto} onChange={v => set('founderPhoto', v)} />
          <LangTabs label="Имя" value={form.founderTitle || {}} onChange={v => set('founderTitle', v)} />
          <LangTabs label="Должность" value={form.founderRole || {}} onChange={v => set('founderRole', v)} />
          <div className="adm-field">
            <label className="adm-field-label">Биография (абзацы, разделённые пустой строкой)</label>
            <div className="adm-lang-grid">
              {['ru', 'en', 'kk'].map(l => (
                <div key={l} className="adm-lang-col">
                  <span className="adm-lang-tag">{l.toUpperCase()}</span>
                  <textarea
                    className="adm-input adm-textarea"
                    rows={8}
                    value={Array.isArray(form.founderBio?.[l]) ? form.founderBio[l].join('\n\n') : (form.founderBio?.[l] || '')}
                    onChange={e => {
                      const paras = e.target.value.split('\n\n').filter(Boolean)
                      set('founderBio', { ...form.founderBio, [l]: paras })
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="adm-field">
            <label className="adm-field-label">Ключевые достижения (по одному на строку)</label>
            <div className="adm-lang-grid">
              {['ru', 'en', 'kk'].map(l => (
                <div key={l} className="adm-lang-col">
                  <span className="adm-lang-tag">{l.toUpperCase()}</span>
                  <textarea
                    className="adm-input adm-textarea"
                    rows={5}
                    value={Array.isArray(form.founderPoints?.[l]) ? form.founderPoints[l].join('\n') : (form.founderPoints?.[l] || '')}
                    onChange={e => {
                      const lines = e.target.value.split('\n').filter(Boolean)
                      set('founderPoints', { ...form.founderPoints, [l]: lines })
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </>)}

        {tab === 6 && (<>
          <LangTabs label="Eyebrow" value={form.secretEye || {}} onChange={v => set('secretEye', v)} />
          <LangTabs label="Заголовок" value={form.secretTitle || {}} onChange={v => set('secretTitle', v)} />
          <h3 style={{ margin: '20px 0 10px', fontSize: 15, color: 'var(--adm-navy)' }}>Команда</h3>
          <DynamicList
            items={form.team || []}
            onChange={v => set('team', v)}
            defaultItem={() => ({ name: '', role: '', email: '', points: [] })}
            renderItem={(item, onChange) => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input className="adm-input" placeholder="Имя" value={item.name || ''} onChange={e => onChange({ ...item, name: e.target.value })} />
                <input className="adm-input" placeholder="Должность" value={item.role || ''} onChange={e => onChange({ ...item, role: e.target.value })} />
                <input className="adm-input" placeholder="Email" value={item.email || ''} onChange={e => onChange({ ...item, email: e.target.value })} />
                <div className="adm-field" style={{ margin: 0 }}>
                  <label className="adm-field-label">Обязанности (по одной на строку)</label>
                  <textarea
                    className="adm-input adm-textarea"
                    rows={3}
                    value={(item.points || []).join('\n')}
                    onChange={e => onChange({ ...item, points: e.target.value.split('\n').filter(Boolean) })}
                  />
                </div>
              </div>
            )}
          />
        </>)}

        {tab === 7 && (<>
          <LangTabs label="Eyebrow" value={form.mvvEye || {}} onChange={v => set('mvvEye', v)} />
          <LangTabs label="Миссия" value={form.mission || {}} onChange={v => set('mission', v)} multiline rows={4} />
          <LangTabs label="Видение" value={form.vision || {}} onChange={v => set('vision', v)} multiline rows={4} />
          <h3 style={{ margin: '20px 0 10px', fontSize: 15, color: 'var(--adm-navy)' }}>Ценности</h3>
          <DynamicList
            items={form.values || []}
            onChange={v => set('values', v)}
            defaultItem={() => ({ title: {}, desc: {} })}
            renderItem={(item, onChange) => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <LangTabs label="Название" value={item.title || {}} onChange={v => onChange({ ...item, title: v })} />
                <LangTabs label="Описание" value={item.desc || {}} onChange={v => onChange({ ...item, desc: v })} multiline rows={2} />
              </div>
            )}
          />
        </>)}

        {tab === 8 && (<>
          <LangTabs label="Текст CTA" value={form.ctaText || {}} onChange={v => set('ctaText', v)} multiline rows={3} />
          <LangTabs label="Кнопка 'Инициативы'" value={form.ctaInit || {}} onChange={v => set('ctaInit', v)} />
          <LangTabs label="Кнопка 'Партнёры'" value={form.ctaPart || {}} onChange={v => set('ctaPart', v)} />
        </>)}
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
