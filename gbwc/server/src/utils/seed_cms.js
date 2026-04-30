import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Page from '../models/Page.js';
import Leader from '../models/Leader.js';
import Partner from '../models/Partner.js';
import Initiative from '../models/Initiative.js';

dotenv.config();

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error('DATABASE_URL is not defined in .env');
  process.exit(1);
}

const resolve = (ru, en, kk) => ({ ru, en: en || ru, kk: kk || ru });

async function seed() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(uri);
  console.log('Connected!');

  // --- 1. LEADERS ---
  const leaders = [
    { slug: 'odile-renaud-basso', name: resolve('Одиль Рено-Бассо', 'Odile Renaud-Basso'), role: resolve('Президент EBRD', 'President, EBRD'), photo: '/img/plenary/Одиль Рено-Бассо.jpg', sessions: [1,2,3], type: 'intl', sort_order: 1 },
    { slug: 'kirsty-wilson', name: resolve('Кирсти Уилсон', 'Kirsty Wilson'), role: resolve('Зам. председателя Baker McKenzie', 'Deputy Chair, Baker McKenzie'), photo: '/img/plenary/Кирсти Уилсон.jpg', sessions: [1,3], type: 'corp', sort_order: 2 },
    { slug: 'antonella-bassani', name: resolve('Антонелла Бассани', 'Antonella Bassani'), role: resolve('Вице-президент Всемирного банка', 'VP, World Bank Europe & CA'), photo: '/img/plenary/Антонелла Бассани.jpeg', sessions: [1], type: 'intl', sort_order: 3 },
    { slug: 'julie-monaco', name: resolve('Джули Монако', 'Julie Monaco'), role: resolve('Управляющий директор Citi', 'Managing Director, Citi'), photo: '/img/plenary/Джули Монако.png', sessions: [1], type: 'corp', sort_order: 4 },
    { slug: 'aida-balayeva', name: resolve('Аида Балаева', 'Aida Balayeva'), role: resolve('Зам. Руководителя Администрации Президента РК', 'Deputy Head, Presidential Administration'), photo: '/img/plenary/Аида Балаева.webp', sessions: [1,2], type: 'govt', sort_order: 5 },
    { slug: 'elvira-azimova', name: resolve('Эльвира Азимова', 'Elvira Azimova'), role: resolve('Председатель Конституционного Суда РК', 'Chair, Constitutional Court of Kazakhstan'), photo: '/img/plenary/Эльвира Азимова.jpg', sessions: [1,2], type: 'govt', sort_order: 6 },
    { slug: 'azhar-giniyat', name: resolve('Ажар Гиният', 'Azhar Giniyat'), role: resolve('Министр здравоохранения РК', 'Minister of Healthcare, Kazakhstan'), photo: '/img/plenary/Ажар Гиният.jpg', sessions: [1,2], type: 'govt', sort_order: 7 },
    { slug: 'tamara-duissenova', name: resolve('Тамара Дуйсенова', 'Tamara Duissenova'), role: resolve('Министр труда и социальной защиты РК', 'Minister of Labour, Kazakhstan'), photo: '/img/plenary/Тамара Дуйсенова.jpeg', sessions: [1], type: 'govt', sort_order: 8 },
    { slug: 'gauhar-buribayeva', name: resolve('Гаухар Бурибаева', 'Gauhar Buribayeva'), role: resolve('Председатель Правления Фонда «Даму»', 'CEO, Damu Entrepreneurship Development Fund'), photo: '/img/plenary/Гаухар Бурибаева.jpg', sessions: [1], type: 'govt', sort_order: 9 },
    { slug: 'katarzyna-wawiernia', name: resolve('Катаржина Вавьерниа', 'Katarzyna Wawiernia'), role: resolve('Постоянный представитель ПРООН в РК', 'UNDP Resident Representative'), photo: '/img/plenary/Катаржина Вавьерниа.jpg', sessions: [2], type: 'intl', sort_order: 10 },
    { slug: 'michel-simmons', name: resolve('Мишель Симмонс', 'Michel Simmons'), role: resolve('Президент Microsoft в ЦЕ и ЦА', 'President, Microsoft CE & CA'), photo: '/img/plenary/Мишель Симмонс.jpg', sessions: [2], type: 'corp', sort_order: 11 },
    { slug: 'marine-babayan', name: resolve('Марине Бабаян', 'Marine Babayan'), role: resolve('Директор по корпоративным связям VEON', 'Global Director of Corporate Affairs, VEON'), photo: '/img/plenary/Марине Бабаян.jpg', sessions: [2,3], type: 'corp', sort_order: 12 },
    { slug: 'akmaral-alnazarova', name: resolve('Акмарал Альназарова', 'Akmaral Alnazarova'), role: resolve('Министр труда и социальной защиты РК', 'Minister of Labour, Kazakhstan'), photo: '/img/plenary/Акмарал Альназарова.jpg', sessions: [2], type: 'govt', sort_order: 13 },
    { slug: 'erbek-kosherbayev', name: resolve('Ербек Кошербаев', 'Erbek Kosherbayev'), role: resolve('Аким города Астана', 'Akim of Astana'), photo: '/img/plenary/Ербек Кошербаев.jpg', sessions: [2], type: 'govt', sort_order: 14 },
    { slug: 'emilie-mouran-renouard', name: resolve('Эмили Муран-Ренуар', 'Émilie Mouran-Renouard'), role: resolve('Вице-президент Air Liquide', 'Vice President, Air Liquide'), photo: '/img/plenary/Эмили Муран-Ренуар.png', sessions: [3], type: 'corp', sort_order: 15 },
    { slug: 'assel-zhanassova', name: resolve('Асель Жанасова', 'Assel Zhanassova'), role: resolve('Советник Президента РК', 'Advisor to the President'), photo: '/img/plenary/Асель Жанасова.jpg', sessions: [3], type: 'govt', sort_order: 16 },
    { slug: 'dinara-shcheglova', name: resolve('Динара Щеглова', 'Dinara Shcheglova'), role: resolve('Вице-министр науки и высшего образования РК', 'Vice Minister of Science'), photo: '/img/plenary/Динара Щеглова.jpg', sessions: [3], type: 'govt', sort_order: 17 },
  ];

  for (const l of leaders) {
    await Leader.findOneAndUpdate({ slug: l.slug }, { ...l, published: true }, { upsert: true });
  }
  console.log('Leaders seeded');

  // --- 2. PARTNERS ---
  const partnersData = [
    { type: 'intl', items: [['EBRD', 'European Bank for Reconstruction and Development'], ['World Bank', 'World Bank'], ['UNDP', 'United Nations Development Programme'], ['ADB', 'Asian Development Bank'], ['IFC', 'International Finance Corporation'], ['IsDB', 'Islamic Development Bank'], ['GGGI', 'Global Green Growth Institute'], ['UN Women', 'UN Women'], ['OSCE', 'OSCE'], ['AIIB', 'AIIB'], ['ILO', 'ILO']] },
    { type: 'corp', items: [['Baker McKenzie', 'Baker McKenzie International'], ['Citi', 'Citigroup'], ['VISA', 'Visa Inc.'], ['Microsoft', 'Microsoft Corporation'], ['Air Liquide', 'Air Liquide S.A.'], ['VEON', 'VEON Group'], ['Baker Hughes', 'Baker Hughes Company'], ['Polpharma', 'Polpharma Group'], ['Chevron', 'Chevron Corporation'], ['Shell', 'Shell plc'], ['ExxonMobil', 'ExxonMobil Corporation'], ['Alstom', 'Alstom S.A.']] },
    { type: 'natl', items: [['Нацкомиссия', 'National Commission on Womens Affairs'], ['Конституционный суд', 'Constitutional Court of Kazakhstan'], ['Министерство труда', 'Ministry of Labour'], ['Минздрав', 'Ministry of Healthcare'], ['Минкульт', 'Ministry of Culture'], ['МЦРИАП', 'Ministry of Digital Development'], ['Миннауки', 'Ministry of Science'], ['АРРФР', 'Agency for Financial Market'], ['Halyk Bank', 'Halyk Bank'], ['Даму', 'Damu Fund'], ['Citibank KZ', 'Citibank Kazakhstan'], ['AIFC', 'AIFC']] },
    { type: 'inst', items: [['Атамекен', 'NCE Atameken'], ['КазНУИ', 'Kazakh National University of Arts'], ['АГУ', 'Academy of Public Administration']] }
  ];

  let pCount = 0;
  for (const group of partnersData) {
    for (const [name, fullName] of group.items) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      await Partner.findOneAndUpdate({ slug }, {
        slug,
        name,
        full: resolve(fullName),
        type: group.type,
        published: true,
        sort_order: pCount++
      }, { upsert: true });
    }
  }
  console.log('Partners seeded');

  // --- 3. INITIATIVES ---
  const initiatives = [
    { slug: 'g-index-initiative', tag: resolve('Рейтинговая система', 'Rating System'), title: resolve('G-Index Initiative'), desc: resolve('Международная система оценки готовности women-led предприятий к масштабированию.', 'International rating system to assess the readiness of women-led enterprises.') },
    { slug: 'g-index-hub', tag: resolve('Цифровая платформа', 'Digital Platform'), title: resolve('G-Index Hub'), desc: resolve('Единая цифровая инфраструктура: сертификация, реестр верифицированных поставщиков.', 'Unified digital infrastructure: certification, verified supplier registry.') },
    { slug: 'g-index-academy', tag: resolve('Образование', 'Education'), title: resolve('G-Index Academy'), desc: resolve('Программы наращивания потенциала для предпринимательниц.', 'Capacity building programmes for women entrepreneurs.') },
    { slug: 'it-aiel', tag: resolve('Технологии', 'Technology'), title: resolve('IT-AIEL'), desc: resolve('Развитие цифровых компетенций в странах-партнёрах.', 'Developing digital competencies in partner countries.') },
    { slug: 'social-initiatives', tag: resolve('Общество', 'Society'), title: resolve('Социальные инициативы'), desc: resolve('Поддержка уязвимых групп населения.', 'Support for vulnerable groups.') },
    { slug: 'cultural-initiatives', tag: resolve('Культура', 'Culture'), title: resolve('Культурные инициативы'), desc: resolve('Международный культурный диалог и дипломатия.', 'International cultural dialogue and diplomacy.') }
  ];

  for (const i of initiatives) {
    await Initiative.findOneAndUpdate({ slug: i.slug }, { ...i, published: true }, { upsert: true });
  }
  console.log('Initiatives seeded');

  // --- 4. PAGES ---
  const homeContent = {
    hero: {
      slides: [
        { videoId: 'HvmRX-bCl5Y', title: resolve('Opening GBWC'), tag: resolve('GBWC · Institutional Platform'), lines: [resolve('Global'), resolve('Businesswomen'), resolve('Council —'), resolve('Институциональная'), resolve('платформа')] },
        { videoId: 'yLAvCrhiRwM', title: resolve('I Пленарное заседание'), tag: resolve('Astana · 2023'), lines: [resolve('Инфраструктура'), resolve('развития'), resolve('women-led'), resolve('бизнеса')] }
      ]
    },
    about: {
      label: resolve('О платформе', 'About the Platform'),
      title: resolve('GBWC — международная платформа стратегического диалога', 'GBWC — an international platform for strategic dialogue'),
      p1: resolve('GBWC объединяет женщин-лидеров бизнеса и институты власти.', 'GBWC unites women business leaders and government bodies.'),
      p2: resolve('Платформа создаёт условия для совместных инициатив.', 'The platform builds a foundation for joint initiatives.'),
      p3: resolve('Более 15 организаций из 13+ стран ежегодно.', 'More than 15 organizations from 13+ countries annually.'),
      cta: resolve('О Совете', 'About the Council'),
      quote: resolve('«Пространство для диалога»', '"Space for dialogue"'),
      stats: [
        { num: '15+', label: resolve('Стран') }, { num: '3', label: resolve('Заседания') }, { num: '15+', label: resolve('Партнёров') }, { num: '7', label: resolve('Проектов') }
      ]
    },
    directions: {
      sectionLabel: resolve('Направления', 'Directions'),
      sectionTitle: resolve('Ключевые направления работы'),
      sectionSubtext: resolve('Четыре основных вектора развития.'),
      items: [
        { title: resolve('Дипломатия'), desc: resolve('Стратегический диалог.') },
        { title: resolve('Предпринимательство'), desc: resolve('Масштабирование бизнеса.') },
        { title: resolve('Инвестиции'), desc: resolve('Социальные проекты.') },
        { title: resolve('Культура'), desc: resolve('Межнациональный диалог.') }
      ]
    }
  };

  await Page.findOneAndUpdate({ key: 'home' }, { content: homeContent }, { upsert: true });
  console.log('Home page seeded');

  console.log('--- ALL SEEDED SUCCESSFULLY ---');
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
