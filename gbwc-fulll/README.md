# GBWC — Единый проект (фронтенд + бэкенд)

Фронтенд (React/Vite) и бэкенд (Vercel Serverless Functions) в одном репозитории.

## Структура

```
gbwc/
├── src/                  ← React фронтенд
│   └── pages/Admin/      ← Админ-панель (Admin.jsx + Admin.css)
├── api/                  ← Serverless бэкенд (Vercel Functions)
│   ├── contact/
│   │   ├── index.js      → POST /api/contact, GET /api/contact
│   │   └── [id].js       → GET/PATCH/DELETE /api/contact/:id
│   ├── auth/
│   │   └── [action].js   → login / refresh / me / logout
│   └── _options.js       → CORS preflight
├── lib/                  ← Общие утилиты бэкенда
│   ├── db.js             → Neon PostgreSQL
│   ├── mailer.js         → SMTP Office 365
│   ├── auth.js           → JWT
│   ├── cors.js           → CORS хелперы
│   └── migrate.js        → Создание таблиц + первый admin
├── vercel.json           ← Конфиг деплоя
├── vite.config.js        ← Сборка фронтенда
└── .env.example          ← Переменные окружения
```

---

## Деплой за 5 шагов

### 1. База данных — Neon (бесплатно)

1. Зайди на [neon.tech](https://neon.tech) → Sign Up
2. New Project → имя `gbwc`
3. Скопируй **Connection String**:
   `postgres://user:pass@ep-xxx.neon.tech/neondb?sslmode=require`

### 2. Создай `.env`

```bash
cp .env.example .env
```

Заполни все поля (см. `.env.example` с комментариями).

**Сгенерировать JWT секреты:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Запусти дважды — получишь два разных секрета.

### 3. Создай таблицы в базе данных

```bash
npm install
node lib/migrate.js
```

Создаст таблицы `users`, `contacts` и первого admin из `.env`.

### 4. Залей на Vercel

```bash
npm i -g vercel   # если не установлен

vercel            # первый раз — задаст несколько вопросов
```

Затем добавь все переменные окружения:
```bash
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add JWT_REFRESH_SECRET
vercel env add SMTP_USER
vercel env add SMTP_PASS
vercel env add CONTACT_TO
vercel env add ADMIN_EMAIL
vercel env add ADMIN_PASSWORD
```

Деплой в production:
```bash
vercel --prod
```

После этого получишь URL вида `https://gbwc.vercel.app`

### 5. Готово!

| URL | Что открывается |
|-----|----------------|
| `https://gbwc.vercel.app/` | Сайт |
| `https://gbwc.vercel.app/admin` | Админ-панель |
| `https://gbwc.vercel.app/api/contact` | API |

---

## Локальная разработка

```bash
# Терминал 1 — фронтенд
npm run dev          # http://localhost:5173

# Терминал 2 — бэкенд через Vercel Dev
vercel dev --listen 3000
```

Vite автоматически проксирует `/api/*` на `localhost:3000`.

---

## Как работает форма заявок

1. Пользователь заполняет форму на `/ru/contacts`
2. Фронтенд → `POST /api/contact`
3. Бэкенд проверяет данные
4. Сохраняет в PostgreSQL
5. Отправляет уведомление на `info@gbwc.network`
6. Отправляет автоответ пользователю

## Статусы заявок в админке

- 🟡 **Новая** — только поступила
- 🔵 **В работе** — взята в обработку
- 🟢 **Завершена** — закрыта

Доступ к `/admin` — email/пароль из `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
