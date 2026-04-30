import { useState } from 'react'

const LANGS = ['ru', 'en', 'kk']

export default function LangTabs({ value = {}, onChange, multiline = false, label = '', rows = 4 }) {
  const [lang, setLang] = useState('ru')

  return (
    <div className="adm-lang-tabs">
      {label && <label className="adm-field-label">{label}</label>}
      <div className="adm-lang-btns">
        {LANGS.map(l => (
          <button
            key={l}
            type="button"
            className={`adm-lang-btn ${lang === l ? 'active' : ''}`}
            onClick={() => setLang(l)}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
      {multiline ? (
        <textarea
          className="adm-input adm-textarea"
          rows={rows}
          value={value[lang] || ''}
          onChange={e => onChange({ ...value, [lang]: e.target.value })}
        />
      ) : (
        <input
          className="adm-input"
          value={value[lang] || ''}
          onChange={e => onChange({ ...value, [lang]: e.target.value })}
        />
      )}
      {value.ru && !value.en && !value.kk && (
        <span className="adm-lang-warn">⚠ EN и KK не заполнены</span>
      )}
    </div>
  )
}
