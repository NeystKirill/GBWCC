export default function Pagination({ pagination, page, onPageChange }) {
  if (!pagination || pagination.pages <= 1) return null

  return (
    <div className="adm-pagination">
      <button
        className="adm-btn adm-btn--ghost"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >← Назад</button>
      <span>Страница {page} / {pagination.pages} (всего: {pagination.total})</span>
      <button
        className="adm-btn adm-btn--ghost"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pagination.pages}
      >Вперёд →</button>
    </div>
  )
}
