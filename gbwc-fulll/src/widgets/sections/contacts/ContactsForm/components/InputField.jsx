export default function InputField({ label, name, type = 'text', placeholder, value, onChange, required }) {
  return (
    <div className="ct3-field">
      <label className="ct3-label">{label}</label>
      <input className="ct3-input" name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} />
    </div>
  )
}
