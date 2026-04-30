import { ABOUT_DATA, DIRECTIONS_DATA, DIRECTIONS_LABELS, PLENARY_DATA, PLENARY_LABELS, INITIATIVES_DATA, INITIATIVES_LABELS, PARTNERS_DATA, PARTNERS_LABELS, COOP_DATA } from './shared/constants/homeData'

const STATS = {
  ru: [
    { n:15, sx:'+', label:'Стран-участниц', desc:'Азия, Европа, СНГ и Ближний Восток' },
    { n:3, sx:'+', label:'Пленарных заседаний', desc:'Диалог на высшем уровне 2023–2025' },
    { n:15, sx:'+', label:'Партнёров', desc:'Транснациональные корпорации и институты' },
    { n:7, sx:'+', label:'Инициатив и проектов',desc:'Стратегические социальные программы' },
  ],
  en: [
    { n:15, sx:'+', label:'Member Countries', desc:'Asia, Europe, CIS and Middle East' },
    { n:3, sx:'+', label:'Plenary Sessions', desc:'High-level dialogue 2023–2025' },
    { n:15, sx:'+', label:'Partners', desc:'Transnational corporations and institutions' },
    { n:7, sx:'+', label:'Initiatives & Projects', desc:'Strategic social programs' },
  ],
  kk: [
    { n:15, sx:'+', label:'Қатысушы елдер', desc:'Азия, Еуропа, ТМД және Таяу Шығыс' },
    { n:3, sx:'+', label:'Пленарлық отырыстар', desc:'2023–2025 жоғары деңгейлі диалог' },
    { n:15, sx:'+', label:'Серіктестер', desc:'Трансұлттық корпорациялар мен институттар' },
    { n:7, sx:'+', label:'Бастамалар мен жобалар',desc:'Стратегиялық әлеуметтік бағдарламалар' },
  ]
}

const QUOTE_DATA = {
  ru: {
    eyebrow: 'НАША МИССИЯ', title: 'Строить мосты между лидерами', lead: 'GBWC — это международная платформа, где женщины-лидеры встречаются для диалога, обмена опытом и совместных инициатив.',
    pillars: [ { icon: '◆', label: 'Диалог', text: 'Нейтральное пространство для стратегического обмена.' }, { icon: '◈', label: 'Партнёрство', text: 'Долгосрочные партнёрства.' }, { icon: '◉', label: 'Влияние', text: 'Формирование рекомендаций и инициатив.' } ],
    quote: '«Мы создаём пространство, где лидеры могут влиять на глобальную повестку.»', author: 'Жанна Байдашева', role: 'Основатель GBWC',
  },
  en: {
    eyebrow: 'OUR MISSION', title: 'Building bridges between leaders', lead: 'GBWC is an international platform where women leaders meet for dialogue, knowledge exchange and joint initiatives.',
    pillars: [ { icon: '◆', label: 'Dialogue', text: 'A neutral space for strategic exchange.' }, { icon: '◈', label: 'Partnership', text: 'Long-term partnerships.' }, { icon: '◉', label: 'Impact', text: 'Shaping recommendations and initiatives.' } ],
    quote: '"We create a space where leaders can influence the global agenda."', author: 'Zhanna Baidasheva', role: 'GBWC Founder',
  },
  kk: {
    eyebrow: 'БІЗДІҢ МИССИЯ', title: 'Көшбасшылар арасында көпір салу', lead: 'GBWC — әйел-көшбасшылар диалог, тәжірибе алмасу және бірлескен бастамалар үшін жиналатын халықаралық платформа.',
    pillars: [ { icon: '◆', label: 'Диалог', text: 'Стратегиялық алмасуға арналған бейтарап кеңістік.' }, { icon: '◈', label: 'Серіктестік', text: 'Ұзақ мерзімді серіктестік.' }, { icon: '◉', label: 'Ықпал', text: 'Ұсыныстар мен бастамалар қалыптастыру.' } ],
    quote: '«Біз көшбасшылардың жаһандық күн тәртібіне ықпал ете алатын кеңістік жасаймыз.»', author: 'Жанна Байдашева', role: 'GBWC Негізін қалаушы',
  }
}

const DEFAULT_PAGES = {
  'home/hero': {
    slides: [
      { videoId: 'HvmRX-bCl5Y', title: { ru: 'Opening GBWC', en: 'Opening GBWC', kk: 'Opening GBWC' }, tag: { ru: 'GBWC · Институциональная платформа', en: 'GBWC · Institutional Platform', kk: 'GBWC · Институционалдық платформа' }, lines: [{ ru: 'Global', en: 'Global', kk: 'Global' }, { ru: 'Businesswomen', en: 'Businesswomen', kk: 'Businesswomen' }, { ru: 'Council —', en: 'Council —', kk: 'Council —' }, { ru: 'Институциональная', en: 'Institutional', kk: 'Институционалдық' }, { ru: 'диалоговая платформа', en: 'dialogue platform', kk: 'диалог платформасы' }] },
      { videoId: 'yLAvCrhiRwM', title: { ru: 'I Пленарное заседание', en: 'First Plenary Session', kk: 'I Пленарлық отырыс' }, tag: { ru: 'Astana · 2023', en: 'Astana · 2023', kk: 'Astana · 2023' }, lines: [{ ru: 'Инфраструктура', en: 'Infrastructure', kk: 'Инфрақұрылым' }, { ru: 'развития', en: 'for developing', kk: 'дамытуға' }, { ru: 'women-led', en: 'women-led', kk: 'women-led' }, { ru: 'бизнеса', en: 'business', kk: 'бизнес' }] },
      { videoId: 'c8zthz-qD8Y', title: { ru: 'II Пленарное заседание', en: 'Second Plenary Session', kk: 'II Пленарлық отырыс' }, tag: { ru: 'Astana · 2024', en: 'Astana · 2024', kk: 'Astana · 2024' }, lines: [{ ru: 'Интеграция', en: 'Integration', kk: 'Интеграция' }, { ru: 'в глобальные', en: 'into global', kk: 'жаһандық' }, { ru: 'рынки', en: 'markets', kk: 'нарықтарға' }] },
    ]
  },
  'home/about': { ...ABOUT_DATA, slideshow: ['/img/plenary/session3_group.jpeg', '/img/plenary/session1_group.jpeg', '/img/plenary/session1_ribbon.jpeg', '/img/plenary/plenar1_5_main.jpg'] },
  'home/quote': QUOTE_DATA,
  'home/directions': { ...DIRECTIONS_LABELS, items: DIRECTIONS_DATA.ru.map((_, i) => ({ title: { ru: DIRECTIONS_DATA.ru[i].title, en: DIRECTIONS_DATA.en[i].title, kk: DIRECTIONS_DATA.kk[i].title }, desc: { ru: DIRECTIONS_DATA.ru[i].desc, en: DIRECTIONS_DATA.en[i].desc, kk: DIRECTIONS_DATA.kk[i].desc }, icon: DIRECTIONS_DATA.ru[i].icon })) },
  'home/plenary': { ...PLENARY_LABELS, items: PLENARY_DATA.ru.map((_, i) => ({ year: PLENARY_DATA.ru[i].year, num: { ru: PLENARY_DATA.ru[i].num, en: PLENARY_DATA.en[i].num, kk: PLENARY_DATA.kk[i].num }, title: { ru: PLENARY_DATA.ru[i].title, en: PLENARY_DATA.en[i].title, kk: PLENARY_DATA.kk[i].title }, desc: { ru: PLENARY_DATA.ru[i].desc, en: PLENARY_DATA.en[i].desc, kk: PLENARY_DATA.kk[i].desc } })) },
  'home/initiatives': { ...INITIATIVES_LABELS, items: INITIATIVES_DATA.ru.map((_, i) => ({ tag: { ru: INITIATIVES_DATA.ru[i].tag, en: INITIATIVES_DATA.en[i].tag, kk: INITIATIVES_DATA.kk[i].tag }, title: INITIATIVES_DATA.ru[i].title, desc: { ru: INITIATIVES_DATA.ru[i].desc, en: INITIATIVES_DATA.en[i].desc, kk: INITIATIVES_DATA.kk[i].desc } })) },
  'home/partners': { ...PARTNERS_LABELS, intlLabel: { ru: 'Международные организации', en: 'International Organisations', kk: 'Халықаралық ұйымдар' }, corpLabel: { ru: 'Корпоративные участники', en: 'Corporate Participants', kk: 'Корпоративтік қатысушылар' }, natlLabel: { ru: 'Национальные институты', en: 'National Institutions', kk: 'Ұлттық институттар' }, intl: PARTNERS_DATA.ru.intl, corp: PARTNERS_DATA.ru.corp, natl: PARTNERS_DATA.ru.natl },
  'home/coop': COOP_DATA,
  'home/stats': STATS,
}

const originalFetch = window.fetch

window.fetch = async (...args) => {
  const url = typeof args[0] === 'string' ? args[0] : args[0].url
  const options = args[1] || {}
  const method = (options.method || 'GET').toUpperCase()

  // Extract path safely handling both relative and absolute URLs
  let path = url
  if (url.startsWith('http')) {
    path = new URL(url).pathname
  }

  // ─── AUTH MOCK ───
  if (path.includes('/auth/me')) {
    return new Response(JSON.stringify({ id: 1, email: 'admin@gbwc.local', role: 'admin' }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  }
  if (path.includes('/auth/login')) {
    return new Response(JSON.stringify({ tokens: { accessToken: 'local-mock-token' }, user: { id: 1, email: 'admin@gbwc.local', role: 'admin' } }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  }

  // ─── PAGES MOCK ───
  if (path.startsWith('/api/pages')) {
    if (method === 'GET') {
      const parts = path.split('/api/pages/')
      if (parts[1]) {
        const key = parts[1]
        const dbPages = JSON.parse(localStorage.getItem('gbwc_pages') || '{}')
        const content = dbPages[key] || DEFAULT_PAGES[key] || {}
        return new Response(JSON.stringify({ key, content }), { status: 200, headers: { 'Content-Type': 'application/json' } })
      } else {
        const dbPages = JSON.parse(localStorage.getItem('gbwc_pages') || '{}')
        const arr = Object.keys(DEFAULT_PAGES).map(k => ({ key: k, content: dbPages[k] || DEFAULT_PAGES[k] }))
        return new Response(JSON.stringify(arr), { status: 200, headers: { 'Content-Type': 'application/json' } })
      }
    }
    if (method === 'POST' || method === 'PATCH') {
      const body = JSON.parse(options.body)
      const key = body.key
      const dbPages = JSON.parse(localStorage.getItem('gbwc_pages') || '{}')
      dbPages[key] = body.content
      localStorage.setItem('gbwc_pages', JSON.stringify(dbPages))
      return new Response(JSON.stringify({ key, content: body.content }), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }
  }

  // ─── SETTINGS MOCK ───
  if (path.startsWith('/api/settings')) {
    if (method === 'GET') {
      const dbSettings = JSON.parse(localStorage.getItem('gbwc_settings') || '[]')
      return new Response(JSON.stringify(dbSettings), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }
    if (method === 'PATCH') {
      const body = JSON.parse(options.body)
      const arr = Object.keys(body).map(k => ({ key: k, value: body[k] }))
      localStorage.setItem('gbwc_settings', JSON.stringify(arr))
      return new Response(JSON.stringify(arr), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }
  }

  // Generic Mock CRUD Handler
  const handleCrud = (resource) => {
    if (path.startsWith(`/api/${resource}`)) {
      const db = JSON.parse(localStorage.getItem(`gbwc_${resource}`) || '[]')
      if (method === 'GET') return new Response(JSON.stringify(db), { status: 200, headers: { 'Content-Type': 'application/json' } })
      if (method === 'POST') {
        const body = JSON.parse(options.body)
        body.id = Date.now().toString()
        db.push(body)
        localStorage.setItem(`gbwc_${resource}`, JSON.stringify(db))
        return new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } })
      }
      if (method === 'PATCH') {
        const id = path.split('/').pop()
        const body = JSON.parse(options.body)
        const idx = db.findIndex(x => String(x.id) === String(id))
        if(idx !== -1) { db[idx] = { ...db[idx], ...body } }
        localStorage.setItem(`gbwc_${resource}`, JSON.stringify(db))
        return new Response(JSON.stringify(db[idx]), { status: 200, headers: { 'Content-Type': 'application/json' } })
      }
      if (method === 'DELETE') {
        const id = path.split('/').pop()
        const next = db.filter(x => String(x.id) !== String(id))
        localStorage.setItem(`gbwc_${resource}`, JSON.stringify(next))
        return new Response(JSON.stringify({success: true}), { status: 200, headers: { 'Content-Type': 'application/json' } })
      }
    }
    return null
  }

  let crudRes;
  if ((crudRes = handleCrud('leaders'))) return crudRes;
  if ((crudRes = handleCrud('sessions'))) return crudRes;
  if ((crudRes = handleCrud('initiatives'))) return crudRes;
  if ((crudRes = handleCrud('partners'))) return crudRes;
  if ((crudRes = handleCrud('news'))) return crudRes;
  if ((crudRes = handleCrud('media'))) return crudRes;

  // Fallback
  try {
    return await originalFetch(...args)
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Local mock route not found', url }), { status: 404, headers: { 'Content-Type': 'application/json' } })
  }
}

console.log('✅ LocalStorage API Mock initialized')
