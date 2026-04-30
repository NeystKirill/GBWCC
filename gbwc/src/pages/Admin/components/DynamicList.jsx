export default function DynamicList({ items = [], onChange, renderItem, defaultItem = '', label = '' }) {
  const add = () => onChange([...items, typeof defaultItem === 'function' ? defaultItem() : defaultItem])
  const remove = (index) => onChange(items.filter((_, i) => i !== index))
  const update = (index, value) => onChange(items.map((item, i) => i === index ? value : item))
  const moveUp = (index) => {
    if (index === 0) return
    const arr = [...items]
    ;[arr[index - 1], arr[index]] = [arr[index], arr[index - 1]]
    onChange(arr)
  }
  const moveDown = (index) => {
    if (index >= items.length - 1) return
    const arr = [...items]
    ;[arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]
    onChange(arr)
  }

  return (
    <div className="adm-dynamic-list">
      {label && <label className="adm-field-label">{label}</label>}
      {items.map((item, i) => (
        <div key={i} className="adm-dynamic-item">
          <div className="adm-dynamic-content">
            {renderItem(item, (val) => update(i, val), i)}
          </div>
          <div className="adm-dynamic-actions">
            <button type="button" className="adm-btn-icon" onClick={() => moveUp(i)} disabled={i === 0}>↑</button>
            <button type="button" className="adm-btn-icon" onClick={() => moveDown(i)} disabled={i >= items.length - 1}>↓</button>
            <button type="button" className="adm-btn-icon adm-btn-icon--danger" onClick={() => remove(i)}>✕</button>
          </div>
        </div>
      ))}
      <button type="button" className="adm-btn adm-btn--ghost adm-btn--sm" onClick={add}>
        + Добавить
      </button>
    </div>
  )
}
