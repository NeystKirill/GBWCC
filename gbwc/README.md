# GBWC — Global Businesswomen Council

**gbwc.network** — Сайт + CMS Admin Panel + REST API

## Архитектура

```
gbwc/
├── src/                    ← React 18 + Vite (клиент)
│   ├── pages/Admin/        ← CMS Admin Panel (10 секций)
│   ├── services/api.js     ← Unified API client
│   └── shared/hooks/       ← Публичные data hooks
│
├── server/                 ← Node.js Express backend
│   ├── src/
│   │   ├── app.js          ← Express app
│   │   ├── server.js       ← Entry point
│   │   ├── config/         ← DB, ENV, CORS
│   │   ├── middleware/     ← Auth, Upload, Rate Limit
│   │   ├── routes/         ← 10 route files
│   │   ├── services/       ← Business logic (DB queries)
│   │   ├── migrations/     ← DB schema + seed
│   │   └── utils/          ← Slugify, Paginate, Response
│   ├── uploads/            ← Uploaded files
│   └── .env                ← Environment variables
│
├── nginx/gbwc.conf         ← Nginx configuration
├── ecosystem.config.js     ← PM2 configuration
└── README.md
```

## Быстрый запуск (Development)

### 1. PostgreSQL

Установите PostgreSQL и создайте базу данных:

```bash
createdb gbwc_db
```

### 2. Настройка server/.env

```bash
cd server
cp .env.example .env
# Отредактируйте DATABASE_URL, JWT секреты и т.д.
```

### 3. Установка зависимостей

```bash
# Клиент
npm install

# Сервер
cd server && npm install
```

### 4. Миграция БД

```bash
cd server && npm run migrate
```

Это создаст все таблицы и admin-пользователя (email/password из .env).

### 5. Запуск

В двух терминалах:

```bash
# Терминал 1: Сервер (порт 4000)
cd server && npm run dev

# Терминал 2: Клиент (порт 5173)
npm run dev
```

Открыть:
- **Сайт**: http://localhost:5173
- **Admin**: http://localhost:5173/admin
- **API Health**: http://localhost:4000/api/health

## Деплой на VPS (Ubuntu 22.04)

### 1. Клонировать и установить

```bash
git clone https://github.com/org/gbwc /var/www/gbwc
cd /var/www/gbwc

# Клиент
npm install && npm run build

# Сервер
cd server && npm install
```

### 2. Настроить .env

```bash
cd /var/www/gbwc/server
cp .env.example .env
nano .env
# Установить:
# NODE_ENV=production
# DATABASE_URL=postgres://...
# JWT_ACCESS_SECRET=<сгенерировать>
# JWT_REFRESH_SECRET=<сгенерировать>
# CLIENT_URL=https://gbwc.network
# BASE_URL=https://gbwc.network
# UPLOADS_DIR=/var/www/gbwc/server/uploads
```

### 3. Миграция

```bash
cd /var/www/gbwc/server && npm run migrate
```

### 4. PM2

```bash
cd /var/www/gbwc
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 5. Nginx

```bash
sudo cp nginx/gbwc.conf /etc/nginx/sites-available/gbwc
sudo ln -s /etc/nginx/sites-available/gbwc /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 6. SSL (Let's Encrypt)

```bash
sudo certbot --nginx -d gbwc.network -d www.gbwc.network
```

## API Endpoints

| Метод | Путь | Описание | Auth |
|-------|------|----------|------|
| POST | /api/auth/login | Вход | ❌ |
| POST | /api/auth/refresh | Обновить токен | ❌ |
| POST | /api/auth/logout | Выход | ❌ |
| GET | /api/auth/me | Текущий пользователь | ✅ |
| GET | /api/sessions | Список заседаний | ❌ |
| POST | /api/sessions | Создать заседание | ✅ |
| GET | /api/leaders | Список лидеров | ❌ |
| GET | /api/initiatives | Список инициатив | ❌ |
| GET | /api/partners | Список партнёров | ❌ |
| GET | /api/news | Список новостей | ❌ |
| GET | /api/media | Список медиа | ❌ |
| GET | /api/pages/:key | Контент страницы | ❌ |
| POST | /api/contact | Отправить заявку | ❌ |
| GET | /api/health | Health check | ❌ |

## Admin Panel (CMS)

Доступ: `/admin` (скрыт из навигации, заблокирован в robots.txt)

**10 секций:**
1. 📋 Заявки — управление контактными формами
2. 📅 Заседания — tabbed форма (основное/контент/участники/галерея/ссылки)
3. 👥 Лидеры — CRUD с фото и соцсетями
4. 🚀 Инициативы — CRUD с целями и результатами
5. 🤝 Партнёры — CRUD с логотипами и типами
6. 📰 Новости — CRUD с публикацией
7. 🖼 Медиа — галерея фото/видео
8. 📄 Страницы — CMS для статического контента
9. 📁 Файлы — файловый менеджер
10. ⚙️ Пользователи — управление админами

## Технологии

- **Frontend**: React 18, Vite, React Router
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (pg)
- **Auth**: JWT (access + refresh), bcrypt, httpOnly cookies
- **Upload**: Multer + Sharp (WebP thumbnails)
- **Deploy**: PM2 (cluster), Nginx, Let's Encrypt
