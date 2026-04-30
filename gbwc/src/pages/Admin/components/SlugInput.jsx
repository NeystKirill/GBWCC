import { useState } from 'react'

export default function SlugInput({ value, onChange, sourceText = '', label = 'Slug' }) {
  const [auto, setAuto] = useState(!value)

  const RU_MAP = {
    а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'yo',ж:'zh',з:'z',и:'i',
    й:'j',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',
    у:'u',ф:'f',х:'kh',ц:'ts',ч:'ch',ш:'sh',щ:'sch',ъ:'',ы:'y',
    ь:'',э:'e',ю:'yu',я:'ya'
  }

  const slugify = (text) => {
    return String(text).toLowerCase()
      .replace(/[а-яё]/g, ch => RU_MAP[ch] || ch)
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const generate = () => {
    if (sourceText) onChange(slugify(sourceText))
  }

  return (
    <div className="adm-slug-input">
      <label className="adm-field-label">{label}</label>
      <div className="adm-slug-row">
        <input
          className="adm-input"
          value={value || ''}
          onChange={e => { setAuto(false); onChange(e.target.value) }}
          placeholder="my-page-slug"
        />
        <button type="button" className="adm-btn adm-btn--ghost adm-btn--sm" onClick={generate}>
          Генерировать
        </button>
      </div>
    </div>
  )
}
