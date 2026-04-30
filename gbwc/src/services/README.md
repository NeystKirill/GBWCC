# API Integration — GBWC Frontend

## Быстрый старт

```bash
cp .env.example .env
# В .env: VITE_API_URL=http://localhost:3000/api
npm install
npm run dev
```

## Как работает

### 1. Центральный клиент — `src/services/api.js`

Все запросы к backend идут через этот файл. Автоматически:
- прикрепляет JWT токен из localStorage
- обновляет токен при 401 ответе (refresh)
- обрабатывает ошибки

```js
import { partners, sessions, news, contact } from '../services/api'

// Получить партнёров
const data = await partners.list('INTERNATIONAL')

// Отправить форму
await contact.submit({ name, email, subject, message })
```

### 2. Хук `useApi` — `src/hooks/useApi.js`

```js
import { useApi } from '../hooks/useApi'
import { leaders } from '../services/api'

const { data, loading, error, refetch } = useApi(
  () => leaders.list(),
  [lang] // зависимости — когда перезапрашивать
)
```

### 3. Хук `usePaginated` — для списков с пагинацией

```js
const { items, page, pages, loading, goTo, setFilter } = usePaginated(
  (params) => news.list(params),
  { limit: 9 }
)
```

### 4. Статичный фолбэк

Блоки главной страницы (HomePlenary, HomePartners, HomeInitiatives)
сначала пробуют загрузить данные из API.
Если API недоступен — отображают статические данные из `homeData.jsx`.

## Переменные страниц → API

| Страница | API endpoint |
|----------|-------------|
| Founders | GET /api/leaders |
| Events | GET /api/sessions |
| Initiatives | GET /api/initiatives |
| Partners | GET /api/partners?type=... |
| Media (новости) | GET /api/news |
| Media (СМИ) | GET /api/media |
| Contacts (форма) | POST /api/contact |
| Home / Partners | GET /api/partners |
| Home / Plenary | GET /api/sessions |
| Home / Initiatives | GET /api/initiatives |
