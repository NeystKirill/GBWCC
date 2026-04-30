export function errorHandler(err, req, res, _next) {
  console.error('Error:', err.message, err.stack)

  if (err.name === 'MulterError') {
    return res.status(400).json({ error: err.message, code: 'UPLOAD_ERROR' })
  }

  if (err.message === 'Invalid file type') {
    return res.status(400).json({ error: 'Invalid file type. Allowed: JPEG, PNG, WebP, SVG, GIF', code: 'INVALID_FILE_TYPE' })
  }

  const status = err.status || err.statusCode || 500
  res.status(status).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}
