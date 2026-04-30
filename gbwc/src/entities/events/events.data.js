/**
 * entities/events/events.data.js
 * All plenary session data — extracted from Events page.
 */
const P = (name) => `/img/plenary/${name}`

export const PERSONS = {
  odile:     P('Одиль Рено-Бассо.jpg'),
  michel:    P('Мишель Симмонс.jpg'),
  elvira:    P('Эльвира Азимова.jpg'),
  tamara:    P('Тамара Дуйсенова.jpeg'),
  emily:     P('Эмили Муран-Ренуар.png'),
  antonella: P('Антонелла Бассани.jpeg'),
  aida_bal:  P('Аида Балаева.webp'),
  azar:      P('Ажар Гиният.jpg'),
  akmaral:   P('Акмарал Альназарова.jpg'),
  gauhar:    P('Гаухар Бурибаева.jpg'),
  julie:     P('Джули Монако.png'),
  kirsti:    P('Кирсти Уилсон.jpg'),
  marine:    P('Марине Бабаян.jpg'),
  erbek:     P('Ербек Кошербаев.jpg'),
  katarzyna: P('Катаржина Вавьерниа.jpg'),
}

export const SESSIONS = [
  {
    id: 1, numeral: 'I', year: '2023',
    date:     { ru: '7 июня 2023',     en: 'June 7, 2023',      kk: '2023 жылғы 7 маусым' },
    location: { ru: 'Hilton Astana, Астана', en: 'Hilton Astana, Astana', kk: 'Hilton Astana, Астана' },
    context:  { ru: 'В рамках 35-го заседания КСИ при Президенте РК', en: 'As part of the 35th FIC Plenary Session', kk: 'ҚСИ 35-ші отырысы аясында' },
    theme:    { ru: 'Новые возможности для бизнеса и инвестиций в меняющейся реальности', en: 'New Opportunities for Business and Investment in a Changing Reality', kk: 'Өзгермелі шындықтағы бизнес пен инвестицияның жаңа мүмкіндіктері' },
    desc:     { ru: 'Первое пленарное заседание GBWC в Астане в рамках 35-го Пленарного заседания СИИ. 22 участника из числа руководителей EBRD, Всемирного банка, Citi, VISA, ОБСЕ и высших должностных лиц Казахстана.', en: 'First plenary session at the 35th FIC Plenary. 22 participants including EBRD President, World Bank VP, Citi, VISA and senior Kazakhstani officials.', kk: 'ҚСИ 35-ші отырысы аясында бірінші пленарлық отырыс. 22 қатысушы.' },
    members: [
      { name: 'Одиль Рено-Бассо',    title: { ru: 'Президент EBRD, Член КСИ', en: 'President of EBRD, FIC Member', kk: 'ЕҚДБ президенті, ҚСИ мүшесі' }, photo: PERSONS.odile },
      { name: 'Кирсти Уилсон',       title: { ru: 'Зам. председателя Baker McKenzie', en: 'Deputy Chair Baker McKenzie', kk: 'Baker McKenzie вице-төрайымы' }, photo: PERSONS.kirsti },
      { name: 'Антонелла Бассани',   title: { ru: 'Вице-президент Всемирного банка', en: 'VP World Bank, Europe & CA', kk: 'Дүниежүзілік банк VP' }, photo: PERSONS.antonella },
      { name: 'Джули Монако',        title: { ru: 'Управляющий директор Citi', en: 'MD Citi, Global Head Public Sector', kk: 'Citi MD' }, photo: PERSONS.julie },
      { name: 'Маргарета Седерфельт', title: { ru: 'Председатель ПА ОБСЕ', en: 'President, OSCE Parliamentary Assembly', kk: 'ЕҚЫҰ ПА Президенті' }, photo: null },
    ],
    guests: [
      { name: 'Аида Балаева',   title: { ru: 'Зам. Руководителя Администрации Президента РК', en: 'Deputy Head, Presidential Administration', kk: 'ҚР Президенті Әкімшілігінің жетекшісі орынбасары' }, photo: PERSONS.aida_bal },
      { name: 'Эльвира Азимова', title: { ru: 'Председатель Конституционного Суда РК', en: 'Chair, Constitutional Court', kk: 'ҚР Конституциялық Соты Төрайымы' }, photo: PERSONS.elvira },
      { name: 'Ажар Гиният',    title: { ru: 'Министр здравоохранения РК', en: 'Minister of Healthcare', kk: 'ҚР Денсаулық сақтау министрі' }, photo: PERSONS.azar },
      { name: 'Тамара Дуйсенова', title: { ru: 'Министр труда и социальной защиты РК', en: 'Minister of Labour', kk: 'ҚР Еңбек министрі' }, photo: PERSONS.tamara },
      { name: 'Гаухар Бурибаева', title: { ru: 'Председатель Правления Фонда «Даму»', en: 'CEO, Damu Fund', kk: '«Даму» қоры Басқарма Төрайымы' }, photo: PERSONS.gauhar },
    ],
    topics: { ru: ['Развитие предпринимательства', 'Международное сотрудничество', 'Участие женщин в глобальной экономике', 'Устойчивые бизнес-модели'], en: ['Entrepreneurship development', 'International cooperation', 'Women in global economy', 'Sustainable business models'], kk: ['Кәсіпкерлікті дамыту', 'Халықаралық ынтымақтастық', 'Әйелдердің жаһандық экономикаға қатысуы', 'Тұрақты бизнес-модельдер'] },
    results: { ru: ['Создан Глобальный совет Женщин Бизнеса (GBWC)', 'Определены ключевые векторы деятельности Совета', 'Объединение участниц из 13+ стран'], en: ['Establishment of the Global Businesswomen Council (GBWC)', 'Defining the Council key activities', 'Uniting participants from 13+ countries'], kk: ['Global Businesswomen Council (GBWC) құрылды', 'Кеңес қызметінің негізгі бағыттары айқындалды', '13+ елден қатысушыларды біріктіру'] },
    gallery: 'https://drive.google.com/drive/folders/1mfhdh4KN7XRiAzeHWIbarSwrG2Kxr9Fs',
    video: 'https://youtu.be/yLAvCrhiRwM',
    localPhotos: [P('plenar1_5_main.jpg'), P('plenar1_2.jpg'), P('plenar1_3.jpg'), P('plenar1_6.jpg'), P('plenar1_7.jpg'), P('IMG_1924.jpg'), P('IMG_1929.jpg'), P('IMG_1950.jpg'), P('IMG_2758.jpg'), P('IMG_3000.jpg'), P('IMG_1823.jpg'), P('IMG_1858.jpg'), P('IMG_1887.jpg'), P('IMG_1906.jpg'), P('IMG_1916.jpg'), P('IMG_1858(1).jpg')],
  },
  {
    id: 2, numeral: 'II', year: '2024',
    date:     { ru: '31 октября 2024', en: 'October 31, 2024', kk: '2024 жылғы 31 қазан' },
    location: { ru: 'Дворец Независимости, Астана', en: 'Palace of Independence, Astana', kk: 'Тәуелсіздік сарайы, Астана' },
    context:  { ru: 'Дворец Независимости, Астана', en: 'Palace of Independence, Astana', kk: 'Тәуелсіздік сарайы, Астана' },
    theme:    { ru: 'Зелёные и социальные инвестиции. Развитие МСП', en: 'Green and Social Investments. SME Development', kk: 'Жасыл және әлеуметтік инвестициялар. ШОБ-ты дамыту' },
    desc:     { ru: 'Второе пленарное заседание во Дворце Независимости. ЕБРР, ПРООН, Microsoft, Baker Hughes, Polpharma и высшие должностные лица Казахстана.', en: 'Second session at Palace of Independence. EBRD, UNDP, Microsoft, Baker Hughes, Polpharma and senior officials.', kk: 'Тәуелсіздік сарайындағы екінші пленарлық отырыс.' },
    members: [
      { name: 'Одиль Рено-Бассо',   title: { ru: 'Президент EBRD', en: 'President EBRD', kk: 'ЕҚДБ президенті' }, photo: PERSONS.odile },
      { name: 'Катаржина Вавьерниа', title: { ru: 'Постоянный представитель ПРООН в РК', en: 'UNDP Resident Representative', kk: 'БҰҰДБ тұрақты өкілі' }, photo: PERSONS.katarzyna },
      { name: 'Мишель Симмонс',     title: { ru: 'Президент Microsoft в ЦЕ и ЦА', en: 'President Microsoft CE & CA', kk: 'Microsoft президенті' }, photo: PERSONS.michel },
    ],
    guests: [
      { name: 'Акмарал Альназарова', title: { ru: 'Министр труда и социальной защиты РК', en: 'Minister of Labour', kk: 'ҚР Еңбек министрі' }, photo: PERSONS.akmaral },
      { name: 'Ажар Гиният',         title: { ru: 'Министр здравоохранения РК', en: 'Minister of Healthcare', kk: 'ҚР Денсаулық сақтау министрі' }, photo: PERSONS.azar },
      { name: 'Ербек Кошербаев',     title: { ru: 'Аким города Астана', en: 'Akim of Astana', kk: 'Астана қаласының Әкімі' }, photo: PERSONS.erbek },
    ],
    topics: { ru: ['Зеленая экономика и развитие', 'Социальные инвестиции как фактор роста', 'Поддержка женского предпринимательства', 'Цифровая трансформация бизнеса'], en: ['Green economy and development', 'Social investments as a growth factor', 'Support for women entrepreneurship', 'Business digital transformation'], kk: ['Жасыл экономика және даму', 'Әлеуметтік инвестициялар', 'Әйелдер кәсіпкерлігін қолдау', 'Бизнесті цифрлық трансформациялау'] },
    results: { ru: ['GBWC стал оператором проекта Центров поддержки семьи', 'Подписаны меморандумы для реализации социальных программ', 'Запущена разработка рейтинговой системы G-Index'], en: ['GBWC became operator of pilot Family Support Centres', 'MoUs signed for social programmes implementation', 'G-Index rating system development launched'], kk: ['GBWC Отбасын қолдау орталықтарының операторы болды', 'Әлеуметтік бағдарламаларды жүзеге асыру үшін меморандумдарға қол қойылды', 'G-Index рейтингтік жүйесін әзірлеу басталды'] },
    gallery: 'https://drive.google.com/drive/folders/1D08SX_DEy_9AyGVqJiNr_OQ4RFpEVPRH',
    video: 'https://www.youtube.com/watch?v=c8zthz-qD8Y',
    localPhotos: [P('plenar2_6.jpg'), P('plenar2_3.jpg'), P('plenar2_4.jpg'), P('plenar2_7.jpg'), P('plenar2_9.jpg'), P('IMG_2761.jpg'), P('IMG_2780.jpg'), P('IMG_2781.jpg'), P('IMG_2785.jpg'), P('IMG_2789.jpg'), P('IMG_2792.jpg'), P('IMG_2801.jpg'), P('IMG_2821.jpg'), P('IMG_2918.jpg'), P('IMG_2926.jpg'), P('IMG_2951.jpg'), P('IMG_2963.jpg'), P('IMG_2970.jpg')],
  },
  {
    id: 3, numeral: 'III', year: '2025',
    date:     { ru: '24 июня 2025', en: 'June 24, 2025', kk: '2025 жылғы 24 маусым' },
    location: { ru: 'Астана, Казахстан', en: 'Astana, Kazakhstan', kk: 'Астана, Қазақстан' },
    context:  { ru: 'Астана, Казахстан', en: 'Astana, Kazakhstan', kk: 'Астана, Қазақстан' },
    theme:    { ru: 'Социальные инвестиции глазами женщин-лидеров', en: 'Social Investments Through the Eyes of Women Leaders', kk: 'Әйел-көшбасшылардың көзімен әлеуметтік инвестициялар' },
    desc:     { ru: 'Третье пленарное заседание GBWC. Подписаны меморандумы с тремя министерствами РК. Baker McKenzie и Air Liquide в числе участников.', en: 'Third GBWC plenary session. MoUs signed with three Kazakhstan ministries. Baker McKenzie and Air Liquide among participants.', kk: 'GBWC үшінші пленарлық отырысы. ҚР үш министрлігімен меморандумдарға қол қойылды.' },
    members: [
      { name: 'Одиль Рено-Бассо', title: { ru: 'Президент EBRD', en: 'President EBRD', kk: 'ЕҚДБ президенті' }, photo: PERSONS.odile },
      { name: 'Кирсти Уилсон',    title: { ru: 'Зам. председателя Baker McKenzie', en: 'Deputy Chair Baker McKenzie', kk: 'Baker McKenzie вице-төрайымы' }, photo: PERSONS.kirsti },
      { name: 'Эмили Муран-Ренуар', title: { ru: 'Вице-президент Air Liquide', en: 'Vice President Air Liquide', kk: 'Air Liquide вице-президенті' }, photo: PERSONS.emily },
    ],
    guests: [],
    topics: { ru: ['Социальные инвестиции', 'Роль женщин в экономике', 'Государственно-частное партнёрство', 'Устойчивое развитие'], en: ['Social investments', "Women's role in economy", 'Public-private partnership', 'Sustainable development'], kk: ['Әлеуметтік инвестициялар', 'Әйелдердің экономикадағы рөлі', 'Мемлекеттік-жеке серіктестік', 'Тұрақты даму'] },
    results: { ru: ['Подписаны меморандумы с тремя министерствами РК', 'Согласована совместная реализация цифровых и образовательных инициатив', 'Инициирован проект культурного обмена (выступление в Ватикане)'], en: ['MoUs signed with three Kazakhstan ministries', 'Joint implementation of digital and educational initiatives agreed', 'Cultural exchange project initiated (choir performance at the Vatican)'], kk: ['ҚР үш министрлігімен меморандумдарға қол қойылды', 'Цифрлық және білім беру бастамаларын бірлесіп жүзеге асыру келісілді', 'Мәдени алмасу жобасы басталды (Ватиканда өнер көрсету)'] },
    gallery: 'https://drive.google.com/drive/folders/1OiC9IXFBmjjzSKuPcA5yiAhYx5cH3B5c',
    video: null,
    localPhotos: [P('IMG_5435.jpg'), P('IMG_5441.jpg'), P('IMG_5449-2.jpg'), P('IMG_5454.jpg'), P('IMG_5498-2.jpg'), P('IMG_5537.jpg'), P('IMG_5540-2.jpg'), P('IMG_5556.jpg'), P('IMG_5843.jpg'), P('IMG_5970.jpg'), P('IMG_5993.jpg'), P('IMG_6030-2.jpg'), P('IMG_6038.jpg'), P('IMG_6060.jpg')],
  },
]

export const EVENTS_LABELS = {
  ru: { eyebrow: 'GBWC', heroTitle: 'Пленарные заседания', heroDesc: 'Основной формат деятельности Совета — международные пленарные заседания, объединяющие лидеров бизнеса, государственных деятелей и представителей международных организаций.', members: 'Члены совета', guests: 'Приглашённые гости', topics: 'Темы обсуждения', results: 'Ключевые результаты', gallery: 'Фотогалерея', video: 'Видео', photos: 'Фотографии', noPhoto: 'Перейти в галерею' },
  en: { eyebrow: 'GBWC', heroTitle: 'Plenary Sessions', heroDesc: "The Council's main format — international plenary sessions bringing together business leaders, government officials and representatives of international organisations.", members: 'Council Members', guests: 'Invited Guests', topics: 'Discussion Topics', results: 'Key Outcomes', gallery: 'Photo Gallery', video: 'Video', photos: 'Photos', noPhoto: 'View Gallery' },
  kk: { eyebrow: 'GBWC', heroTitle: 'Пленарлық отырыстар', heroDesc: 'Кеңестің негізгі форматы — бизнес-лидерлерді, мемлекеттік қайраткерлерді және халықаралық ұйымдар өкілдерін біріктіретін пленарлық отырыстар.', members: 'Кеңес мүшелері', guests: 'Шақырылған қонақтар', topics: 'Талқылау тақырыптары', results: 'Негізгі нәтижелер', gallery: 'Фотогалерея', video: 'Бейне', photos: 'Фотосуреттер', noPhoto: 'Галереяға өту' },
}
