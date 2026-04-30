/* ══════════════════════════════════════
   HOME PAGE — DATA & TRANSLATIONS
   ══════════════════════════════════════ */

/* ── Icons ── */
export const IconDialog = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)
export const IconBusiness = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
)
export const IconSocial = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)
export const IconCulture = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)
export const IconEducation = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
)

/* ── About ── */
export const ABOUT_DATA = {
  ru: {
    label: 'О платформе',
    title: <>Global Businesswomen Council — <span>международная платформа</span> стратегического диалога</>,
    p1: 'GBWC объединяет женщин-лидеров бизнеса, представителей государственных институтов, международных организаций и экспертного сообщества для развития инклюзивной мировой экономики.',
    p2: 'Платформа создаёт институциональные условия для диалога, партнёрства и совместных инициатив на глобальном уровне.',
    p3: 'С 2023 года GBWC провела три пленарных заседания с участием более 15 организаций из 13+ стран, объединив государственных деятелей, корпорации и экспертное сообщество.',
    cta: 'Подробнее о Совете',
    stats: [
      { num: '15+', label: 'Участников' },
      { num: '13+', label: 'Стран-участниц' },
      { num: '3',   label: 'Мероприятия' },
      { num: '5+',  label: 'Проектов и Инициатив' },
    ],
    quote: '«Мы формируем пространство для диалога, где женщины-лидеры могут влиять на глобальную повестку»',
  },
  en: {
    label: 'About the Platform',
    title: <>Global Businesswomen Council — <span>an international platform</span> for strategic dialogue</>,
    p1: 'GBWC unites women business leaders, representatives of government institutions, international organisations and the expert community for an inclusive global economy.',
    p2: 'The platform creates institutional conditions for dialogue, partnership and joint initiatives at the global level.',
    p3: 'Since 2023, GBWC has held three plenary sessions with over 15 organisations from 13+ countries, bringing together government officials, corporations and the expert community.',
    cta: 'Learn About the Council',
    stats: [
      { num: '15+', label: 'Participants' },
      { num: '13+', label: 'Member Countries' },
      { num: '3',   label: 'Events' },
      { num: '5+',  label: 'Projects & Initiatives' },
    ],
    quote: '"We create a space for dialogue where women leaders can influence the global agenda"',
  },
  kk: {
    label: 'Платформа туралы',
    title: <>Global Businesswomen Council — стратегиялық диалогтың <span>халықаралық платформасы</span></>,
    p1: 'GBWC инклюзивті жаһандық экономика үшін бизнес-көшбасшы әйелдерді, мемлекеттік институттарды, халықаралық ұйымдар мен сарапшылар қауымдастығын біріктіреді.',
    p2: 'Платформа жаһандық деңгейде диалог, серіктестік және бірлескен бастамалар үшін институционалдық жағдай жасайды.',
    p3: '2023 жылдан бастап GBWC 13+ елден 15-тен астам ұйым қатысқан үш пленарлық сессия өткізді.',
    cta: 'Кеңес туралы толығырақ',
    stats: [
      { num: '15+', label: 'Қатысушылар' },
      { num: '13+', label: 'Қатысушы елдер' },
      { num: '3',   label: 'Іс-шаралар' },
      { num: '5+',  label: 'Жобалар мен бастамалар' },
    ],
    quote: '«Біз әйел-көшбасшылардың жаһандық күн тәртібіне ықпал ете алатын диалог кеңістігін қалыптастырамыз»',
  },
}

/* ── Directions ── */
export const DIRECTIONS_DATA = {
  ru: [
    { icon: <IconDialog />,   title: 'Международное сотрудничество и дипломатия', desc: 'Укрепление стратегического диалога между государствами, международными институтами и глобальным бизнесом.' },
    { icon: <IconBusiness />, title: 'Развитие женского предпринимательства', desc: 'Масштабирование программ поддержки, содействие выходу на международные рынки и развитие бизнес-инициатив.' },
    { icon: <IconSocial />,   title: 'Социальные инвестиции и партнерства', desc: 'Реализация системных социальных проектов, включая развитие центров поддержки семьи и инициатив благосостояния.' },
    { icon: <IconCulture />,  title: 'Культурное взаимодействие', desc: 'Развитие межнационального диалога через международные культурные и просветительские проекты.' },
  ],
  en: [
    { icon: <IconDialog />,   title: 'International Diplomacy and Cooperation', desc: 'Strengthening strategic dialogue between states, international institutions, and global business.' },
    { icon: <IconBusiness />, title: 'Women\'s Entrepreneurship Development', desc: 'Scaling support programs, facilitating access to international markets, and developing business initiatives.' },
    { icon: <IconSocial />,   title: 'Social Investments and Partnerships', desc: 'Implementation of systemic social projects, including the development of family support centers and well-being initiatives.' },
    { icon: <IconCulture />,  title: 'Cultural Interaction', desc: 'Development of intercultural dialogue through international cultural and educational projects.' },
  ],
  kk: [
    { icon: <IconDialog />,   title: 'Халықаралық ынтымақтастық және дипломатия', desc: 'Мемлекеттер, халықаралық институттар мен жаһандық бизнес арасындағы стратегиялық диалогты нығайту.' },
    { icon: <IconBusiness />, title: 'Әйелдер кәсіпкерлігін дамыту', desc: 'Қолдау бағдарламаларын кеңейту, халықаралық нарықтарға шығуға жәрдемдесу және бизнес-бастамаларды дамыту.' },
    { icon: <IconSocial />,   title: 'Әлеуметтік инвестициялар мен серіктестіктер', desc: 'Жүйелі әлеуметтік жобаларды іске асыру, соның ішінде отбасылық қолдау орталықтары мен әл-ауқат бастамаларын дамыту.' },
    { icon: <IconCulture />,  title: 'Мәдени өзара іс-қимыл', desc: 'Халықаралық мәдени және ағартушылық жобалар арқылы ұлтаралық диалогты дамыту.' },
  ],
}

/* ── Plenary ── */
export const PLENARY_DATA = {
  ru: [
    { year: '2023', num: 'Первое заседание',  title: 'Женщины в мировой экономике',       desc: 'Дискуссия о роли женского предпринимательства в устойчивом развитии глобальных рынков и формировании новых экономических моделей.' },
    { year: '2024', num: 'Второе заседание',  title: 'Инвестиции в человеческий капитал', desc: 'Стратегический диалог об инвестировании в образование, лидерство и развитие женского потенциала как драйвера международного роста.' },
    { year: '2025', num: 'Третье заседание',  title: 'Глобальное партнёрство для роста',  desc: 'Формирование новой архитектуры международного сотрудничества, инклюзивного бизнеса и устойчивых партнёрств для будущего.' },
  ],
  en: [
    { year: '2023', num: 'First Session',  title: 'Women in the Global Economy',     desc: "Discussion on the role of women's entrepreneurship in sustainable development of global markets and forming new economic models." },
    { year: '2024', num: 'Second Session', title: 'Investing in Human Capital',      desc: "Strategic dialogue on investing in education, leadership and women's potential as a driver of international growth." },
    { year: '2025', num: 'Third Session',  title: 'Global Partnership for Growth',   desc: 'Building a new architecture of international cooperation, inclusive business and sustainable partnerships for the future.' },
  ],
  kk: [
    { year: '2023', num: 'Бірінші сессия', title: 'Жаһандық экономикадағы әйелдер',           desc: 'Жаһандық нарықтардың тұрақты дамуындағы әйел кәсіпкерлігінің рөлін талқылау.' },
    { year: '2024', num: 'Екінші сессия', title: 'Адами капиталға инвестиция',                desc: 'Білім беру, көшбасшылық пен әйелдер әлеуетіне инвестициялау туралы стратегиялық диалог.' },
    { year: '2025', num: 'Үшінші сессия', title: 'Өсуге арналған жаһандық серіктестік',      desc: 'Халықаралық ынтымақтастықтың жаңа архитектурасын қалыптастыру.' },
  ],
}

export const PLENARY_LABELS = {
  ru: { more: 'Подробнее',  sectionLabel: 'Пленарные заседания', sectionTitle: <><span>Три заседания</span> — три этапа диалога</> },
  en: { more: 'Learn more', sectionLabel: 'Plenary Sessions',    sectionTitle: <><span>Three sessions</span> — three stages of dialogue</> },
  kk: { more: 'Толығырақ',  sectionLabel: 'Пленарлық сессиялар', sectionTitle: <><span>Үш сессия</span> — диалогтың үш кезеңі</> },
}

/* ── Initiatives ── */
export const INITIATIVES_DATA = {
  ru: [
    { tag: 'Рейтинговая система', title: 'G-Index Initiative',   desc: 'Международная система оценки готовности women-led предприятий к масштабированию, выходу на экспортные рынки и привлечению инвестиций.' },
    { tag: 'Цифровая платформа',  title: 'G-Index Hub',          desc: 'Единая цифровая инфраструктура: сертификация, реестр верифицированных поставщиков, академия и инвестиционный пайплайн.' },
    { tag: 'Образование',         title: 'G-Index Academy',      desc: 'Программы наращивания потенциала для предпринимательниц: от бизнес-навыков до управления международными проектами.' },
    { tag: 'Технологии',          title: 'IT-AIEL',              desc: 'Инициатива по развитию цифровых компетенций и технологического предпринимательства среди женщин в странах-партнёрах.' },
    { tag: 'Общество',            title: 'Социальные инициативы',desc: 'Программы в области устойчивого развития, социальной ответственности бизнеса и поддержки уязвимых групп населения.' },
    { tag: 'Культура',            title: 'Культурные инициативы',desc: 'Проекты в сфере международного культурного диалога, сохранения наследия и содействия дипломатии через культуру.' },
  ],
  en: [
    { tag: 'Rating System',   title: 'G-Index Initiative',   desc: 'International rating system to assess the readiness of women-led enterprises for scaling, export markets and investment attraction.' },
    { tag: 'Digital Platform',title: 'G-Index Hub',          desc: 'Unified digital infrastructure: certification, verified supplier registry, academy and investment pipeline.' },
    { tag: 'Education',       title: 'G-Index Academy',      desc: 'Capacity building programmes for women entrepreneurs: from business skills to managing international projects.' },
    { tag: 'Technology',      title: 'IT-AIEL',              desc: 'Initiative for developing digital competencies and technology entrepreneurship among women in partner countries.' },
    { tag: 'Society',         title: 'Social Initiatives',   desc: 'Programmes in sustainable development, corporate social responsibility and support for vulnerable groups.' },
    { tag: 'Culture',         title: 'Cultural Initiatives', desc: 'Projects in international cultural dialogue, heritage preservation and cultural diplomacy.' },
  ],
  kk: [
    { tag: 'Рейтинг жүйесі',   title: 'G-Index Initiative',      desc: 'Әйелдер басқаратын кәсіпорындардың масштабтауға, экспортқа және инвестицияға дайындығын бағалау жүйесі.' },
    { tag: 'Цифрлық платформа',title: 'G-Index Hub',             desc: 'Сертификаттау, тіркелім, академия және инвестициялық пайплайнды біріктіретін цифрлық инфрақұрылым.' },
    { tag: 'Білім',             title: 'G-Index Academy',        desc: 'Кәсіпкер әйелдерге арналған бизнес дағдыларынан халықаралық жобаларды басқаруға дейінгі бағдарламалар.' },
    { tag: 'Технология',        title: 'IT-AIEL',                desc: 'Серіктес елдердегі әйелдер арасында цифрлық құзыреттілікті дамытуға арналған бастама.' },
    { tag: 'Қоғам',             title: 'Әлеуметтік бастамалар', desc: 'Тұрақты даму, корпоративтік жауапкершілік және осал топтарды қолдауға арналған бағдарламалар.' },
    { tag: 'Мәдениет',          title: 'Мәдени бастамалар',     desc: 'Халықаралық мәдени диалог, мұраны сақтау және мәдени дипломатия жобалары.' },
  ],
}

export const INITIATIVES_LABELS = {
  ru: { more: 'Подробнее',  sectionLabel: 'Инициативы GBWC',   sectionTitle: <>Наши <span>ключевые инициативы</span></> },
  en: { more: 'Learn more', sectionLabel: 'GBWC Initiatives',   sectionTitle: <>Our <span>key initiatives</span></> },
  kk: { more: 'Толығырақ',  sectionLabel: 'GBWC Бастамалары',  sectionTitle: <>Біздің <span>негізгі бастамаларымыз</span></> },
}

/* ── Partners ── */
export const PARTNERS_DATA = {
  ru: {
    intl: ['ООН Женщины', 'ЮНКТАД', 'МОТ', 'Глобальный договор ООН', 'ЮНИДО', 'ЕЭК ООН'],
    corp: ['iCore', 'Deloitte', 'KPMG', 'PricewaterhouseCoopers', 'Ernst & Young'],
    natl: ['АО «НУХ Байтерек»', 'QazTrade', 'KAZNEX INVEST', 'Palata Predprinimatelei', 'НПП «Атамекен»'],
  },
  en: {
    intl: ['UN Women', 'UNCTAD', 'ILO', 'UN Global Compact', 'UNIDO', 'UNECE'],
    corp: ['iCore', 'Deloitte', 'KPMG', 'PricewaterhouseCoopers', 'Ernst & Young'],
    natl: ['Baiterek NMH', 'QazTrade', 'KAZNEX INVEST', 'Chamber of Entrepreneurs', 'Atameken NCE'],
  },
  kk: {
    intl: ['БҰҰ Әйелдер', 'ЮНКТАД', 'ХЕҰ', 'БҰҰ Жаһандық шарты', 'ЮНИДО', 'БҰҰ ЕЭК'],
    corp: ['iCore', 'Deloitte', 'KPMG', 'PricewaterhouseCoopers', 'Ernst & Young'],
    natl: ['«Байтерек» ҰБХ АҚ', 'QazTrade', 'KAZNEX INVEST', 'Кәсіпкерлер палатасы', 'Атамекен ҰКП'],
  },
}

export const PARTNERS_LABELS = {
  ru: { intl: 'Международные организации', corp: 'Корпоративные участники', natl: 'Национальные институты', sectionLabel: 'Пленарные заседания', sectionTitle: <><span>Участники</span> пленарных заседаний</>, sectionSubtext: 'Платформа объединяет международные организации, ведущие корпорации и национальные институты.' },
  en: { intl: 'International Organisations',corp: 'Corporate Participants',     natl: 'National Institutions',     sectionLabel: 'Plenary Sessions',       sectionTitle: <>Plenary Session <span>Participants</span></> },
  kk: { intl: 'Халықаралық ұйымдар',        corp: 'Корпоративтік қатысушылар',natl: 'Ұлттық институттар', sectionLabel: 'Пленарлық отырыстар',   sectionTitle: <>Пленарлық отырыс <span>қатысушылары</span></> },
}

/* ── Cooperation CTA ── */
export const COOP_DATA = {
  ru: {
    label:  'Присоединяйтесь',
    title:  'Станьте частью глобального диалога',
    text:   'GBWC открыта для сотрудничества с международными организациями, компаниями, образовательными учреждениями, экспертным сообществом и государственными институтами.',
    tags:   ['Международные организации', 'Компании', 'Государственные институты', 'Образовательные учреждения', 'Экспертное сообщество'],
    btn1:   'Связаться с нами',
    btn2:   'Направить предложение',
  },
  en: {
    label:  'Join Us',
    title:  'Become Part of the Global Dialogue',
    text:   'GBWC is open for cooperation with international organisations, companies, educational institutions, the expert community and government bodies.',
    tags:   ['International Organisations', 'Companies', 'Government Bodies', 'Educational Institutions', 'Expert Community'],
    btn1:   'Contact Us',
    btn2:   'Submit a Proposal',
  },
  kk: {
    label:  'Қосылыңыз',
    title:  'Жаһандық диалогтың бір бөлігі болыңыз',
    text:   'GBWC халықаралық ұйымдар, компаниялар, білім беру мекемелері, сарапшылар қауымдастығы мен мемлекеттік институттармен ынтымақтастыққа ашық.',
    tags:   ['Халықаралық ұйымдар', 'Компаниялар', 'Мемлекеттік институттар', 'Білім беру мекемелері', 'Сарапшылар'],
    btn1:   'Бізбен байланысыңыз',
    btn2:   'Ұсыныс жіберу',
  },
}

/* ── Directions section headers ── */
export const DIRECTIONS_LABELS = {
  ru: { sectionLabel: 'Направления деятельности', sectionTitle: <>Ключевые <span>направления</span> работы платформы</>, sectionSubtext: 'GBWC работает по четырём взаимосвязанным направлениям, охватывающим международное сотрудничество, развитие предпринимательства, социальные инвестиции и культурное взаимодействие.' },
  en: { sectionLabel: 'Areas of Work',             sectionTitle: <>Key <span>areas</span> of the platform's work</>, sectionSubtext: 'GBWC operates across four interconnected areas spanning international cooperation, business development, social investments, and cultural interactions.' },
  kk: { sectionLabel: 'Қызмет бағыттары',          sectionTitle: <>Платформа жұмысының <span>негізгі бағыттары</span></>, sectionSubtext: 'GBWC халықаралық ынтымақтастық, кәсіпкерлікті дамыту, әлеуметтік инвестициялар және мәдени өзара іс-қимылды қамтитын төрт өзара байланысты бағыт бойынша жұмыс істейді.' },
}