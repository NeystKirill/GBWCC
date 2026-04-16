export default function MessageField({ label, name, placeholder, value, onChange, required }) {
  return (
    <div className="ct3-field">
      <label className="ct3-label">{label}</label>
      <textarea className="ct3-textarea" name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} rows={5} />
    </div>
  )
}
