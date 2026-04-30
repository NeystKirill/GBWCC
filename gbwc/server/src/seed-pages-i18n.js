/**
 * seed-pages-i18n.js
 * Seeds all Puck page blocks with proper multilingual {ru,en,kk} objects
 * so that every field shows data in the admin panel editor.
 *
 * Run:  node --experimental-vm-modules src/seed-pages-i18n.js
 */
import 'dotenv/config'
import Page from './models/Page.js'

// ─── Helper ───────────────────────────────────────────────────────────
const L = (ru, en, kk) => ({ ru, en: en || ru, kk: kk || ru })
const mapArr = (ruArr, enArr, kkArr, mapFn) =>
  ruArr.map((r, i) => mapFn(r, enArr?.[i] || r, kkArr?.[i] || r))

// ═══════════════════════════════════════════════════════════════════════
//  HOME PAGE
// ═══════════════════════════════════════════════════════════════════════
const HOME = {
  blocks: [
    { id: 'h1', type: 'VideoHero', data: {} },

    // ── HomeAbout ──
    { id: 'h2', type: 'HomeAbout', data: {
      label: L('О ПЛАТФОРМЕ', 'ABOUT THE PLATFORM', 'ПЛАТФОРМА ТУРАЛЫ'),
      title: L(
        'Global Businesswomen Council — международная платформа стратегического диалога',
        'Global Businesswomen Council — an international platform for strategic dialogue',
        'Global Businesswomen Council — стратегиялық диалогтың халықаралық платформасы'
      ),
      p1: L(
        'GBWC объединяет женщин-лидеров бизнеса, представителей государственных институтов, международных организаций и экспертного сообщества для развития инклюзивной мировой экономики.',
        'GBWC unites women business leaders, representatives of government institutions, international organisations and the expert community for an inclusive global economy.',
        'GBWC инклюзивті жаһандық экономика үшін бизнес-көшбасшы әйелдерді, мемлекеттік институттарды, халықаралық ұйымдар мен сарапшылар қауымдастығын біріктіреді.'
      ),
      p2: L(
        'Платформа создаёт институциональные условия для диалога, партнёрства и совместных инициатив на глобальном уровне.',
        'The platform creates institutional conditions for dialogue, partnership and joint initiatives at the global level.',
        'Платформа жаһандық деңгейде диалог, серіктестік және бірлескен бастамалар үшін институционалдық жағдай жасайды.'
      ),
      p3: L(
        'С 2023 года GBWC провела три пленарных заседания с участием более 15 организаций из 13+ стран, объединив государственных деятелей, корпорации и экспертное сообщество.',
        'Since 2023, GBWC has held three plenary sessions with over 15 organisations from 13+ countries, bringing together government officials, corporations and the expert community.',
        '2023 жылдан бастап GBWC 13+ елден 15-тен астам ұйым қатысқан үш пленарлық сессия өткізді.'
      ),
      cta: L('Подробнее о Совете', 'Learn About the Council', 'Кеңес туралы толығырақ'),
      quote: L(
        '«Мы формируем пространство для диалога, где женщины-лидеры могут влиять на глобальную повестку»',
        '"We create a space for dialogue where women leaders can influence the global agenda"',
        '«Біз әйел-көшбасшылардың жаһандық күн тәртібіне ықпал ете алатын диалог кеңістігін қалыптастырамыз»'
      ),
      reverseLayout: false,
    }},

    { id: 'h3', type: 'Sep', data: {} },

    // ── HomeQuote ──
    { id: 'h4', type: 'HomeQuote', data: {
      eyebrow: L('НАША МИССИЯ', 'OUR MISSION', 'БІЗДІҢ МИССИЯ'),
      title: L('Строить мосты между лидерами', 'Building bridges between leaders', 'Көшбасшылар арасында көпір салу'),
      lead: L(
        'GBWC — это международная платформа, где женщины-лидеры в бизнесе, государственных институтах и международных организациях встречаются для диалога, обмена опытом и совместных инициатив.',
        'GBWC is an international platform where women leaders in business, government institutions and international organisations meet for dialogue, experience exchange and joint initiatives.',
        'GBWC — бизнес, мемлекеттік институттар мен халықаралық ұйымдардағы әйел көшбасшылар диалог, тәжірибе алмасу және бірлескен бастамалар үшін кездесетін халықаралық платформа.'
      ),
      quote: L(
        '«Мы создаём пространство, где лидеры могут влиять на глобальную повестку и формировать инклюзивное будущее мировой экономики.»',
        '"We create a space where leaders can influence the global agenda and shape an inclusive future for the world economy."',
        '«Біз көшбасшылар жаһандық күн тәртібіне ықпал ете алатын және әлемдік экономиканың инклюзивті болашағын қалыптастыра алатын кеңістік жасаймыз.»'
      ),
      author: L('Жанна Байдашева', 'Zhanna Baidasheva', 'Жанна Байдашева'),
      role: L('Основатель GBWC', 'Founder, GBWC', 'GBWC негізін қалаушы'),
      pillars: [
        { icon: '◆', label: L('Диалог', 'Dialogue', 'Диалог'), text: L('Нейтральное пространство для честного и стратегического обмена между государством, бизнесом и международными организациями.', 'A neutral space for honest strategic exchange between government, business and international organisations.', 'Мемлекет, бизнес және халықаралық ұйымдар арасындағы адал стратегиялық алмасу үшін бейтарап кеңістік.') },
        { icon: '◈', label: L('Партнёрство', 'Partnership', 'Серіктестік'), text: L('Долгосрочные партнёрства между корпорациями, финансовыми институтами и государственными структурами.', 'Long-term partnerships between corporations, financial institutions and government structures.', 'Корпорациялар, қаржы институттары мен мемлекеттік құрылымдар арасындағы ұзақ мерзімді серіктестік.') },
        { icon: '◉', label: L('Влияние', 'Influence', 'Ықпал'), text: L('Формирование рекомендаций и инициатив, которые становятся частью реальной повестки на национальном и международном уровне.', 'Shaping recommendations and initiatives that become part of the real agenda at national and international levels.', 'Ұлттық және халықаралық деңгейде нақты күн тәртібінің бөлігіне айналатын ұсынымдар мен бастамаларды қалыптастыру.') },
      ],
    }},

    // ── HomeStats ──
    { id: 'h5', type: 'HomeStats', data: {
      items: [
        { n: '15', sx: '+', label: L('Стран-участниц', 'Member Countries', 'Қатысушы елдер'), desc: L('Азия, Европа, СНГ и Ближний Восток', 'Asia, Europe, CIS and Middle East', 'Азия, Еуропа, ТМД және Таяу Шығыс') },
        { n: '3', sx: '+', label: L('Пленарных заседаний', 'Plenary Sessions', 'Пленарлық сессия'), desc: L('Диалог на высшем уровне 2023–2025', 'Top-level dialogue 2023–2025', 'Жоғары деңгейдегі диалог 2023–2025') },
        { n: '15', sx: '+', label: L('Партнёров', 'Partners', 'Серіктестер'), desc: L('Транснациональные корпорации и институты', 'Transnational corporations and institutions', 'Трансұлттық корпорациялар мен институттар') },
        { n: '7', sx: '+', label: L('Инициатив и проектов', 'Initiatives & Projects', 'Бастамалар мен жобалар'), desc: L('Стратегические социальные программы', 'Strategic social programmes', 'Стратегиялық әлеуметтік бағдарламалар') },
      ],
    }},

    { id: 'h6', type: 'Sep', data: {} },

    // ── HomeDirections ──
    { id: 'h7', type: 'HomeDirections', data: {
      sectionLabel: L('НАПРАВЛЕНИЯ', 'FOCUS AREAS', 'БАҒЫТТАР'),
      sectionTitle: L('Ключевые направления деятельности', 'Key Focus Areas', 'Қызметтің негізгі бағыттары'),
      sectionSubtext: L(
        'Стратегические инициативы GBWC охватывают пять ключевых сфер развития международного сотрудничества',
        'GBWC strategic initiatives cover five key areas of international cooperation development',
        'GBWC стратегиялық бастамалары халықаралық ынтымақтастықты дамытудың бес негізгі саласын қамтиды'
      ),
      items: [
        { title: L('Аналитика и экспертиза', 'Analytics & Expertise', 'Аналитика және сараптама'), desc: L('Развитие аналитических инструментов оценки предпринимательского климата', 'Development of analytical tools for assessing the business climate', 'Кәсіпкерлік климатын бағалаудың аналитикалық құралдарын дамыту') },
        { title: L('Образование и развитие', 'Education & Development', 'Білім және дамуну'), desc: L('Программы профессионального развития и наставничества', 'Professional development and mentoring programmes', 'Кәсіби даму және тәлімгерлік бағдарламалары') },
        { title: L('Партнёрство и диалог', 'Partnership & Dialogue', 'Серіктестік және диалог'), desc: L('Международное сотрудничество между государством, бизнесом и организациями', 'International cooperation between government, business and organisations', 'Мемлекет, бизнес және ұйымдар арасындағы халықаралық ынтымақтастық') },
        { title: L('Социальные проекты', 'Social Projects', 'Әлеуметтік жобалар'), desc: L('Центры поддержки семьи и социальные программы', 'Family support centres and social programmes', 'Отбасын қолдау орталықтары және әлеуметтік бағдарламалар') },
      ],
    }},

    { id: 'h8', type: 'Sep', data: {} },

    // ── HomePlenary (dynamic — labels only) ──
    { id: 'h9', type: 'HomePlenary', data: {
      sectionLabel: L('СЕССИИ', 'SESSIONS', 'СЕССИЯЛАР'),
      sectionTitle: L('Пленарные заседания', 'Plenary Sessions', 'Пленарлық сессиялар'),
    }},

    { id: 'h10', type: 'Sep', data: {} },

    // ── HomeKeyPeople ──
    { id: 'h11', type: 'HomeKeyPeople', data: {
      sectionLabel: L('ЛИДЕРЫ', 'LEADERS', 'КӨШБАСШЫЛАР'),
      sectionTitle: L('Участники Совета', 'Council Members', 'Кеңес мүшелері'),
      ctaText: L('Лидеры бизнеса, эксперты и политики, объединяющие усилия для достижения общих целей', 'Business leaders, experts and politicians uniting efforts for common goals', 'Бірлескен мақсаттар үшін күш біріктіретін бизнес-көшбасшылар, сарапшылар мен саясаткерлер'),
      btnText: L('Узнать больше', 'Learn More', 'Толығырақ'),
      people: [
        { name: L('Одиль Рено-Бассо','Odile Renaud-Basso','Одиль Рено-Бассо'), role: L('Президент EBRD','President, EBRD','EBRD Президенті'), org: L('EBRD','EBRD','EBRD'), photo: '/img/plenary/Одиль Рено-Бассо.jpg', type: 'intl' },
        { name: L('Кирсти Уилсон','Kirsty Wilson','Кирсти Уилсон'), role: L('Зам. председателя Baker McKenzie','Deputy Chair, Baker McKenzie','Baker McKenzie төрағасының орынбасары'), org: L('Baker McKenzie','Baker McKenzie','Baker McKenzie'), photo: '/img/plenary/Кирсти Уилсон.jpg', type: 'corp' },
        { name: L('Антонелла Бассани','Antonella Bassani','Антонелла Бассани'), role: L('Вице-президент Всемирного банка','VP, World Bank','Дүниежүзілік Банк вице-президенті'), org: L('World Bank','World Bank','World Bank'), photo: '/img/plenary/Антонелла Бассани.jpeg', type: 'intl' },
        { name: L('Джули Монако','Julie Monaco','Джули Монако'), role: L('Управляющий директор Citi','Managing Director, Citi','Citi басқарушы директоры'), org: L('Citi','Citi','Citi'), photo: '/img/plenary/Джули Монако.png', type: 'corp' },
        { name: L('Аида Балаева','Aida Balaeva','Айда Балаева'), role: L('Зам. Руководителя Администрации Президента РК','Deputy Head, Presidential Administration','ҚР Президенті Әкімшілігінің орынбасары'), org: L('Администрация Президента РК','Presidential Administration','ҚР Президенті Әкімшілігі'), photo: '/img/plenary/Аида Балаева.webp', type: 'govt' },
        { name: L('Эльвира Азимова','Elvira Azimova','Эльвира Азимова'), role: L('Председатель Конституционного Суда РК','Chair, Constitutional Court','ҚР Конституциялық Сотының төрайымы'), org: L('Конституционный Суд РК','Constitutional Court','ҚР Конституциялық Соты'), photo: '/img/plenary/Эльвира Азимова.jpg', type: 'govt' },
        { name: L('Ажар Гиният','Azhar Giniyat','Ажар Гиният'), role: L('Министр здравоохранения РК','Minister of Health','ҚР Денсаулық сақтау министрі'), org: L('Министерство здравоохранения РК','Ministry of Health','ҚР Денсаулық сақтау министрлігі'), photo: '/img/plenary/Ажар Гиният.jpg', type: 'govt' },
        { name: L('Мишель Симмонс','Michelle Simmons','Мишель Симмонс'), role: L('Президент Microsoft в ЦЕ и ЦА','President, Microsoft CE & CA','Microsoft ОЕ және ОА президенті'), org: L('Microsoft','Microsoft','Microsoft'), photo: '/img/plenary/Мишель Симмонс.jpg', type: 'corp' },
      ],
    }},

    { id: 'h12', type: 'Sep', data: {} },

    // ── HomeInitiatives (dynamic — labels only) ──
    { id: 'h13', type: 'HomeInitiatives', data: {
      sectionLabel: L('ИНИЦИАТИВЫ', 'INITIATIVES', 'БАСТАМАЛАР'),
      sectionTitle: L('Наши инициативы', 'Our Initiatives', 'Біздің бастамалар'),
      supportTitle: L('Шесть направлений деятельности GBWC — от аналитики и образования до культурной дипломатии', 'Six GBWC focus areas — from analytics and education to cultural diplomacy', 'GBWC қызметінің алты бағыты — аналитикадан және білімнен мәдени дипломатияға дейін'),
      allBtn: L('Все инициативы', 'All Initiatives', 'Барлық бастамалар'),
    }},

    { id: 'h14', type: 'Sep', data: {} },

    // ── HomePartners ──
    { id: 'h15', type: 'HomePartners', data: {
      sectionLabel: L('ПАРТНЕРЫ', 'PARTNERS', 'СЕРІКТЕСТЕР'),
      sectionTitle: L('Партнеры и участники', 'Partners & Members', 'Серіктестер мен қатысушылар'),
      sectionSubtext: L('Глобальная сеть организаций, поддерживающих инициативы Совета по всему миру', 'A global network of organisations supporting Council initiatives worldwide', 'Кеңес бастамаларын бүкіл әлемде қолдайтын ұйымдардың жаһандық желісі'),
      intlLbl: L('Международные', 'International', 'Халықаралық'),
      corpLbl: L('Корпоративные', 'Corporate', 'Корпоративтік'),
      natlLbl: L('Национальные', 'National', 'Ұлттық'),
    }},

    { id: 'h16', type: 'Sep', data: {} },

    // ── HomeCoop ──
    { id: 'h17', type: 'HomeCoop', data: {
      label: L('СОТРУДНИЧЕСТВО', 'COOPERATION', 'ЫНТЫМАҚТАСТЫҚ'),
      title: L('Стать частью сообщества', 'Become Part of the Community', 'Қоғамдастықтың бір бөлігі болыңыз'),
      text: L(
        'Присоединяйтесь к инициативам Глобального Совета женщин-руководителей. Откройте новые возможности для развития бизнеса и международных партнерств.',
        'Join the initiatives of the Global Businesswomen Council. Discover new opportunities for business development and international partnerships.',
        'Жаһандық Іскер Әйелдер Кеңесінің бастамаларына қосылыңыз. Бизнесті дамыту мен халықаралық серіктестіктің жаңа мүмкіндіктерін ашыңыз.'
      ),
      btn1: L('Связаться с нами', 'Contact Us', 'Бізбен байланысыңыз'),
      btn2: L('Стать партнером', 'Become a Partner', 'Серіктес болу'),
      tags: [
        { text: L('International Organisations', 'International Organisations', 'Халықаралық ұйымдар') },
        { text: L('Государственные институты', 'Government Institutions', 'Мемлекеттік институттар') },
        { text: L('Корпорации', 'Corporations', 'Корпорациялар') },
        { text: L('Финансовые институты', 'Financial Institutions', 'Қаржы институттары') },
        { text: L('Экспертное сообщество', 'Expert Community', 'Сарапшылар қауымдастығы') },
      ],
    }},
  ],
}

// ═══════════════════════════════════════════════════════════════════════
//  ABOUT PAGE
// ═══════════════════════════════════════════════════════════════════════
import { ABOUT_CONTENT } from '../../src/entities/about/about.data.js'
const A = ABOUT_CONTENT
const al = (field) => L(A.ru[field], A.en[field], A.kk[field])

const ABOUT = {
  blocks: [
    { id: 'a1', type: 'Hero', data: {
      label: al('heroEye'),
      title: al('heroTitle'),
      titleEmphasis: L('', '', ''),
      desc: al('heroDesc'),
    }},
    { id: 'a2', type: 'AboutMandate', data: {
      eyebrow: al('mandateEye'),
      title: al('mandateTitle'),
      paragraphs: A.ru.mandateParas.map((_, i) => ({ text: L(A.ru.mandateParas[i], A.en.mandateParas[i], A.kk.mandateParas[i]) })),
      cards: A.ru.asideCards.map((c, i) => ({
        label: L(c.label, A.en.asideCards[i]?.label || c.label, A.kk.asideCards[i]?.label || c.label),
        num: c.num,
        sub: L(c.sub || '', A.en.asideCards[i]?.sub || '', A.kk.asideCards[i]?.sub || ''),
        text: L('', '', ''),
      })),
    }},
    { id: 'a3', type: 'AboutDirections', data: {
      eyebrow: al('dirEye'),
      title: al('dirTitle'),
      items: A.ru.dirs.map((d, i) => ({
        n: d.n,
        title: L(d.title, A.en.dirs[i]?.title || d.title, A.kk.dirs[i]?.title || d.title),
        desc: L(d.desc, A.en.dirs[i]?.desc || d.desc, A.kk.dirs[i]?.desc || d.desc),
      })),
    }},
    { id: 'a4', type: 'AboutTimeline', data: {
      eyebrow: al('timelineEye'),
      title: al('timelineTitle'),
      items: A.ru.timeline.map((t, i) => ({
        year: t.year,
        title: L(t.title, A.en.timeline[i]?.title || t.title, A.kk.timeline[i]?.title || t.title),
        desc: L(t.desc, A.en.timeline[i]?.desc || t.desc, A.kk.timeline[i]?.desc || t.desc),
      })),
    }},
    { id: 'a5', type: 'AboutPrinciples', data: {
      eyebrow: al('princEye'),
      title: al('princTitle'),
      items: A.ru.princs.map((p, i) => ({
        n: p.n,
        title: L(p.title, A.en.princs[i]?.title || p.title, A.kk.princs[i]?.title || p.title),
        desc: L(p.desc, A.en.princs[i]?.desc || p.desc, A.kk.princs[i]?.desc || p.desc),
      })),
    }},
    { id: 'a6', type: 'AboutFounder', data: {
      eyebrow: al('founderEye'),
      name: L(A.ru.founderTitle, A.en.founderTitle, A.kk.founderTitle),
      role: al('founderRole'),
      photo: A.ru.founderPhoto,
      bio: A.ru.founderBio.map((b, i) => ({ text: L(b, A.en.founderBio[i] || b, A.kk.founderBio[i] || b) })),
      points: (A.en.founderPoints || []).map((p, i) => ({ text: L(A.ru.founderPoints?.[i] || p, p, A.kk.founderPoints?.[i] || p) })),
      contactEmail: 'info@gbwc.network',
      contactPhone: '+7 702 731 4400',
    }},
    { id: 'a7', type: 'AboutSecretariat', data: {
      eyebrow: al('secretEye'),
      title: al('secretTitle'),
      members: A.ru.team.map((m, i) => ({
        name: L(m.name, A.en.team[i]?.name || m.name, A.kk.team[i]?.name || m.name),
        role: L(m.role, A.en.team[i]?.role || m.role, A.kk.team[i]?.role || m.role),
        photo: '',
      })),
    }},
    { id: 'a8', type: 'AboutMission', data: {
      eyebrow: al('mvvEye'),
      mission: al('mission'),
      vision: al('vision'),
      values: A.ru.values.map((v, i) => ({
        title: L(v.title, A.en.values[i]?.title || v.title, A.kk.values[i]?.title || v.title),
        text: L(v.desc, A.en.values[i]?.desc || v.desc, A.kk.values[i]?.desc || v.desc),
      })),
    }},
    { id: 'a9', type: 'AboutCTA', data: {
      title: L('', '', ''),
      text: al('ctaText'),
      btn: al('ctaInit'),
      email: 'info@gbwc.network',
    }},
  ],
}

// ═══════════════════════════════════════════════════════════════════════
//  CONTACTS PAGE
// ═══════════════════════════════════════════════════════════════════════
import { CONTACTS_CONTENT } from '../../src/entities/contacts/contacts.data.js'
const C = CONTACTS_CONTENT
const cl = (field) => L(C.ru[field], C.en[field], C.kk[field])

const CONTACTS = {
  blocks: [
    { id: 'c1', type: 'Hero', data: {
      label: cl('eyebrow'),
      title: cl('titlePlain'),
      titleEmphasis: cl('titleItalic'),
      desc: cl('subtitle'),
    }},
    { id: 'c2', type: 'ContactsContent', data: {
      infoTitle: cl('infoTitle'),
      infoDesc: cl('infoDesc'),
      addressLabel: cl('addressLabel'),
      addressVal: cl('addressVal'),
      phoneLabel: cl('phoneLabel'),
      emailLabel: cl('emailLabel'),
      socialLabel: cl('socialLabel'),
      persons: [
        { name: L('Масербаева Бибигуль Аманбаевна', 'Bibigul Amanbaevna Maserbaeva', 'Масербаева Бибігүл Аманбайқызы'), phone: '+7 702 731 4400', email: 'bibigul.maserbaeva@gbwc.network' },
        { name: L('Құмарғазы Сана Еркінқызы', 'Kumargazy Sana Erkinovna', 'Құмарғазы Сана Еркінқызы'), phone: '+7 778 124 70 54', email: 'sana.kumargazy@gbwc.network' },
      ],
      formTitle: cl('formTitle'),
      success: cl('success'),
      error: cl('error'),
      sending: cl('sending'),
      send: cl('send'),
      fields: {
        name: L(C.ru.fields.name, C.en.fields.name, C.kk.fields.name),
        namePh: L(C.ru.fields.namePh, C.en.fields.namePh, C.kk.fields.namePh),
        company: L(C.ru.fields.company, C.en.fields.company, C.kk.fields.company),
        companyPh: L(C.ru.fields.companyPh, C.en.fields.companyPh, C.kk.fields.companyPh),
        email: L(C.ru.fields.email, C.en.fields.email, C.kk.fields.email),
        emailPh: L(C.ru.fields.emailPh, C.en.fields.emailPh, C.kk.fields.emailPh),
        subject: L(C.ru.fields.subject, C.en.fields.subject, C.kk.fields.subject),
        subjectPh: L(C.ru.fields.subjectPh, C.en.fields.subjectPh, C.kk.fields.subjectPh),
        message: L(C.ru.fields.message, C.en.fields.message, C.kk.fields.message),
        messagePh: L(C.ru.fields.messagePh, C.en.fields.messagePh, C.kk.fields.messagePh),
      },
    }},
  ],
}

// ═══════════════════════════════════════════════════════════════════════
//  INITIATIVES PAGE
// ═══════════════════════════════════════════════════════════════════════
import { INITIATIVES_CONTENT } from '../../src/entities/initiatives/initiatives.data.js'
const IC = INITIATIVES_CONTENT
const il = (field) => L(IC.ru?.[field] || '', IC.en?.[field] || '', IC.kk?.[field] || '')

const INITIATIVES = {
  blocks: [
    { id: 'i1', type: 'Hero', data: {
      label: il('heroEye'),
      title: il('heroTitle'),
      titleEmphasis: L('', '', ''),
      desc: il('heroDesc'),
    }},
    { id: 'i2', type: 'InitiativesContent', data: {} },
  ],
}

// ═══════════════════════════════════════════════════════════════════════
//  MEDIA PAGE
// ═══════════════════════════════════════════════════════════════════════
const MEDIA = {
  blocks: [
    { id: 'm1', type: 'Hero', data: {
      label: L('GBWC', 'GBWC', 'GBWC'),
      title: L('Медиа', 'Media', 'Медиа'),
      titleEmphasis: L('', '', ''),
      desc: L('Фото и видео галерея', 'Photo and video gallery', 'Фото және бейне галерея'),
    }},
    { id: 'm2', type: 'MediaContent', data: {} },
  ],
}

// ═══════════════════════════════════════════════════════════════════════
//  PARTNERS PAGE
// ═══════════════════════════════════════════════════════════════════════
const PARTNERS = {
  blocks: [
    { id: 'p1', type: 'Hero', data: {
      label: L('GBWC', 'GBWC', 'GBWC'),
      title: L('Партнеры', 'Partners', 'Серіктестер'),
      titleEmphasis: L('', '', ''),
      desc: L('Глобальная сеть организаций, поддерживающих инициативы Совета', 'A global network of organisations supporting Council initiatives', 'Кеңес бастамаларын қолдайтын ұйымдардың жаһандық желісі'),
    }},
    { id: 'p2', type: 'PartnersContent', data: {} },
  ],
}

// ═══════════════════════════════════════════════════════════════════════
//  EVENTS PAGE
// ═══════════════════════════════════════════════════════════════════════
import { EVENTS_LABELS } from '../../src/entities/events/events.data.js'
const EL = EVENTS_LABELS
const el = (field) => L(EL.ru?.[field] || '', EL.en?.[field] || '', EL.kk?.[field] || '')

const EVENTS = {
  blocks: [
    { id: 'e1', type: 'Hero', data: {
      label: el('eyebrow'),
      title: el('heroTitle'),
      titleEmphasis: L('', '', ''),
      desc: el('heroDesc'),
    }},
    { id: 'e2', type: 'EventsContent', data: {} },
  ],
}

// ═══════════════════════════════════════════════════════════════════════
//  FOUNDERS PAGE
// ═══════════════════════════════════════════════════════════════════════
const FOUNDERS = {
  blocks: [
    { id: 'f1', type: 'Hero', data: {
      label: L('GBWC', 'GBWC', 'GBWC'),
      title: L('Лидеры', 'Leaders', 'Көшбасшылар'),
      titleEmphasis: L('', '', ''),
      desc: L('Лидеры и основатели', 'Leaders and Founders', 'Көшбасшылар мен негізін қалаушылар'),
    }},
    { id: 'f2', type: 'FoundersContent', data: {} },
  ],
}

// ═══════════════════════════════════════════════════════════════════════
//  SEED RUNNER
// ═══════════════════════════════════════════════════════════════════════
const ALL_PAGES = {
  home: HOME,
  about: ABOUT,
  initiatives: INITIATIVES,
  media: MEDIA,
  contacts: CONTACTS,
  partners: PARTNERS,
  events: EVENTS,
  founders: FOUNDERS,
}

async function seed() {
  console.log('🌐 Seeding pages with multilingual (ru/en/kk) block data...\n')
  for (const [key, content] of Object.entries(ALL_PAGES)) {
    await Page.findOneAndUpdate(
      { key },
      { content },
      { upsert: true, new: true }
    )
    console.log(`  ✅ ${key} — ${content.blocks.length} blocks saved`)
  }
  console.log(`\n🎉 Done! ${Object.keys(ALL_PAGES).length} pages seeded with i18n data.`)
  process.exit(0)
}

seed().catch(err => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
