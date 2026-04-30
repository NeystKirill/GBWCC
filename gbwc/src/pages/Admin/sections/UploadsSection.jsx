import { useState, useEffect, useRef } from 'react'
import { useResource } from '../hooks/useResource'
import Pagination from '../components/Pagination'
import ConfirmModal from '../components/ConfirmModal'

export default function UploadsSection() {
  const { items, loading, pagination, list, remove } = useResource('/upload')
  const [page, setPage] = useState(1)
  const [folder, setFolder] = useState('')
  const [deleting, setDeleting] = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef()

  useEffect(() => { list({ page, limit: 24, ...(folder && { folder }) }) }, [page, folder, list])

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setUploading(true)
    try {
      const token = localStorage.getItem('gbwc_token')
      const form = new FormData()
      files.forEach(f => form.append('files', f))
      form.append('folder', folder || 'images')
      await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      })
      list({ page, limit: 24, ...(folder && { folder }) })
    } catch (err) {
      alert('Ошибка загрузки: ' + err.message)
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const handleDelete = async () => { await remove(deleting); setDeleting(null) }

  const copyUrl = (url) => {
    navigator.clipboard?.writeText(url).then(() => alert('URL скопирован'))
  }

  return (
    <>
      <div className="adm-section-header">
        <div className="adm-filter-tabs">
          {[{key:'',label:'Все'},{key:'images',label:'Изображения'},{key:'logos',label:'Логотипы'},{key:'covers',label:'Обложки'},{key:'photos',label:'Фото'}].map(t => (
            <button key={t.key} className={`adm-filter-tab ${folder === t.key ? 'active' : ''}`} onClick={() => { setFolder(t.key); setPage(1) }}>
              {t.label}
            </button>
          ))}
        </div>
        <div>
          <input ref={fileRef} type="file" multiple accept="image/*" hidden onChange={handleUpload} />
          <button className="adm-btn adm-btn--primary" onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? 'Загрузка…' : '+ Загрузить'}
          </button>
        </div>
      </div>

      {loading ? <div className="adm-loading">Загрузка…</div> : items.length === 0 ? <div className="adm-empty">Нет файлов</div> : (
        <div className="adm-media-grid">
          {items.map(f => (
            <div key={f.id} className="adm-media-card">
              <div className="adm-media-img">
                <img src={f.url} alt={f.original_name} />
              </div>
              <div className="adm-media-info">
                <span className="adm-file-name" title={f.original_name}>{f.original_name}</span>
                <div className="adm-media-btns">
                  <button className="adm-btn-icon" onClick={() => copyUrl(f.url)} title="Скопировать URL">📋</button>
                  <button className="adm-btn-icon adm-btn-icon--danger" onClick={() => setDeleting(f.id)}>🗑</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination pagination={pagination} page={page} onPageChange={setPage} />
      {deleting && <ConfirmModal title="Удаление файла" message="Удалить этот файл?" onConfirm={handleDelete} onCancel={() => setDeleting(null)} />}
    </>
  )
}
