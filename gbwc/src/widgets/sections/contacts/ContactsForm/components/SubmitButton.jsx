export default function SubmitButton({ label, loading }) {
  return (
    <button type="submit" className="ct3-submit" disabled={loading}>{label}</button>
  )
}
