import { useState, useRef } from 'react'
import { upload } from '../../../services/api'

export default function ImageUpload({ value, onChange, label = 'Изображение', folder = 'images' }) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef()

  const handleFile = async (file) => {
    if (!file) return
    setUploading(true)
    setProgress(0)
    try {
      const result = await upload.file(file, folder)
      onChange(result.url)
      setProgress(100)
    } catch (err) {
      alert('Upload error: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  return (
    <div className="adm-image-upload">
      {label && <label className="adm-field-label">{label}</label>}
      <div
        className={`adm-drop-zone ${dragOver ? 'drag-over' : ''} ${value ? 'has-image' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
      >
        {value ? (
          <div className="adm-drop-preview">
            <img src={value} alt="Preview" />
            <button
              type="button"
              className="adm-drop-clear"
              onClick={e => { e.stopPropagation(); onChange(null) }}
            >✕</button>
          </div>
        ) : uploading ? (
          <div className="adm-drop-progress">
            <div className="adm-progress-bar" style={{ width: `${progress}%` }} />
            <span>Загрузка...</span>
          </div>
        ) : (
          <div className="adm-drop-placeholder">
            <span>📷</span>
            <span>Перетащите или нажмите</span>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={e => handleFile(e.target.files[0])}
      />
    </div>
  )
}
