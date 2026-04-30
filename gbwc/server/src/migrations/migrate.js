import mongoose from 'mongoose'
import { env } from '../config/env.js'
import User from '../models/User.js'
import Leader from '../models/Leader.js'
import Setting from '../models/Setting.js'
import Page from '../models/Page.js'
import Session from '../models/Session.js'
import Initiative from '../models/Initiative.js'
import Partner from '../models/Partner.js'
import bcrypt from 'bcryptjs'

async function seed() {
  console.log('🔧 Seeding MongoDB...')

  try {
    await mongoose.connect(env.DATABASE_URL)
    console.log('✅ Connected to MongoDB')

    // ── 1. Admin User ────────────────────────────────────────────────────────
    if (env.ADMIN_PASSWORD) {
      const existing = await User.findOne({ email: env.ADMIN_EMAIL })
      if (!existing) {
        const hash = await bcrypt.hash(env.ADMIN_PASSWORD, 12)
        await User.create({
          email: env.ADMIN_EMAIL,
          password: hash,
          role: 'superadmin',
          active: true
        })
        console.log(`✅ Admin created: ${env.ADMIN_EMAIL}`)
      }
    }

    // ── 2. Settings ──────────────────────────────────────────────────────────
    const settings = [
      { key: 'font_size_body', value: '18.5px', type: 'string', group: 'styles', label: 'Основной шрифт (body)' },
      { key: 'font_size_h2', value: 'clamp(28px, 3.2vw, 46px)', type: 'string', group: 'styles', label: 'Заголовки H2' },
      { key: 'font_size_h3', value: '24px', type: 'string', group: 'styles', label: 'Заголовки H3' },
      { key: 'site_title', value: 'GBWC — Global Businesswomen Council', type: 'string', group: 'general', label: 'Заголовок сайта' }
    ]
    for (const s of settings) {
      await Setting.findOneAndUpdate({ key: s.key }, s, { upsert: true })
    }
    console.log('✅ Settings seeded')

    // ── 3. Page Content (Home & About) ───────────────────────────────────────
    const pages = [
      {
        key: 'home',
        content: {
          about: {
            ru: { label: 'О платформе', title: 'Global Businesswomen Council — международная платформа стратегического диалога', p1: 'GBWC объединяет женщин-лидеров бизнеса, государственных и финансовых институтов для реализации значимых социально-экономических проектов в масштабах Евразийского пространства.', p2: 'Наша цель — создание инклюзивной среды, способствующей развитию потенциала женщин в экономике, поддержке инноваций и укреплению международного партнерства.', quote: '«Мы формируем пространство для диалога, которое трансформируется в реальное влияние и устойчивое развитие.»', cta: 'Подробнее', stats: [{ num: '15+', label: 'Стран' }, { num: '3', label: 'Заседания' }, { num: '7+', label: 'Проектов' }] },
            en: { label: 'About the Platform', title: 'Global Businesswomen Council — an international platform for strategic dialogue', p1: 'GBWC unites women business leaders, state and financial institutions to implement significant socio-economic projects across the Eurasian space.', p2: 'Our goal is to create an inclusive environment that promotes the development of women\'s potential in the economy, support for innovation and strengthening international partnerships.', quote: '"We create a space for dialogue that transforms into real impact and sustainable development."', cta: 'Read more', stats: [{ num: '15+', label: 'Countries' }, { num: '3', label: 'Sessions' }, { num: '7+', label: 'Projects' }] },
            kk: { label: 'Платформа туралы', title: 'Global Businesswomen Council — стратегиялық диалогтың халықаралық платформасы', p1: 'GBWC инклюзивті жаһандық экономика үшін әйел-көшбасшыларды, мемлекеттік және қаржы институттарын Еуразиялық кеңістік ауқымындағы маңызды әлеуметтік-экономикалық жобаларды жүзеге асыру үшін біріктіреді.', p2: 'Біздің мақсатымыз — экономикадағы әйелдердің әлеуетін дамытуға, инновацияларды қолдауға және халықаралық серіктестікті нығайтуға ықпал ететін инклюзивті орта құру.', quote: '«Біз диалог үшін кеңістік қалыптастырамыз, ол нақты ықпал мен тұрақты дамуға айналады.»', cta: 'Толығырақ', stats: [{ num: '15+', label: 'Ел' }, { num: '3', label: 'Отырыс' }, { num: '7+', label: 'Жоба' }] }
          },
          quote: {
            ru: { eyebrow: 'НАША МИССИЯ', title: 'Строить мосты между лидерами', lead: 'GBWC — это международная платформа, где женщины-лидеры встречаются для диалога и совместных инициатив.', quote: '«Мы создаём пространство, где лидеры могут влиять на глобальную повестку.»', author: 'Жанна Байдашева', role: 'Основатель GBWC' },
            en: { eyebrow: 'OUR MISSION', title: 'Building bridges between leaders', lead: 'GBWC is an international platform where women leaders meet for dialogue and joint initiatives.', quote: '"We create a space where leaders can influence the global agenda."', author: 'Zhanna Baidasheva', role: 'GBWC Founder' },
            kk: { eyebrow: 'БІЗДІҢ МИССИЯ', title: 'Көшбасшылар арасында көпір салу', lead: 'GBWC — стратегиялық диалогтың халықаралық платформасы.', quote: '«Біз көшбасшылардың жаһандық күн тәртібіне ықпал ете алатын кеңістік жасаймыз.»', author: 'Жанна Байдашева', role: 'GBWC Негізін қалаушы' }
          },
          stats: {
            ru: [{ n: 15, sx: '+', label: 'Стран-участниц', desc: 'Азия, Европа, СНГ и Ближний Восток' }, { n: 3, sx: '', label: 'Заседания', desc: 'Пленарные встречи 2023–2025' }],
            en: [{ n: 15, sx: '+', label: 'Countries', desc: 'Asia, Europe, CIS and Middle East' }, { n: 3, sx: '', label: 'Sessions', desc: 'Plenary meetings 2023–2025' }],
            kk: [{ n: 15, sx: '+', label: 'Қатысушы елдер', desc: 'Азия, Еуропа' }, { n: 3, sx: '', label: 'Отырыстар', desc: 'Пленарлық отырыстар' }]
          },
          directions: {
            ru: { sectionLabel: 'Направления', sectionTitle: 'Ключевые направления работы' },
            en: { sectionLabel: 'Areas', sectionTitle: 'Key areas of work' },
            kk: { sectionLabel: 'Бағыттар', sectionTitle: 'Негізгі бағыттар' }
          },
          plenary: {
            ru: { sectionLabel: 'Пленарные заседания', sectionTitle: 'Стратегический диалог', more: 'Все заседания' },
            en: { sectionLabel: 'Plenary Sessions', sectionTitle: 'Strategic Dialogue', more: 'All sessions' },
            kk: { sectionLabel: 'Пленарлық отырыстар', sectionTitle: 'Стратегиялық диалог', more: 'Барлық отырыстар' }
          },
          initiatives: {
            ru: { eyebrow: 'НАШИ ИНИЦИАТИВЫ', title: 'Проекты национального и международного масштаба', lead: 'Каждая инициатива GBWC направлена на решение актуальных вызовов.', cta: 'Все инициативы' },
            en: { eyebrow: 'OUR INITIATIVES', title: 'National and International Projects', lead: 'Each GBWC initiative aims at solving current challenges.', cta: 'All initiatives' },
            kk: { eyebrow: 'БІЗДІҢ БАСТАМАЛАР', title: 'Ұлттық және халықаралық жобалар', lead: 'GBWC бастамалары өзекті мәселелерді шешуге бағытталған.', cta: 'Барлық бастамалар' }
          },
          partners: {
            ru: { eyebrow: 'ПАРТНЕРСТВО', title: 'Участники пленарных заседаний', lead: 'Платформа объединяет международные организации, ведущие корпорации и национальные институты.', cta: 'Связаться', stats: [{ label: 'Международные организации', type: 'intl', num: '2' }, { label: 'Корпоративные участники', type: 'corp', num: '0' }, { label: 'Национальные институты', type: 'natl', num: '0' }] },
            en: { eyebrow: 'PARTNERSHIP', title: 'Plenary Session Participants', lead: 'The platform unites international organizations, leading corporations and national institutions.', cta: 'Contact', stats: [{ label: 'International Organizations', type: 'intl', num: '2' }, { label: 'Corporate Participants', type: 'corp', num: '0' }, { label: 'National Institutions', type: 'natl', num: '0' }] },
            kk: { eyebrow: 'СЕРІКТЕСТІК', title: 'Пленарлық отырыс қатысушылары', lead: 'Платформа халықаралық ұйымдарды, жетекші корпорацияларды біріктіреді.', cta: 'Байланысу', stats: [{ label: 'Халықаралық ұйымдар', type: 'intl', num: '2' }, { label: 'Корпоративтік қатысушылар', type: 'corp', num: '0' }, { label: 'Ұлттық институттар', type: 'natl', num: '0' }] }
          },
          coop: {
             ru: { title: 'Сотрудничество', lead: 'Присоединяйтесь к глобальной сети GBWC', cta: 'Стать партнером' },
             en: { title: 'Cooperation', lead: 'Join the GBWC global network', cta: 'Become a partner' },
             kk: { title: 'Ынтымақтастық', lead: 'GBWC жаһандық желісіне қосылыңыз', cta: 'Серіктес болу' }
          }
        }
      },
      {
        key: 'about',
        content: {
          hero: {
            ru: { title: 'О Совете', desc: 'Global Businesswomen Council — международный совет, объединяющий женщин-лидеров.' },
            en: { title: 'About the Council', desc: 'Global Businesswomen Council is an international council uniting women leaders.' },
            kk: { title: 'Кеңес туралы', desc: 'Global Businesswomen Council — әйел-көшбасшыларды біріктіретін халықаралық кеңес.' }
          },
          mission: {
            ru: { title: 'МИССИЯ', text: 'Миссия GBWC — содействие развитию международного сотрудничества.' },
            en: { title: 'MISSION', text: 'The mission of GBWC is to promote international cooperation.' },
            kk: { title: 'МИССИЯ', text: 'GBWC миссиясы — халықаралық ынтымақтастықты дамытуға жәрдемдесу.' }
          }
        }
      },
      {
        key: 'events',
        content: {
          hero: {
            ru: { title: 'Пленарные заседания', desc: 'Хронология стратегического диалога GBWC.' },
            en: { title: 'Plenary Sessions', desc: 'Chronology of the GBWC strategic dialogue.' },
            kk: { title: 'Пленарлық отырыстар', desc: 'GBWC стратегиялық диалогының хронологиясы.' }
          }
        }
      },
      {
        key: 'initiatives',
        content: {
          hero: {
            ru: { title: 'Наши Инициативы', desc: 'Проекты, направленные на системные изменения и социально-экономическое развитие.' },
            en: { title: 'Our Initiatives', desc: 'Projects aimed at systemic changes and socio-economic development.' },
            kk: { title: 'Біздің Бастамалар', desc: 'Жүйелі өзгерістер мен әлеуметтік-экономикалық дамуға бағытталған жобалар.' }
          }
        }
      },
      {
        key: 'partners',
        content: {
          hero: {
            ru: { title: 'Участники и партнеры', desc: 'Ведущие международные организации и бизнес-структуры.' },
            en: { title: 'Partners & Members', desc: 'Leading international organizations and business entities.' },
            kk: { title: 'Серіктестер мен қатысушылар', desc: 'Жетекші халықаралық ұйымдар мен бизнес-құрылымдар.' }
          }
        }
      }
    ]
    for (const p of pages) {
      await Page.findOneAndUpdate({ key: p.key }, p, { upsert: true })
    }
    console.log('✅ Page content seeded')

    // ── 4. Leaders ───────────────────────────────────────────────────────────
    const leaders = [
      {
        slug: 'zhanna-baidasheva',
        initials: 'ЖБ',
        index: '01',
        name: { ru: 'Жанна Амановна Байдашева', en: 'Zhanna Amanovna Baidasheva', kk: 'Жанна Аманқызы Байдашева' },
        role: { ru: 'Основатель GBWC', en: 'Founder, GBWC', kk: 'GBWC негізін қалаушы' },
        bio: { ru: 'Жанна Амановна Байдашева является основателем...', en: 'Zhanna Amanovna Baidasheva is the founder...', kk: 'Жанна Аманқызы Байдашева...' },
        photo: '/img/founders/zhanna_baidasheva.jpeg',
        sort_order: 1,
        published: true
      },
      {
        slug: 'bibigul-maserbaeva',
        initials: 'БМ',
        index: '02',
        name: { ru: 'Бибигуль Аманбаевна Масербаева', en: 'Bibigul Amanbaevna Maserbayeva', kk: 'Бибігүл Аманбайқызы Масербаева' },
        role: { ru: 'Руководитель Секретариата', en: 'Head of Secretariat', kk: 'Хатшылық жетекшісі' },
        bio: { ru: 'Отвечает за координацию...', en: 'Responsible for coordination...', kk: 'Үйлестіруге жауапты...' },
        photo: '/img/founders/bibigul_maserbaeva.jpeg',
        sort_order: 2,
        published: true
      }
    ]
    for (const l of leaders) {
      await Leader.findOneAndUpdate({ slug: l.slug }, l, { upsert: true })
    }
    console.log('✅ Leaders seeded')

    // ── 5. Initiatives ───────────────────────────────────────────────────────
    const initiatives = [
      {
        slug: 'g-index',
        num: '01',
        tag: { ru: 'АНАЛИТИКА', en: 'ANALYTICS', kk: 'АНАЛИТИКА' },
        title: { ru: 'G-Index Initiative', en: 'G-Index Initiative', kk: 'G-Index Initiative' },
        description: { ru: 'Международная система оценки...', en: 'International rating system...', kk: 'Халықаралық бағалау жүйесі...' },
        details: { ru: 'В рамках инициативы формируется...', en: 'A comprehensive support system...', kk: 'Бастама аясында...' },
        tasks: { 
          ru: ['Развитие инструментов', 'Экспертные рекомендации'], 
          en: ['Tool development', 'Expert recommendations'], 
          kk: ['Құралдарды дамыту'] 
        },
        published: true
      }
    ]
    for (const i of initiatives) {
      await Initiative.findOneAndUpdate({ slug: i.slug }, i, { upsert: true })
    }
    console.log('✅ Initiatives seeded')

    // ── 6. Partners ──────────────────────────────────────────────────────────
    const partnerData = [
      {
        slug: 'un-women',
        name: 'UN Women',
        type: 'intl',
        full: { ru: 'ООН-Женщины', en: 'UN Women', kk: 'БҰҰ-Əйелдер' },
        logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/UN_Women_UN_Emblem_blue.svg/200px-UN_Women_UN_Emblem_blue.svg.png',
        url: 'https://www.unwomen.org',
        published: true
      },
      {
        slug: 'ebrd',
        name: 'EBRD',
        type: 'intl',
        full: { ru: 'ЕБРР', en: 'EBRD', kk: 'ЕҚДБ' },
        logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/EBRD_logo.svg/200px-EBRD_logo.svg.png',
        url: 'https://www.ebrd.com',
        rep: { ru: 'Одиль Рено-Бассо', en: 'Odile Renaud-Basso', kk: 'Одиль Рено-Бассо' },
        sessions: [1, 2, 3],
        published: true
      }
    ]
    for (const p of partnerData) {
      await Partner.findOneAndUpdate({ slug: p.slug }, p, { upsert: true })
    }
    console.log('✅ Partners seeded')

    // ── 7. Sessions (Plenary) ───────────────────────────────────────────────
    const sessions = [
      {
        slug: 'session-1',
        numeral: 'I',
        year: '2023',
        date: { ru: '7 июня 2023', en: 'June 7, 2023', kk: '2023 жылғы 7 маусым' },
        theme: { ru: 'Новые возможности для бизнеса', en: 'New Opportunities for Business', kk: 'Бизнестің жаңа мүмкіндіктері' },
        description: { ru: 'Первое пленарное заседание...', en: 'First plenary session...', kk: 'Бірінші пленарлық отырыс...' },
        results: { ru: ['Создан Совет', 'Определены векторы'], en: ['Council established', 'Vectors defined'], kk: ['Кеңес құрылды'] },
        published: true
      }
    ]
    for (const s of sessions) {
      await Session.findOneAndUpdate({ slug: s.slug }, s, { upsert: true })
    }
    console.log('✅ Sessions seeded')

    console.log('✅ Seeding complete')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seeding error:', err)
    process.exit(1)
  }
}

seed()


