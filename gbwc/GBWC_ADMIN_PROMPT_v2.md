# GBWC — Промпт для реализации полноценного Backend + Admin Panel
# (Чистый Node.js, без Vercel)

---

## Контекст проекта

Проект `gbwc` — сайт **Global Businesswomen Council** (gbwc.network).

**Текущее состояние:**
- Frontend: React 18 + Vite (src/)
- Данные: хардкод в `src/shared/constants/homeData.jsx` и `src/entities/`
- Уже есть базовая страница Admin (`src/pages/Admin/Admin.jsx`) — показывает только заявки с контактной формы
- Есть API-клиенты в `src/services/api/` (eventsApi, leadersApi, initiativesApi, partnersApi, mediaApi, contactApi) — но пока ведут в никуда

**Что нужно сделать:**
1. Написать полный backend на Node.js (Express) — отдельная папка `server/`
2. Расширить Admin Panel до полноценной CMS
3. Подключить фронт к бекенду (заменить хардкод на API-запросы)
4. Удалить все файлы и зависимости, связанные с Vercel: `vercel.json`, `@vercel/analytics`, `@vercel/blob`, папку `api/` (Vercel Serverless Functions)
5. Настроить проект для хостинга на обычном VPS (Ubuntu) с PM2 + Nginx

---

## Структура проекта после рефакторинга

```
gbwc/
├── client/                   ← переименовать текущий корень (или оставить как есть)
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                   ← новая папка бекенда
│   ├── src/
│   │   ├── app.js            ← Express app (без listen)
│   │   ├── server.js         ← точка входа (listen)
│   │   ├── config/
│   │   │   ├── db.js         ← подключение к PostgreSQL (pg pool)
│   │   │   ├── env.js        ← валидация ENV через dotenv
│   │   │   └── cors.js       ← CORS настройки
│   │   ├── middleware/
│   │   │   ├── auth.js       ← JWT verify middleware
│   │   │   ├── requireAdmin.js ← проверка роли admin
│   │   │   ├── rateLimit.js  ← express-rate-limit
│   │   │   ├── upload.js     ← multer конфигурация
│   │   │   └── errorHandler.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── sessions.routes.js
│   │   │   ├── leaders.routes.js
│   │   │   ├── initiatives.routes.js
│   │   │   ├── partners.routes.js
│   │   │   ├── news.routes.js
│   │   │   ├── media.routes.js
│   │   │   ├── pages.routes.js
│   │   │   ├── uploads.routes.js
│   │   │   └── contact.routes.js
│   │   ├── controllers/      ← логика каждого роута
│   │   ├── services/         ← бизнес-логика (работа с БД)
│   │   └── migrations/
│   │       └── migrate.js    ← запуск всех миграций
│   ├── uploads/              ← папка для загруженных файлов
│   ├── package.json
│   └── .env
│
├── nginx/
│   └── gbwc.conf             ← конфиг Nginx
├── ecosystem.config.js       ← конфиг PM2
└── README.md                 ← инструкция по деплою
```

---

## ШАГ 0 — Удалить всё Vercel

Удалить следующие файлы и папки:
```
vercel.json
api/                    ← вся папка с Serverless Functions
lib/                    ← вся папка (migrate.js, db.js, auth.js, cors.js)
```

Из `package.json` удалить зависимости:
```
@vercel/analytics
@vercel/blob
```

Из `vite.config.js` убрать proxy на Vercel, добавить proxy на локальный Express:
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      }
    }
  }
})
```

---

## ШАГ 1 — Backend: Node.js Express

### Зависимости `server/package.json`

```json
{
  "name": "gbwc-server",
  "type": "module",
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "migrate": "node src/migrations/migrate.js"
  },
  "dependencies": {
    "express": "^4.19.2",
    "pg": "^8.13.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "sharp": "^0.33.5",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express-rate-limit": "^7.4.1",
    "helmet": "^7.2.0",
    "morgan": "^1.10.0",
    "cookie-parser": "^1.4.7",
    "express-async-errors": "^3.1.1",
    "uuid": "^10.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.7"
  }
}
```

### `server/src/config/db.js`

```javascript
import pg from 'pg'
import { env } from './env.js'

const { Pool } = pg

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 20,               // максимум соединений в пуле
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// Хелпер для удобных запросов
export const db = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
}
```

Использовать `pg` (node-postgres) с пулом соединений — НЕ Neon serverless driver.  
БД: **PostgreSQL** (можно локальный или Neon — connection string одинаковый).

### `server/src/config/env.js`

```javascript
import 'dotenv/config'

function required(name) {
  const val = process.env[name]
  if (!val) throw new Error(`ENV variable ${name} is required`)
  return val
}

export const env = {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: required('DATABASE_URL'),
  JWT_ACCESS_SECRET: required('JWT_ACCESS_SECRET'),
  JWT_REFRESH_SECRET: required('JWT_REFRESH_SECRET'),
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@gbwc.network',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  UPLOADS_DIR: process.env.UPLOADS_DIR || './uploads',
  BASE_URL: process.env.BASE_URL || 'http://localhost:4000',
}
```

### `server/src/app.js`

```javascript
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import 'express-async-errors'
import path from 'path'
import { fileURLToPath } from 'url'
import { env } from './config/env.js'

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
import { errorHandler } from './middleware/errorHandler.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

// Security
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true,
}))
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Статические файлы (загруженные медиа)
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')))

// API роуты
app.use('/api/auth', authRoutes)
app.use('/api/sessions', sessionsRoutes)
app.use('/api/leaders', leadersRoutes)
app.use('/api/initiatives', initiativesRoutes)
app.use('/api/partners', partnersRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/media', mediaRoutes)
app.use('/api/pages', pagesRoutes)
app.use('/api/uploads', uploadsRoutes)
app.use('/api/contact', contactRoutes)

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true, ts: Date.now() }))

// В production — отдавать фронт
if (env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../../../client/dist')
  app.use(express.static(distPath))
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.use(errorHandler)

export default app
```

---

## ШАГ 2 — База данных: Схема миграций

Файл `server/src/migrations/migrate.js` — запускается один раз командой `npm run migrate`.

### Таблицы

```sql
-- Пользователи (уже должна быть, дополнить)
CREATE TABLE IF NOT EXISTS users (
  id           SERIAL PRIMARY KEY,
  email        TEXT UNIQUE NOT NULL,
  password     TEXT NOT NULL,
  role         TEXT NOT NULL DEFAULT 'admin',  -- admin | superadmin
  active       BOOLEAN NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Попытки входа (брутфорс защита)
CREATE TABLE IF NOT EXISTS login_attempts (
  ip           TEXT PRIMARY KEY,
  attempts     INT NOT NULL DEFAULT 0,
  locked_until TIMESTAMPTZ,
  last_attempt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Сессии refresh токенов
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id           SERIAL PRIMARY KEY,
  user_id      INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash   TEXT NOT NULL UNIQUE,
  expires_at   TIMESTAMPTZ NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Пленарные заседания / Events
CREATE TABLE IF NOT EXISTS sessions (
  id           SERIAL PRIMARY KEY,
  slug         TEXT UNIQUE NOT NULL,
  title        JSONB NOT NULL DEFAULT '{}',    -- {ru, en, kk}
  subtitle     JSONB DEFAULT '{}',
  date         DATE,
  location     JSONB DEFAULT '{}',             -- {ru, en, kk}
  description  JSONB DEFAULT '{}',
  topics       JSONB DEFAULT '[]',             -- [{title:{ru,en,kk}, items:[...]}]
  links        JSONB DEFAULT '[]',             -- [{label:{ru,en,kk}, url, type}]
  gallery      JSONB DEFAULT '[]',             -- [{url, caption:{ru,en,kk}}]
  participants JSONB DEFAULT '[]',             -- [{name, role:{ru,en,kk}, org, photo}]
  stats        JSONB DEFAULT '[]',             -- [{num, label:{ru,en,kk}}]
  cover        TEXT,
  published    BOOLEAN NOT NULL DEFAULT true,
  sort_order   INT NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Лидеры / Founders
CREATE TABLE IF NOT EXISTS leaders (
  id           SERIAL PRIMARY KEY,
  slug         TEXT UNIQUE NOT NULL,
  name         JSONB NOT NULL DEFAULT '{}',
  role         JSONB DEFAULT '{}',
  bio          JSONB DEFAULT '{}',
  quote        JSONB DEFAULT '{}',
  photo        TEXT,
  social       JSONB DEFAULT '{}',             -- {linkedin, instagram, telegram}
  published    BOOLEAN NOT NULL DEFAULT true,
  sort_order   INT NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Инициативы
CREATE TABLE IF NOT EXISTS initiatives (
  id           SERIAL PRIMARY KEY,
  slug         TEXT UNIQUE NOT NULL,
  title        JSONB NOT NULL DEFAULT '{}',
  subtitle     JSONB DEFAULT '{}',
  description  JSONB DEFAULT '{}',
  goals        JSONB DEFAULT '[]',
  results      JSONB DEFAULT '[]',
  cover        TEXT,
  gallery      JSONB DEFAULT '[]',
  published    BOOLEAN NOT NULL DEFAULT true,
  sort_order   INT NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Партнёры
CREATE TABLE IF NOT EXISTS partners (
  id           SERIAL PRIMARY KEY,
  slug         TEXT UNIQUE NOT NULL,
  name         TEXT NOT NULL,
  type         TEXT NOT NULL DEFAULT 'partner',  -- partner | supporter | media
  logo_url     TEXT,
  url          TEXT,
  published    BOOLEAN NOT NULL DEFAULT true,
  sort_order   INT NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Новости / Пресса
CREATE TABLE IF NOT EXISTS news (
  id           SERIAL PRIMARY KEY,
  slug         TEXT UNIQUE NOT NULL,
  title        JSONB NOT NULL DEFAULT '{}',
  excerpt      JSONB DEFAULT '{}',
  body         JSONB DEFAULT '{}',
  cover        TEXT,
  source       TEXT,
  source_url   TEXT,
  published_at TIMESTAMPTZ,
  published    BOOLEAN NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Медиа (фото/видео)
CREATE TABLE IF NOT EXISTS media (
  id           SERIAL PRIMARY KEY,
  type         TEXT NOT NULL DEFAULT 'photo',   -- photo | video
  url          TEXT NOT NULL,
  thumb        TEXT,
  caption      JSONB DEFAULT '{}',
  session_id   INT REFERENCES sessions(id) ON DELETE SET NULL,
  published    BOOLEAN NOT NULL DEFAULT true,
  sort_order   INT NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Страницы — CMS для статического контента
CREATE TABLE IF NOT EXISTS pages (
  id           SERIAL PRIMARY KEY,
  key          TEXT UNIQUE NOT NULL,            -- 'home.about', 'home.stats' и т.д.
  content      JSONB NOT NULL DEFAULT '{}',
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Заявки с контактной формы
CREATE TABLE IF NOT EXISTS contact_submissions (
  id           SERIAL PRIMARY KEY,
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  company      TEXT,
  message      TEXT,
  status       TEXT NOT NULL DEFAULT 'new',    -- new | read | archived
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Загруженные файлы
CREATE TABLE IF NOT EXISTS uploads (
  id           SERIAL PRIMARY KEY,
  filename     TEXT NOT NULL,                   -- имя на диске
  original_name TEXT NOT NULL,
  mime_type    TEXT,
  size         INT,
  url          TEXT NOT NULL,                   -- /uploads/images/xxx.jpg
  folder       TEXT NOT NULL DEFAULT 'images',
  uploaded_by  INT REFERENCES users(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Индексы

```sql
CREATE INDEX IF NOT EXISTS sessions_slug_idx ON sessions (slug);
CREATE INDEX IF NOT EXISTS sessions_published_idx ON sessions (published, sort_order);
CREATE INDEX IF NOT EXISTS leaders_slug_idx ON leaders (slug);
CREATE INDEX IF NOT EXISTS leaders_sort_idx ON leaders (published, sort_order);
CREATE INDEX IF NOT EXISTS initiatives_slug_idx ON initiatives (slug);
CREATE INDEX IF NOT EXISTS partners_type_idx ON partners (type, sort_order);
CREATE INDEX IF NOT EXISTS news_published_idx ON news (published, published_at DESC);
CREATE INDEX IF NOT EXISTS news_slug_idx ON news (slug);
CREATE INDEX IF NOT EXISTS media_session_idx ON media (session_id);
CREATE INDEX IF NOT EXISTS pages_key_idx ON pages (key);
CREATE INDEX IF NOT EXISTS refresh_tokens_user_idx ON refresh_tokens (user_id);
```

---

## ШАГ 3 — API Эндпоинты

### Формат ответов (единообразный)

```javascript
// Список
{ items: [...], pagination: { total, page, limit, pages } }

// Один объект
{ id, slug, ..., created_at, updated_at }

// Ошибка
{ error: "Сообщение", code: "ERROR_CODE" }  // status 4xx/5xx

// Успешное удаление
{ ok: true }
```

### Middleware

#### `auth.js` — проверка JWT access token

```javascript
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export function authenticate(req, res, next) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    const token = header.split(' ')[1]
    req.user = jwt.verify(token, env.JWT_ACCESS_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}
```

#### `requireAdmin.js`

```javascript
export function requireAdmin(req, res, next) {
  if (!req.user || !['admin', 'superadmin'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  next()
}
```

#### `upload.js` — multer + автообработка через sharp

```javascript
import multer from 'multer'
import path from 'path'
import { v4 as uuid } from 'uuid'
import { env } from '../config/env.js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.params.folder || 'images'
    cb(null, path.join(env.UPLOADS_DIR, folder))
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, `${uuid()}${ext}`)
  }
})

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif']

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) cb(null, true)
    else cb(new Error('Invalid file type'))
  }
})
```

После загрузки — через `sharp` создавать thumbnail (800px) и webp-версию:
```javascript
// После multer middleware:
import sharp from 'sharp'

async function processImage(filePath, outputDir) {
  const name = path.basename(filePath, path.extname(filePath))
  await sharp(filePath)
    .resize(800, null, { withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(path.join(outputDir, `${name}_thumb.webp`))
}
```

### Роуты по каждому ресурсу

#### `/api/auth`

```
POST /api/auth/login        — вход (email+password) → {accessToken, user}
POST /api/auth/refresh       — обновление токена через httpOnly cookie → {accessToken}
POST /api/auth/logout        — очистить refresh cookie
GET  /api/auth/me            — текущий пользователь (authenticate)
```

**Login**: 
- Проверить `login_attempts` по IP — если `locked_until > NOW()` → 429
- После 5 неудачных попыток → заблокировать IP на 15 минут
- При успехе — сбросить счётчик попыток
- Возвращать `accessToken` (15 минут) в теле, `refreshToken` — в httpOnly cookie (7 дней)

```javascript
// Установка refresh cookie:
res.cookie('gbwc_rt', refreshToken, {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/api/auth',
})
```

#### `/api/sessions`

```
GET    /api/sessions                   — публичный список
GET    /api/sessions/:id               — публичный просмотр
GET    /api/sessions/slug/:slug        — поиск по slug
POST   /api/sessions                   — создание [authenticate, requireAdmin]
PATCH  /api/sessions/:id               — обновление [authenticate, requireAdmin]
DELETE /api/sessions/:id               — удаление [authenticate, requireAdmin]
POST   /api/sessions/:id/gallery       — загрузка фото в галерею [authenticate, requireAdmin, upload.array('files', 20)]
```

Query params для GET списка:
- `?lang=ru` — для возврата только нужного языка (по умолчанию возвращать весь JSONB)
- `?published=true` — фильтр (публичный API всегда добавляет `published=true`)
- `?page=1&limit=20` — пагинация

#### `/api/leaders`

```
GET    /api/leaders
GET    /api/leaders/:id
POST   /api/leaders                   [authenticate, requireAdmin]
PATCH  /api/leaders/:id               [authenticate, requireAdmin]
DELETE /api/leaders/:id               [authenticate, requireAdmin]
POST   /api/leaders/:id/photo         [authenticate, requireAdmin, upload.single('photo')]
```

#### `/api/initiatives`

```
GET    /api/initiatives
GET    /api/initiatives/:id
POST   /api/initiatives               [authenticate, requireAdmin]
PATCH  /api/initiatives/:id           [authenticate, requireAdmin]
DELETE /api/initiatives/:id           [authenticate, requireAdmin]
POST   /api/initiatives/:id/cover     [authenticate, requireAdmin, upload.single('cover')]
POST   /api/initiatives/:id/gallery   [authenticate, requireAdmin, upload.array('files', 20)]
```

#### `/api/partners`

```
GET    /api/partners?type=partner
GET    /api/partners/:id
POST   /api/partners                  [authenticate, requireAdmin]
PATCH  /api/partners/:id              [authenticate, requireAdmin]
DELETE /api/partners/:id              [authenticate, requireAdmin]
POST   /api/partners/:id/logo         [authenticate, requireAdmin, upload.single('logo')]
```

#### `/api/news`

```
GET    /api/news?page=1&limit=12
GET    /api/news/:id
GET    /api/news/slug/:slug
POST   /api/news                      [authenticate, requireAdmin]
PATCH  /api/news/:id                  [authenticate, requireAdmin]
DELETE /api/news/:id                  [authenticate, requireAdmin]
POST   /api/news/:id/cover            [authenticate, requireAdmin, upload.single('cover')]
```

#### `/api/media`

```
GET    /api/media?type=photo&session_id=1
GET    /api/media/:id
POST   /api/media                     [authenticate, requireAdmin, upload.array('files', 50)]
PATCH  /api/media/:id                 [authenticate, requireAdmin]
DELETE /api/media/:id                 [authenticate, requireAdmin]
```

#### `/api/pages`

```
GET    /api/pages/:key                — публичный (возвращает content)
POST   /api/pages                     [authenticate, requireAdmin] — создать/обновить по key (upsert)
```

#### `/api/uploads`

```
GET    /api/uploads?folder=images     [authenticate, requireAdmin]
POST   /api/uploads                   [authenticate, requireAdmin, upload.array('files', 20)]
DELETE /api/uploads/:id               [authenticate, requireAdmin]
```

#### `/api/contact`

```
GET    /api/contact                   [authenticate, requireAdmin] — список заявок
GET    /api/contact/:id               [authenticate, requireAdmin]
POST   /api/contact                   — публичная отправка заявки
PATCH  /api/contact/:id/status        [authenticate, requireAdmin] — изменить статус
```

---

## ШАГ 4 — Admin Panel (React, расширение Admin.jsx)

### Структура файлов Admin

```
src/pages/Admin/
├── Admin.jsx                         ← рефакторинг, главный layout
├── Admin.css
├── hooks/
│   ├── useAdminAuth.js
│   └── useResource.js               ← универсальный CRUD хук
├── components/
│   ├── AdminLayout.jsx              ← sidebar + topbar + content
│   ├── AdminSidebar.jsx
│   ├── AdminTable.jsx               ← универсальная таблица
│   ├── AdminForm.jsx
│   ├── LangTabs.jsx                 ← RU / EN / KK переключатель
│   ├── ImageUpload.jsx              ← drag&drop + preview
│   ├── MultiImageUpload.jsx
│   ├── SlugInput.jsx                ← с авто-генерацией
│   ├── DynamicList.jsx              ← add/remove/reorder строк
│   ├── RichTextArea.jsx
│   ├── ConfirmModal.jsx
│   ├── StatusBadge.jsx
│   └── Pagination.jsx
└── sections/
    ├── ContactsSection.jsx          ← уже есть, перенести
    ├── SessionsSection.jsx          ← новая, самая сложная
    ├── LeadersSection.jsx
    ├── InitiativesSection.jsx
    ├── PartnersSection.jsx
    ├── NewsSection.jsx
    ├── MediaSection.jsx
    ├── PagesSection.jsx
    ├── UploadsSection.jsx
    └── UsersSection.jsx
```

### `AdminLayout.jsx` — структура

```
+---------------------------+---------------------------------------------+
| GBWC Admin                |  [Title страницы]          [User] [Logout]  |
+---------------------------+---------------------------------------------+
| 📋 Заявки (badge count)   |                                             |
| 📅 Заседания              |   [Контент секции]                          |
| 👥 Лидеры                 |                                             |
| 🚀 Инициативы             |                                             |
| 🤝 Партнёры               |                                             |
| 📰 Новости                |                                             |
| 🖼  Медиа                  |                                             |
| 📄 Страницы               |                                             |
| 📁 Файлы                  |                                             |
| ⚙️  Пользователи           |                                             |
+---------------------------+---------------------------------------------+
```

### Страница Login (до входа в Admin)

Создать `src/pages/Admin/AdminLogin.jsx`:
- Минималистичная форма: email + password
- При успехе: сохранить `accessToken` в `localStorage` (или `memory`), редирект в `/admin`
- При ошибке 429 — показывать "Слишком много попыток. Попробуйте через X минут"
- Страница `/admin` проверяет токен. Если нет / истёк — редирект на `/admin/login`

### `useResource.js` — универсальный хук

```javascript
export function useResource(endpoint) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState(null)

  const list = async (params = {}) => { ... }
  const create = async (data) => { ... }
  const update = async (id, data) => { ... }
  const remove = async (id) => { ... }
  const uploadFile = async (id, path, file) => { ... }

  return { items, loading, pagination, list, create, update, remove, uploadFile }
}
```

### `SessionsSection.jsx` — tabbed форма (самая сложная)

Форма разбита на табы:

```
[Основное] [Контент] [Участники] [Галерея] [Ссылки]
```

**Таб "Основное":**
- Slug (с авто-генерацией из title.ru)
- Date (datepicker)
- Location (LangTabs: ru/en/kk)
- Stats: DynamicList [{num, label (LangTabs)}]
- Cover image (ImageUpload)
- Published (toggle)
- Sort order (number)

**Таб "Контент":**
- Title (LangTabs)
- Subtitle (LangTabs)
- Description (LangTabs, RichTextArea)
- Topics: DynamicList [{title (LangTabs), items: DynamicList [строки]}]

**Таб "Участники":**
- DynamicList [{name, role (LangTabs), org, photo (ImageUpload)}]
- Drag & drop сортировка участников

**Таб "Галерея":**
- MultiImageUpload — загрузка через `POST /api/sessions/:id/gallery`
- Существующие фото с кнопкой удаления и изменением подписи

**Таб "Ссылки":**
- DynamicList [{label (LangTabs), url, type: select(pdf/video/external)}]

### `LangTabs.jsx`

```jsx
function LangTabs({ value = {ru:'', en:'', kk:''}, onChange, multiline = false }) {
  const [lang, setLang] = useState('ru')
  return (
    <div>
      <div className="lang-tabs">
        {['ru','en','kk'].map(l => (
          <button key={l} className={lang === l ? 'active' : ''} onClick={() => setLang(l)}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>
      {multiline
        ? <textarea value={value[lang] || ''} onChange={e => onChange({...value, [lang]: e.target.value})} />
        : <input value={value[lang] || ''} onChange={e => onChange({...value, [lang]: e.target.value})} />
      }
      {!value.en && !value.kk && value.ru && (
        <span className="lang-warn">⚠ EN и KK не заполнены</span>
      )}
    </div>
  )
}
```

### `ImageUpload.jsx`

- Drag & drop зона
- Preview загруженного изображения
- Progress bar через `XMLHttpRequest` с onprogress
- Кнопка очистки
- При загрузке: `POST /api/uploads` → возвращает `{url, id}`
- Сохраняет URL в поле формы

### `PagesSection.jsx` — редактор статического контента

Список ключей страниц (слева) + JSON/форма редактор справа.
Предустановленные ключи:
```
home.about          — блок "О нас" на главной
home.stats          — статистика на главной
home.directions     — направления деятельности
home.partners_intro — вступление к партнёрам
about.mission       — страница About, миссия
about.values        — ценности
about.history       — история
contacts.info       — контактная информация
```

Для каждого ключа — форма с LangTabs для каждого поля.

---

## ШАГ 5 — Интеграция Frontend

### `src/services/api/index.js` — базовый API клиент

```javascript
const BASE = import.meta.env.VITE_API_URL || '/api'

let accessToken = localStorage.getItem('gbwc_token') || null

export function setToken(token) {
  accessToken = token
  if (token) localStorage.setItem('gbwc_token', token)
  else localStorage.removeItem('gbwc_token')
}

async function request(method, path, body, opts = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    credentials: 'include',  // для refresh cookie
    body: body ? JSON.stringify(body) : undefined,
    ...opts,
  })

  if (res.status === 401 && path !== '/auth/login') {
    // Попробовать обновить токен
    const refreshed = await fetch(`${BASE}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })
    if (refreshed.ok) {
      const { accessToken: newToken } = await refreshed.json()
      setToken(newToken)
      headers['Authorization'] = `Bearer ${newToken}`
      const retry = await fetch(`${BASE}${path}`, { method, headers, credentials: 'include', body: body ? JSON.stringify(body) : undefined })
      return retry.json()
    } else {
      setToken(null)
      window.location.href = '/admin/login'
      return
    }
  }

  return res.json()
}

export const api = {
  get: (path) => request('GET', path),
  post: (path, body) => request('POST', path, body),
  patch: (path, body) => request('PATCH', path, body),
  delete: (path) => request('DELETE', path),
}
```

### Обновить существующие API-клиенты

Файлы `src/services/api/eventsApi.js`, `leadersApi.js`, `initiativesApi.js`, `partnersApi.js`, `mediaApi.js` — обновить, чтобы они реально обращались к бекенду через `api.get(...)`.

### Хуки для компонентов

Создать в `src/shared/hooks/`:

```javascript
// useSessions.js
export function useSessions(filters = {}) {
  const [data, setData] = useState({ items: [], pagination: null })
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const params = new URLSearchParams({published: 'true', ...filters}).toString()
    api.get(`/sessions?${params}`)
      .then(d => setData(d))
      .finally(() => setLoading(false))
  }, [])
  return { ...data, loading }
}
```

Аналогично: `useLeaders`, `useInitiatives`, `usePartners`, `useNews`, `useMedia`, `usePageContent`.

### Постепенная замена хардкода

Обновить компоненты (не ломая существующий вид):
- `src/entities/events/events.data.js` → заменить на `useSessions()`
- `src/entities/founders/` → заменить на `useLeaders()`
- `src/entities/partners/` → заменить на `usePartners()`
- `src/shared/constants/homeData.jsx` → заменить на `usePageContent(key)`

---

## ШАГ 6 — Безопасность Admin

### Скрытый маршрут `/admin`

В `src/app/App.jsx` — маршрут `/admin` НЕ упоминать в Header/Footer. Только по прямой ссылке.

В `public/robots.txt`:
```
User-agent: *
Disallow: /admin
Disallow: /admin/
```

### Защита от брутфорса

В `server/src/middleware/rateLimit.js`:
```javascript
import rateLimit from 'express-rate-limit'

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 минут
  max: 5,
  message: { error: 'Too many login attempts', code: 'RATE_LIMITED' },
  standardHeaders: true,
  legacyHeaders: false,
})
```

Дополнительно — хранить `login_attempts` в БД по IP (см. схему выше).

### Первоначальное создание Admin пользователя

При старте сервера (в `migrate.js`) — если `ADMIN_PASSWORD` задан в ENV и в таблице `users` нет ни одной записи:
```javascript
const hash = await bcrypt.hash(env.ADMIN_PASSWORD, 12)
await db.query(
  `INSERT INTO users (email, password, role) VALUES ($1, $2, 'superadmin')
   ON CONFLICT (email) DO NOTHING`,
  [env.ADMIN_EMAIL, hash]
)
```

После первого запуска — удалить `ADMIN_PASSWORD` из ENV.

---

## ШАГ 7 — Производительность

### Кеширование ответов

Для публичных GET-запросов добавить заголовки кеша:
```javascript
// Middleware
export function cacheControl(maxAge = 60, staleWhileRevalidate = 300) {
  return (req, res, next) => {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`)
    next()
  }
}

// Применять на роутах:
router.get('/', cacheControl(60, 300), listSessions)
```

### Connection Pool

`pg.Pool` с `max: 20` соединениями — уже достаточно для высокой нагрузки.

### Пагинация везде

Все list-эндпоинты обязательно с пагинацией. Дефолт: `limit=20, page=1`.

### Сжатие

```javascript
import compression from 'compression'  // npm install compression
app.use(compression())
```

### Статические файлы через Nginx

В production — Nginx отдаёт `/uploads/` и `dist/` напрямую, не нагружая Node.js процесс.

---

## ШАГ 8 — Хостинг (VPS, Ubuntu 22.04)

### `ecosystem.config.js` (PM2)

```javascript
export default {
  apps: [{
    name: 'gbwc-server',
    script: './server/src/server.js',
    instances: 'max',         // кластерный режим — по числу CPU
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 4000,
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    restart_delay: 5000,
    max_memory_restart: '512M',
  }]
}
```

### `nginx/gbwc.conf`

```nginx
server {
    listen 80;
    server_name gbwc.network www.gbwc.network;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name gbwc.network www.gbwc.network;

    ssl_certificate     /etc/letsencrypt/live/gbwc.network/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/gbwc.network/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    gzip_min_length 1024;

    # Статика фронта
    root /var/www/gbwc/client/dist;
    index index.html;

    # Загруженные файлы — напрямую через Nginx (НЕ через Node.js)
    location /uploads/ {
        alias /var/www/gbwc/server/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # API → Node.js
    location /api/ {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
        client_max_body_size 15M;
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Деплой — команды

```bash
# Клонировать проект
git clone https://github.com/org/gbwc /var/www/gbwc

# Установить зависимости сервера
cd /var/www/gbwc/server && npm install

# Установить зависимости клиента и собрать
cd /var/www/gbwc/client && npm install && npm run build

# Запустить миграцию БД
cd /var/www/gbwc/server && npm run migrate

# Запустить через PM2
cd /var/www/gbwc && pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## ENV файл `server/.env`

```env
PORT=4000
NODE_ENV=production
DATABASE_URL=postgres://user:password@host:5432/gbwc_db
JWT_ACCESS_SECRET=<64+ random chars>
JWT_REFRESH_SECRET=<другой 64+ random chars>
ADMIN_EMAIL=admin@gbwc.network
ADMIN_PASSWORD=<только при первом запуске, потом удалить>
CLIENT_URL=https://gbwc.network
BASE_URL=https://gbwc.network
UPLOADS_DIR=/var/www/gbwc/server/uploads
```

Клиентский `.env`:
```env
VITE_API_URL=/api
```

---

## `client/vite.config.js` для разработки

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
})
```

---

## Порядок реализации

### Этап 1 — Удалить Vercel (5 минут)
1. Удалить `vercel.json`
2. Удалить папки `api/` и `lib/` (Vercel Serverless)
3. Удалить из `package.json`: `@vercel/analytics`, `@vercel/blob`
4. Обновить `vite.config.js` (добавить proxy на localhost:4000)

### Этап 2 — Backend core
1. Создать папку `server/` со структурой выше
2. `server/package.json` + установить зависимости
3. `server/src/config/` (db.js, env.js, cors.js)
4. `server/src/migrations/migrate.js` — все таблицы + индексы + seed admin user
5. `server/src/middleware/` (auth, requireAdmin, upload, rateLimit, errorHandler)
6. `server/src/routes/auth.routes.js` + controller/service (логин, рефреш, логаут)
7. Остальные роуты: sessions, leaders, initiatives, partners, news, media, pages, uploads, contact
8. `server/src/app.js` + `server/src/server.js`

### Этап 3 — Admin Panel
1. Рефакторинг `Admin.jsx` + `AdminLayout.jsx` + `AdminSidebar.jsx`
2. Переиспользуемые компоненты: LangTabs, ImageUpload, DynamicList, SlugInput
3. `AdminLogin.jsx` + `useAdminAuth.js`
4. `ContactsSection.jsx` (перенести существующий код)
5. `SessionsSection.jsx` — tabbed форма
6. `LeadersSection.jsx`, `PartnersSection.jsx`, `InitiativesSection.jsx`
7. `NewsSection.jsx`, `MediaSection.jsx`, `PagesSection.jsx`, `UploadsSection.jsx`
8. `UsersSection.jsx`

### Этап 4 — Frontend интеграция
1. Обновить `src/services/api/index.js` (базовый клиент с авто-рефрешем)
2. Обновить все `src/services/api/*.js` клиенты
3. Создать хуки: useSessions, useLeaders, useInitiatives, usePartners, useNews, useMedia, usePageContent
4. Постепенно заменить данные из `homeData.jsx` и `entities/` на API-вызовы
5. Настроить `public/robots.txt`

### Этап 5 — Деплой
1. `ecosystem.config.js` для PM2
2. `nginx/gbwc.conf`
3. Создать папку `server/uploads/` с подпапками: `images/`, `logos/`, `photos/`, `covers/`
4. Проверить права доступа (`chmod 755 uploads/`)
5. `README.md` с полной инструкцией по деплою

---

## Утилиты (`server/src/utils/`)

### `slugify.js`

```javascript
const RU_MAP = {
  а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'yo',ж:'zh',з:'z',и:'i',
  й:'j',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',
  у:'u',ф:'f',х:'kh',ц:'ts',ч:'ch',ш:'sh',щ:'sch',ъ:'',ы:'y',
  ь:'',э:'e',ю:'yu',я:'ya'
}

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[а-яё]/g, ch => RU_MAP[ch] || ch)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
```

### `paginate.js`

```javascript
export function getPagination(query) {
  const page = Math.max(1, parseInt(query.page) || 1)
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 20))
  const offset = (page - 1) * limit
  return { page, limit, offset }
}

export function paginationMeta(total, page, limit) {
  return { total, page, limit, pages: Math.ceil(total / limit) }
}
```

### `response.js`

```javascript
export function success(res, data, status = 200) {
  return res.status(status).json(data)
}

export function error(res, message, status = 400, code = null) {
  return res.status(status).json({ error: message, ...(code && { code }) })
}

export function notFound(res, resource = 'Resource') {
  return res.status(404).json({ error: `${resource} not found` })
}
```

---

## Итоговые требования к качеству

- **Нет Vercel** — ни одного упоминания Vercel в коде, конфигах, зависимостях
- **Чистый Express** — `server/` папка, запускается через `node src/server.js`
- **PM2 cluster mode** — для максимальной нагрузки на все ядра CPU
- **Nginx** отдаёт статику, проксирует `/api/` на Node.js
- **Загрузка файлов** — через multer на диск, sharp для оптимизации, URL вида `/uploads/images/xxx.webp`
- **Все JSONB поля** — `{ru, en, kk}` для мультиязычности
- **httpOnly cookie** для refresh token, access token в памяти / localStorage
- **Брутфорс защита** на login (rate limiter + DB таблица)
- **Роут /admin** — скрыт от навигации, не индексируется robots.txt
- **API отвечает за 100ms** для простых GET запросов при нормальной нагрузке
- **Кеш-заголовки** на публичных GET эндпоинтах
