export default function ConfirmModal({ title = 'Подтверждение', message = 'Вы уверены?', onConfirm, onCancel }) {
  return (
    <div className="adm-modal-overlay" onClick={onCancel}>
      <div className="adm-modal adm-modal--sm" onClick={e => e.stopPropagation()}>
        <div className="adm-modal-header">
          <h2 className="adm-modal-title">{title}</h2>
          <button className="adm-modal-close" onClick={onCancel}>✕</button>
        </div>
        <div style={{ padding: '16px 24px' }}>
          <p style={{ color: 'var(--adm-text)', fontSize: '14px' }}>{message}</p>
        </div>
        <div className="adm-modal-actions">
          <button className="adm-btn adm-btn--ghost" onClick={onCancel}>Отмена</button>
          <button className="adm-btn adm-btn--danger" onClick={onConfirm}>Удалить</button>
        </div>
      </div>
    </div>
  )
}
