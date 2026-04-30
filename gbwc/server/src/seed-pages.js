import 'dotenv/config'
import Page from './models/Page.js'

const PAGES = {
  'home/hero': {
    slides: [
      { videoId: 'HvmRX-bCl5Y', title: { ru: 'Opening GBWC', en: 'Opening GBWC', kk: 'Opening GBWC' }, tag: { ru: 'GBWC · Институциональная платформа', en: 'GBWC · Institutional Platform', kk: 'GBWC · Институционалдық платформа' }, lines: [{ ru: 'Global', en: 'Global', kk: 'Global' }, { ru: 'Businesswomen', en: 'Businesswomen', kk: 'Businesswomen' }, { ru: 'Council —', en: 'Council —', kk: 'Council —' }, { ru: 'Институциональная', en: 'Institutional', kk: 'Институционалдық' }, { ru: 'диалоговая платформа', en: 'dialogue platform', kk: 'диалог платформасы' }] },
      { videoId: 'yLAvCrhiRwM', title: { ru: 'I Пленарное заседание', en: 'First Plenary Session', kk: 'I Пленарлық отырыс' }, tag: { ru: 'Astana · 2023', en: 'Astana · 2023', kk: 'Astana · 2023' }, lines: [{ ru: 'Инфраструктура', en: 'Infrastructure', kk: 'Инфрақұрылым' }, { ru: 'развития', en: 'for developing', kk: 'дамытуға' }, { ru: 'women-led', en: 'women-led', kk: 'women-led' }, { ru: 'бизнеса', en: 'business', kk: 'бизнес' }] },
      { videoId: 'c8zthz-qD8Y', title: { ru: 'II Пленарное заседание', en: 'Second Plenary Session', kk: 'II Пленарлық отырыс' }, tag: { ru: 'Astana · 2024', en: 'Astana · 2024', kk: 'Astana · 2024' }, lines: [{ ru: 'Интеграция', en: 'Integration', kk: 'Интеграция' }, { ru: 'в глобальные', en: 'into global', kk: 'жаһандық' }, { ru: 'рынки', en: 'markets', kk: 'нарықтарға' }] },
    ]
  },

  'home/about': {
    label: { ru: 'О платформе', en: 'About the Platform', kk: 'Платформа туралы' },
    title: { ru: 'Global Businesswomen Council — международная платформа стратегического диалога', en: 'Global Businesswomen Council — an international platform for strategic dialogue', kk: 'Global Businesswomen Council — стратегиялық диалогтың халықаралық платформасы' },
    p1: { ru: 'GBWC объединяет женщин-лидеров бизнеса, представителей государственных институтов, международных организаций и экспертного сообщества для развития инклюзивной мировой экономики.', en: 'GBWC unites women business leaders, representatives of government institutions, international organisations and the expert community for an inclusive global economy.', kk: 'GBWC инклюзивті жаһандық экономика үшін бизнес-көшбасшы әйелдерді, мемлекеттік институттарды, халықаралық ұйымдар мен сарапшылар қауымдастығын біріктіреді.' },
    p2: { ru: 'Платформа создаёт институциональные условия для диалога, партнёрства и совместных инициатив на глобальном уровне.', en: 'The platform creates institutional conditions for dialogue, partnership and joint initiatives at the global level.', kk: 'Платформа жаһандық деңгейде диалог, серіктестік және бірлескен бастамалар үшін институционалдық жағдай жасайды.' },
    p3: { ru: 'С 2023 года GBWC провела три пленарных заседания с участием более 15 организаций из 13+ стран.', en: 'Since 2023, GBWC has held three plenary sessions with over 15 organisations from 13+ countries.', kk: '2023 жылдан бастап GBWC 13+ елден 15-тен астам ұйым қатысқан үш пленарлық сессия өткізді.' },
    cta: { ru: 'Подробнее о Совете', en: 'Learn About the Council', kk: 'Кеңес туралы толығырақ' },
    quote: { ru: '«Мы формируем пространство для диалога, где женщины-лидеры могут влиять на глобальную повестку»', en: '"We create a space for dialogue where women leaders can influence the global agenda"', kk: '«Біз әйел-көшбасшылардың жаһандық күн тәртібіне ықпал ете алатын диалог кеңістігін қалыптастырамыз»' },
    stats: [
      { num: '15+', label: { ru: 'Участников', en: 'Participants', kk: 'Қатысушылар' } },
      { num: '13+', label: { ru: 'Стран-участниц', en: 'Member Countries', kk: 'Қатысушы елдер' } },
      { num: '3', label: { ru: 'Мероприятия', en: 'Events', kk: 'Іс-шаралар' } },
      { num: '5+', label: { ru: 'Проектов и Инициатив', en: 'Projects & Initiatives', kk: 'Жобалар мен бастамалар' } },
    ],
    slideshow: ['/img/plenary/session3_group.jpeg', '/img/plenary/session1_group.jpeg', '/img/plenary/session1_ribbon.jpeg', '/img/plenary/plenar1_5_main.jpg'],
  },

  'home/quote': {
    eyebrow: { ru: 'НАША МИССИЯ', en: 'OUR MISSION', kk: 'БІЗДІҢ МИССИЯ' },
    title: { ru: 'Строить мосты между лидерами', en: 'Building bridges between leaders', kk: 'Көшбасшылар арасында көпір салу' },
    lead: { ru: 'GBWC — это международная платформа, где женщины-лидеры встречаются для диалога, обмена опытом и совместных инициатив.', en: 'GBWC is an international platform where women leaders meet for dialogue, knowledge exchange and joint initiatives.', kk: 'GBWC — әйел-көшбасшылар диалог, тәжірибе алмасу және бірлескен бастамалар үшін жиналатын халықаралық платформа.' },
    pillars: [
      { icon: '◆', label: { ru: 'Диалог', en: 'Dialogue', kk: 'Диалог' }, text: { ru: 'Нейтральное пространство для стратегического обмена между государством, бизнесом и международными организациями.', en: 'A neutral space for strategic exchange between government, business and international organisations.', kk: 'Мемлекет, бизнес пен халықаралық ұйымдар арасындағы стратегиялық алмасуға арналған бейтарап кеңістік.' } },
      { icon: '◈', label: { ru: 'Партнёрство', en: 'Partnership', kk: 'Серіктестік' }, text: { ru: 'Долгосрочные партнёрства между корпорациями, финансовыми институтами и государственными структурами.', en: 'Long-term partnerships between corporations, financial institutions and government bodies.', kk: 'Корпорациялар, қаржы институттары мен мемлекеттік құрылымдар арасындағы ұзақ мерзімді серіктестік.' } },
      { icon: '◉', label: { ru: 'Влияние', en: 'Impact', kk: 'Ықпал' }, text: { ru: 'Формирование рекомендаций и инициатив на национальном и международном уровне.', en: 'Shaping recommendations and initiatives at national and international level.', kk: 'Ұлттық және халықаралық деңгейдегі ұсыныстар мен бастамалар қалыптастыру.' } },
    ],
    quote: { ru: '«Мы создаём пространство, где лидеры могут влиять на глобальную повестку.»', en: '"We create a space where leaders can influence the global agenda."', kk: '«Біз көшбасшылардың жаһандық күн тәртібіне ықпал ете алатын кеңістік жасаймыз.»' },
    author: { ru: 'Жанна Байдашева', en: 'Zhanna Baidasheva', kk: 'Жанна Байдашева' },
    role: { ru: 'Основатель GBWC', en: 'GBWC Founder', kk: 'GBWC Негізін қалаушы' },
  },

  'home/directions': {
    sectionLabel: { ru: 'Направления деятельности', en: 'Areas of Work', kk: 'Қызмет бағыттары' },
    sectionTitle: { ru: 'Ключевые направления работы платформы', en: "Key areas of the platform's work", kk: 'Платформа жұмысының негізгі бағыттары' },
    sectionSubtext: { ru: 'GBWC работает по четырём взаимосвязанным направлениям.', en: 'GBWC operates across four interconnected areas.', kk: 'GBWC төрт өзара байланысты бағыт бойынша жұмыс істейді.' },
    items: [
      { title: { ru: 'Международное сотрудничество и дипломатия', en: 'International Diplomacy and Cooperation', kk: 'Халықаралық ынтымақтастық және дипломатия' }, desc: { ru: 'Укрепление стратегического диалога между государствами, международными институтами и глобальным бизнесом.', en: 'Strengthening strategic dialogue between states, international institutions, and global business.', kk: 'Мемлекеттер, халықаралық институттар мен жаһандық бизнес арасындағы стратегиялық диалогты нығайту.' } },
      { title: { ru: 'Развитие женского предпринимательства', en: "Women's Entrepreneurship Development", kk: 'Әйелдер кәсіпкерлігін дамыту' }, desc: { ru: 'Масштабирование программ поддержки, содействие выходу на международные рынки.', en: 'Scaling support programs, facilitating access to international markets.', kk: 'Қолдау бағдарламаларын кеңейту, халықаралық нарықтарға шығуға жәрдемдесу.' } },
      { title: { ru: 'Социальные инвестиции и партнерства', en: 'Social Investments and Partnerships', kk: 'Әлеуметтік инвестициялар мен серіктестіктер' }, desc: { ru: 'Реализация системных социальных проектов.', en: 'Implementation of systemic social projects.', kk: 'Жүйелі әлеуметтік жобаларды іске асыру.' } },
      { title: { ru: 'Культурное взаимодействие', en: 'Cultural Interaction', kk: 'Мәдени өзара іс-қимыл' }, desc: { ru: 'Развитие межнационального диалога через культурные проекты.', en: 'Development of intercultural dialogue through cultural projects.', kk: 'Мәдени жобалар арқылы ұлтаралық диалогты дамыту.' } },
    ],
  },

  'home/plenary': {
    sectionLabel: { ru: 'Пленарные заседания', en: 'Plenary Sessions', kk: 'Пленарлық сессиялар' },
    sectionTitle: { ru: 'Три заседания — три этапа диалога', en: 'Three sessions — three stages of dialogue', kk: 'Үш сессия — диалогтың үш кезеңі' },
    more: { ru: 'Подробнее', en: 'Learn more', kk: 'Толығырақ' },
    items: [
      { year: '2023', num: { ru: 'Первое заседание', en: 'First Session', kk: 'Бірінші сессия' }, title: { ru: 'Женщины в мировой экономике', en: 'Women in the Global Economy', kk: 'Жаһандық экономикадағы әйелдер' }, desc: { ru: 'Дискуссия о роли женского предпринимательства в устойчивом развитии.', en: "Discussion on the role of women's entrepreneurship in sustainable development.", kk: 'Тұрақты дамудағы әйел кәсіпкерлігінің рөлін талқылау.' } },
      { year: '2024', num: { ru: 'Второе заседание', en: 'Second Session', kk: 'Екінші сессия' }, title: { ru: 'Инвестиции в человеческий капитал', en: 'Investing in Human Capital', kk: 'Адами капиталға инвестиция' }, desc: { ru: 'Стратегический диалог об инвестировании в образование и лидерство.', en: 'Strategic dialogue on investing in education and leadership.', kk: 'Білім беру мен көшбасшылыққа инвестициялау туралы стратегиялық диалог.' } },
      { year: '2025', num: { ru: 'Третье заседание', en: 'Third Session', kk: 'Үшінші сессия' }, title: { ru: 'Глобальное партнёрство для роста', en: 'Global Partnership for Growth', kk: 'Өсуге арналған жаһандық серіктестік' }, desc: { ru: 'Формирование новой архитектуры международного сотрудничества.', en: 'Building a new architecture of international cooperation.', kk: 'Халықаралық ынтымақтастықтың жаңа архитектурасын қалыптастыру.' } },
    ],
  },

  'home/initiatives': {
    sectionLabel: { ru: 'Инициативы GBWC', en: 'GBWC Initiatives', kk: 'GBWC Бастамалары' },
    sectionTitle: { ru: 'Наши ключевые инициативы', en: 'Our key initiatives', kk: 'Біздің негізгі бастамаларымыз' },
    more: { ru: 'Подробнее', en: 'Learn more', kk: 'Толығырақ' },
    items: [
      { tag: { ru: 'Рейтинговая система', en: 'Rating System', kk: 'Рейтинг жүйесі' }, title: 'G-Index Initiative', desc: { ru: 'Международная система оценки готовности women-led предприятий.', en: 'International rating system for women-led enterprises.', kk: 'Әйелдер басқаратын кәсіпорындарды бағалау жүйесі.' } },
      { tag: { ru: 'Цифровая платформа', en: 'Digital Platform', kk: 'Цифрлық платформа' }, title: 'G-Index Hub', desc: { ru: 'Единая цифровая инфраструктура: сертификация, реестр, академия.', en: 'Unified digital infrastructure: certification, registry, academy.', kk: 'Сертификаттау, тіркелім, академия — цифрлық инфрақұрылым.' } },
      { tag: { ru: 'Образование', en: 'Education', kk: 'Білім' }, title: 'G-Index Academy', desc: { ru: 'Программы наращивания потенциала для предпринимательниц.', en: 'Capacity building programmes for women entrepreneurs.', kk: 'Кәсіпкер әйелдерге арналған бағдарламалар.' } },
      { tag: { ru: 'Технологии', en: 'Technology', kk: 'Технология' }, title: 'IT-AIEL', desc: { ru: 'Инициатива по развитию цифровых компетенций среди женщин.', en: 'Initiative for developing digital competencies among women.', kk: 'Әйелдер арасында цифрлық құзыреттілікті дамытуға арналған бастама.' } },
      { tag: { ru: 'Общество', en: 'Society', kk: 'Қоғам' }, title: { ru: 'Социальные инициативы', en: 'Social Initiatives', kk: 'Әлеуметтік бастамалар' }, desc: { ru: 'Программы устойчивого развития и социальной ответственности.', en: 'Programmes in sustainable development and CSR.', kk: 'Тұрақты даму мен корпоративтік жауапкершілік бағдарламалары.' } },
      { tag: { ru: 'Культура', en: 'Culture', kk: 'Мәдениет' }, title: { ru: 'Культурные инициативы', en: 'Cultural Initiatives', kk: 'Мәдени бастамалар' }, desc: { ru: 'Проекты в сфере международного культурного диалога.', en: 'Projects in international cultural dialogue.', kk: 'Халықаралық мәдени диалог жобалары.' } },
    ],
  },

  'home/partners': {
    sectionLabel: { ru: 'Пленарные заседания', en: 'Plenary Sessions', kk: 'Пленарлық отырыстар' },
    sectionTitle: { ru: 'Участники пленарных заседаний', en: 'Plenary Session Participants', kk: 'Пленарлық отырыс қатысушылары' },
    sectionSubtext: { ru: 'Платформа объединяет международные организации, ведущие корпорации и национальные институты.', en: '', kk: '' },
    intlLabel: { ru: 'Международные организации', en: 'International Organisations', kk: 'Халықаралық ұйымдар' },
    corpLabel: { ru: 'Корпоративные участники', en: 'Corporate Participants', kk: 'Корпоративтік қатысушылар' },
    natlLabel: { ru: 'Национальные институты', en: 'National Institutions', kk: 'Ұлттық институттар' },
    intl: ['ООН Женщины / UN Women', 'ЮНКТАД / UNCTAD', 'МОТ / ILO', 'Глобальный договор ООН / UN Global Compact', 'ЮНИДО / UNIDO', 'ЕЭК ООН / UNECE'],
    corp: ['iCore', 'Deloitte', 'KPMG', 'PricewaterhouseCoopers', 'Ernst & Young'],
    natl: ['АО «НУХ Байтерек»', 'QazTrade', 'KAZNEX INVEST', 'Палата предпринимателей', 'НПП «Атамекен»'],
  },

  'home/coop': {
    label: { ru: 'Присоединяйтесь', en: 'Join Us', kk: 'Қосылыңыз' },
    title: { ru: 'Станьте частью глобального диалога', en: 'Become Part of the Global Dialogue', kk: 'Жаһандық диалогтың бір бөлігі болыңыз' },
    text: { ru: 'GBWC открыта для сотрудничества с международными организациями, компаниями, образовательными учреждениями, экспертным сообществом и государственными институтами.', en: 'GBWC is open for cooperation with international organisations, companies, educational institutions, the expert community and government bodies.', kk: 'GBWC халықаралық ұйымдар, компаниялар, білім беру мекемелері, сарапшылар қауымдастығы мен мемлекеттік институттармен ынтымақтастыққа ашық.' },
    tags: [
      { ru: 'Международные организации', en: 'International Organisations', kk: 'Халықаралық ұйымдар' },
      { ru: 'Компании', en: 'Companies', kk: 'Компаниялар' },
      { ru: 'Государственные институты', en: 'Government Bodies', kk: 'Мемлекеттік институттар' },
      { ru: 'Образовательные учреждения', en: 'Educational Institutions', kk: 'Білім беру мекемелері' },
      { ru: 'Экспертное сообщество', en: 'Expert Community', kk: 'Сарапшылар' },
    ],
    btn1: { ru: 'Связаться с нами', en: 'Contact Us', kk: 'Бізбен байланысыңыз' },
    btn2: { ru: 'Направить предложение', en: 'Submit a Proposal', kk: 'Ұсыныс жіберу' },
  },

  'home/stats': [
    { n: 15, sx: '+', label: { ru: 'Стран-участниц', en: 'Member Countries', kk: 'Қатысушы елдер' }, desc: { ru: 'Азия, Европа, СНГ и Ближний Восток', en: 'Asia, Europe, CIS and Middle East', kk: 'Азия, Еуропа, ТМД және Таяу Шығыс' } },
    { n: 3, sx: '+', label: { ru: 'Пленарных заседаний', en: 'Plenary Sessions', kk: 'Пленарлық отырыстар' }, desc: { ru: 'Диалог на высшем уровне 2023–2025', en: 'High-level dialogue 2023–2025', kk: '2023–2025 жоғары деңгейлі диалог' } },
    { n: 15, sx: '+', label: { ru: 'Партнёров', en: 'Partners', kk: 'Серіктестер' }, desc: { ru: 'Транснациональные корпорации и институты', en: 'Transnational corporations and institutions', kk: 'Трансұлттық корпорациялар мен институттар' } },
    { n: 7, sx: '+', label: { ru: 'Инициатив и проектов', en: 'Initiatives & Projects', kk: 'Бастамалар мен жобалар' }, desc: { ru: 'Стратегические социальные программы', en: 'Strategic social programs', kk: 'Стратегиялық әлеуметтік бағдарламалар' } },
  ],
}

async function seed() {
  console.log('🔌 Initializing Local JSON Database...')

  for (const [key, content] of Object.entries(PAGES)) {
    const result = await Page.findOneAndUpdate(
      { key },
      { content },
      { upsert: true, new: true }
    )
    console.log(`  ✅ ${key} — saved (id: ${result.id})`)
  }

  console.log(`\n🎉 Done! ${Object.keys(PAGES).length} pages seeded.`)
  process.exit(0)
}

seed().catch(err => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
