import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import 'express-async-errors'
import path from 'path'
import { fileURLToPath } from 'url'
import { env } from './config/env.js'
import { puckHandler } from '@puckeditor/cloud-client'

import authRoutes from './routes/auth.routes.js'
import sessionsRoutes from './routes/sessions.routes.js'
import leadersRoutes from './routes/leaders.routes.js'
import initiativesRoutes from './routes/initiatives.routes.js'
import partnersRoutes from './routes/partners.routes.js'
import newsRoutes from './routes/news.routes.js'
import mediaRoutes from './routes/media.routes.js'
import pagesRoutes from './routes/pages.routes.js'
import uploadsRoutes from './routes/uploads.routes.js'
import contactRoutes from './routes/contact.routes.js'
import settingsRoutes from './routes/settings.routes.js'
import { errorHandler } from './middleware/errorHandler.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

// Security & parsing
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true,
}))
app.use(compression())
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Static uploads
app.use('/uploads', express.static(path.resolve(env.UPLOADS_DIR)))

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/sessions', sessionsRoutes)
app.use('/api/leaders', leadersRoutes)
app.use('/api/initiatives', initiativesRoutes)
app.use('/api/partners', partnersRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/media', mediaRoutes)
app.use('/api/pages', pagesRoutes)
app.use('/api/uploads', uploadsRoutes)
app.use('/api/upload', uploadsRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/settings', settingsRoutes)

// Puck AI Handler
app.all('/api/puck/*', async (req, res) => {
  try {
    const url = `http://${req.headers.host}${req.originalUrl}`;
    const fetchReq = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: req.method === 'GET' || req.method === 'HEAD' ? undefined : JSON.stringify(req.body)
    });

    const fetchRes = await puckHandler(fetchReq, {
      ai: {
        context: "We are Global Business Women's Club (GBWC). You create landing pages for women entrepreneurs, leaders, and our partners.",
      },
    });

    const data = await fetchRes.text();
    fetchRes.headers.forEach((val, key) => res.setHeader(key, val));
    res.status(fetchRes.status).send(data);
  } catch (error) {
    console.error('Puck AI Error:', error);
    res.status(500).json({ error: 'Failed to process AI request' });
  }
});

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true, ts: Date.now() }))

// Production: serve frontend
if (env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../../dist')
  app.use(express.static(distPath))
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.use(errorHandler)

export default app
