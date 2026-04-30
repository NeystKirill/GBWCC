import 'dotenv/config'
import mongoose from 'mongoose'
import Page from './models/Page.js'

import { ABOUT_CONTENT } from '../../src/entities/about/about.data.js'
import { INITIATIVES_CONTENT } from '../../src/entities/initiatives/initiatives.data.js'

import { CONTACTS_CONTENT } from '../../src/entities/contacts/contacts.data.js'

import { EVENTS_LABELS } from '../../src/entities/events/events.data.js'

const ru = (obj, key) => obj?.ru?.[key] || '';
const mapToText = (arr) => Array.isArray(arr) ? arr.map(text => ({ text })) : []

const PAGES_BLOCKS = {
  home: {
    blocks: [
      { id: 'h1', type: 'VideoHero', data: {} },
      { id: 'h2', type: 'HomeAbout', data: { 
          label: 'О ПЛАТФОРМЕ',
          title: 'Global Businesswomen Council — международная платформа стратегического диалога',
          p1: 'GBWC объединяет женщин-лидеров бизнеса, представителей государственных институтов, международных организаций и экспертного сообщества для развития инклюзивной мировой экономики.',
          p2: 'Платформа создаёт институциональные условия для диалога, партнёрства и совместных инициатив на глобальном уровне.',
          p3: 'С 2023 года GBWC провела три пленарных заседания с участием более 15 организаций из 13+ стран, объединив государственных деятелей, корпорации и экспертное сообщество.',
          cta: 'Подробнее о Совете',
          quote: '«Мы формируем пространство для диалога, где женщины-лидеры могут влиять на глобальную повестку»',
          reverseLayout: false
      } },
      { id: 'h3', type: 'Sep', data: {} },
      { id: 'h4', type: 'HomeQuote', data: {
          eyebrow: 'НАША МИССИЯ',
          title: 'Строить мосты между лидерами',
          lead: 'GBWC — это международная платформа, где женщины-лидеры в бизнесе, государственных институтах и международных организациях встречаются для диалога, обмена опытом и совместных инициатив.',
          quote: '«Мы создаём пространство, где лидеры могут влиять на глобальную повестку и формировать инклюзивное будущее мировой экономики.»',
          author: 'Жанна Байдашева',
          role: 'Основатель GBWC',
          pillars: [
            { icon: '◆', label: 'Диалог', text: 'Нейтральное пространство для честного и стратегического обмена между государством, бизнесом и международными организациями.' },
            { icon: '◈', label: 'Партнёрство', text: 'Долгосрочные партнёрства между корпорациями, финансовыми институтами и государственными структурами.' },
            { icon: '◉', label: 'Влияние', text: 'Формирование рекомендаций и инициатив, которые становятся частью реальной повестки на национальном и международном уровне.' },
          ]
      } },
      { id: 'h5', type: 'HomeStats', data: {
          items: [
            { n:15, sx:'+', label:'Стран-участниц', desc:'Азия, Европа, СНГ и Ближний Восток' },
            { n:3, sx:'+', label:'Пленарных заседаний', desc:'Диалог на высшем уровне 2023–2025' },
            { n:15, sx:'+', label:'Партнёров', desc:'Транснациональные корпорации и институты' },
            { n:7, sx:'+', label:'Инициатив и проектов', desc:'Стратегические социальные программы' }
          ]
      } },
      { id: 'h6', type: 'Sep', data: {} },
      { id: 'h7', type: 'HomeDirections', data: {
          sectionLabel: 'НАПРАВЛЕНИЯ',
          sectionTitle: 'Ключевые направления деятельности',
          sectionSubtext: 'Стратегические инициативы GBWC охватывают пять ключевых сфер развития международного сотрудничества',
          items: [
            { title: 'Аналитика и экспертиза', desc: 'Развитие аналитических инструментов оценки предпринимательского климата' },
            { title: 'Образование и развитие', desc: 'Программы профессионального развития и наставничества' },
            { title: 'Партнёрство и диалог', desc: 'Международное сотрудничество между государством, бизнесом и организациями' },
            { title: 'Социальные проекты', desc: 'Центры поддержки семьи и социальные программы' },
          ]
      } },
      { id: 'h8', type: 'Sep', data: {} },
      { id: 'h9', type: 'HomePlenary', data: {
          sectionLabel: 'СЕССИИ',
          sectionTitle: 'Пленарные заседания',
          text: 'Ключевые дискуссии и решения в рамках международных форумов. Актуальная повестка и глобальные инициативы по развитию женского предпринимательства.',
          link: 'Смотреть все материалы',
          sessions: [
            { 
              year: '2023', title: 'Женщины в мировой экономике', desc: 'Первое заседание',
              topics: mapToText(['Развитие предпринимательства', 'Международное сотрудничество', 'Участие женщин в глобальной экономике', 'Устойчивые бизнес-модели']),
              results: mapToText(['Создан Глобальный совет Женщин Бизнеса (GBWC)', 'Определены ключевые векторы деятельности Совета', 'Объединение участниц из 13+ стран'])
            },
            { 
              year: '2024', title: 'Инвестиции в человеческий капитал', desc: 'Второе заседание',
              topics: mapToText(['Зеленая экономика и развитие', 'Социальные инвестиции как фактор роста', 'Поддержка женского предпринимательства', 'Цифровая трансформация бизнеса']),
              results: mapToText(['GBWC стал оператором проекта Центров поддержки семьи', 'Подписаны меморандумы для реализации социальных программ', 'Запущена разработка рейтинговой системы G-Index'])
            },
            { 
              year: '2025', title: 'Глобальное партнёрство для роста', desc: 'Третье заседание',
              topics: mapToText(['Социальные инвестиции', 'Роль женщин в экономике', 'Государственно-частное партнёрство', 'Устойчивое развитие']),
              results: mapToText(['Подписаны меморандумы с тремя министерствами РК', 'Согласована реализация цифровых и образовательных инициатив', 'Инициирован проект культурного обмена (выступление в Ватикане)'])
            }
          ]
      } },
      { id: 'h10', type: 'Sep', data: {} },
      { id: 'h11', type: 'HomeKeyPeople', data: {
          sectionLabel: 'ЛИДЕРЫ',
          sectionTitle: 'Участники Совета',
          ctaText: 'Лидеры бизнеса, эксперты и политики, объединяющие усилия для достижения общих целей',
          btnText: 'Узнать больше',
          people: [
            { name: 'Одиль Рено-Бассо', title: 'Президент EBRD', org: 'EBRD', photo: '/img/plenary/Одиль Рено-Бассо.jpg', type: 'intl' },
            { name: 'Кирсти Уилсон', title: 'Зам. председателя Baker McKenzie', org: 'Baker McKenzie', photo: '/img/plenary/Кирсти Уилсон.jpg', type: 'corp' },
            { name: 'Антонелла Бассани', title: 'Вице-президент Всемирного банка', org: 'World Bank', photo: '/img/plenary/Антонелла Бассани.jpeg', type: 'intl' },
            { name: 'Джули Монако', title: 'Управляющий директор Citi', org: 'Citi', photo: '/img/plenary/Джули Монако.png', type: 'corp' },
            { name: 'Аида Балаева', title: 'Зам. Руководителя Администрации Президента РК', org: 'Администрация Президента РК', photo: '/img/plenary/Аида Балаева.webp', type: 'govt' },
            { name: 'Эльвира Азимова', title: 'Председатель Конституционного Суда РК', org: 'Конституционный Суд РК', photo: '/img/plenary/Эльвира Азимова.jpg', type: 'govt' },
            { name: 'Ажар Гиният', title: 'Министр здравоохранения РК', org: 'Министерство здравоохранения РК', photo: '/img/plenary/Ажар Гиният.jpg', type: 'govt' },
            { name: 'Мишель Симмонс', title: 'Президент Microsoft в ЦЕ и ЦА', org: 'Microsoft', photo: '/img/plenary/Мишель Симмонс.jpg', type: 'corp' },
          ]
      } },
      { id: 'h12', type: 'Sep', data: {} },
      { id: 'h13', type: 'HomeInitiatives', data: {
          sectionLabel: 'ИНИЦИАТИВЫ',
          sectionTitle: 'Наши инициативы',
          supportTitle: 'Шесть направлений деятельности GBWC — от аналитики и образования до культурной дипломатии',
          allBtn: 'Все инициативы',
          items: [
            { id: 'gindex', tag: 'Аналитика & Институт', title: 'G-Index Initiative', desc: 'Институциональная инициатива по развитию аналитических инструментов и программ поддержки предпринимательства женщин.' },
            { id: 'hub', tag: 'Инфраструктура', title: 'G-Index Hub', desc: 'Аналитический, экспертный и координационный центр. Цифровая платформа hub.gbwc.org.' },
            { id: 'academy', tag: 'Образование', title: 'G-Index Academy', desc: 'Образовательные программы профессионального развития.' },
            { id: 'itaiel', tag: 'Цифровые навыки', title: 'Цифровые компетенции', desc: 'Развитие цифровых компетенций и технологических навыков женщин-предпринимателей.' },
            { id: 'social', tag: 'Социальные проекты', title: 'Центры поддержки семьи', desc: 'Оператор пилотных Центров поддержки семьи в регионах Казахстана.' },
            { id: 'culture', tag: 'Культурная дипломатия', title: 'Культурные инициативы', desc: 'Международные культурные проекты.' },
          ]
      } },
      { id: 'h14', type: 'Sep', data: {} },
      { id: 'h15', type: 'HomePartners', data: {
          sectionLabel: 'ПАРТНЕРЫ',
          sectionTitle: 'Партнеры и участники',
          sectionSubtext: 'Глобальная сеть организаций, поддерживающих инициативы Совета по всему миру',
          intlLbl: 'Международные',
          corpLbl: 'Корпоративные',
          natlLbl: 'Национальные'
      } },
      { id: 'h16', type: 'Sep', data: {} },
      { id: 'h17', type: 'HomeCoop', data: {
          label: 'СОТРУДНИЧЕСТВО',
          title: 'Стать частью сообщества',
          text: 'Присоединяйтесь к инициативам Глобального Совета женщин-руководителей. Откройте новые возможности для развития бизнеса и международных партнерств.',
          btn1: 'Связаться с нами',
          btn2: 'Стать партнером',
          tags: [
            { text: 'International Organisations' },
            { text: 'Государственные институты' },
            { text: 'Корпорации' },
            { text: 'Финансовые институты' },
            { text: 'Экспертное сообщество' },
          ]
      } }
    ]
  },
  about: {
    blocks: [
      { id: 'a1', type: 'Hero', data: { 
          title: ru(ABOUT_CONTENT, 'heroTitle'), 
          desc: ru(ABOUT_CONTENT, 'heroDesc'), 
          label: ru(ABOUT_CONTENT, 'heroEye') 
        } 
      },
      { id: 'a2', type: 'AboutMandate', data: {
          eyebrow: ru(ABOUT_CONTENT, 'mandateEye'),
          title: ru(ABOUT_CONTENT, 'mandateTitle'),
          paragraphs: mapToText(ru(ABOUT_CONTENT, 'mandateParas')),
          cards: ru(ABOUT_CONTENT, 'asideCards'),
        }
      },
      { id: 'a3', type: 'AboutDirections', data: {
          eyebrow: ru(ABOUT_CONTENT, 'dirEye'),
          title: ru(ABOUT_CONTENT, 'dirTitle'),
          items: ru(ABOUT_CONTENT, 'dirs'),
        }
      },
      { id: 'a4', type: 'AboutTimeline', data: {
          eyebrow: ru(ABOUT_CONTENT, 'timelineEye'),
          title: ru(ABOUT_CONTENT, 'timelineTitle'),
          items: ru(ABOUT_CONTENT, 'timeline'),
        }
      },
      { id: 'a5', type: 'AboutPrinciples', data: {
          eyebrow: ru(ABOUT_CONTENT, 'princEye'),
          title: ru(ABOUT_CONTENT, 'princTitle'),
          items: ru(ABOUT_CONTENT, 'princs'),
        }
      },
      { id: 'a6', type: 'AboutFounder', data: {
          eyebrow: ru(ABOUT_CONTENT, 'founderEye'),
          title: ru(ABOUT_CONTENT, 'founderTitle'),
          photo: ru(ABOUT_CONTENT, 'founderPhoto'),
          role: ru(ABOUT_CONTENT, 'founderRole'),
          bio: mapToText(ru(ABOUT_CONTENT, 'founderBio')),
          points: mapToText(ru(ABOUT_CONTENT, 'founderPoints')),
        }
      },
      { id: 'a7', type: 'AboutSecretariat', data: {
          eyebrow: ru(ABOUT_CONTENT, 'secretEye'),
          title: ru(ABOUT_CONTENT, 'secretTitle'),
          members: ru(ABOUT_CONTENT, 'team'),
        }
      },
      { id: 'a8', type: 'AboutMission', data: {
          eyebrow: ru(ABOUT_CONTENT, 'mvvEye'),
          mission: ru(ABOUT_CONTENT, 'mission'),
          vision: ru(ABOUT_CONTENT, 'vision'),
          values: ru(ABOUT_CONTENT, 'values'),
        }
      },
      { id: 'a9', type: 'AboutCTA', data: {
          text: ru(ABOUT_CONTENT, 'ctaText'),
          initBtn: ru(ABOUT_CONTENT, 'ctaInit'),
          partBtn: ru(ABOUT_CONTENT, 'ctaPart'),
        }
      }
    ]
  },
  initiatives: {
    blocks: [
      { id: 'i1', type: 'Hero', data: {
          title: ru(INITIATIVES_CONTENT, 'heroTitle'),
          desc: ru(INITIATIVES_CONTENT, 'heroDesc'),
          label: ru(INITIATIVES_CONTENT, 'heroEye')
        }
      },
      { id: 'i2', type: 'InitiativesContent', data: {
          intro: ru(INITIATIVES_CONTENT, 'intro'),
          partnershipLabel: ru(INITIATIVES_CONTENT, 'partnershipLabel'),
          partnershipTitle: ru(INITIATIVES_CONTENT, 'partnershipTitle'),
          partnershipText: ru(INITIATIVES_CONTENT, 'partnershipText'),
          ctaTitle: ru(INITIATIVES_CONTENT, 'ctaTitle'),
          ctaText: ru(INITIATIVES_CONTENT, 'ctaText'),
          ctaBtn: ru(INITIATIVES_CONTENT, 'ctaBtn'),
          ctaEmail: ru(INITIATIVES_CONTENT, 'ctaEmail'),
          items: (INITIATIVES_CONTENT.ru?.items || []).map(item => ({
            id: item.id,
            tag: item.tag,
            num: item.num,
            title: item.title,
            desc: item.desc,
            details: item.details || '',
            tasks: (item.tasks || []).map(t => ({ text: t }))
          }))
        }
      }
    ]
  },
  media: {
    blocks: [
      { id: 'm1', type: 'Hero', data: {
          title: 'Медиа',
          desc: 'Фото и видео галерея',
          label: 'GBWC'
        }
      },
      { id: 'm2', type: 'MediaContent', data: {
          intlItems: [
            { source: 'The Astana Times', title: 'GBWC at World Economic Forum 2024', date: '22.01.2024', url: '#', image: '/img/media/m1.jpg' }
          ],
          natlItems: [
            { source: 'Inform.kz', title: 'Развитие женского бизнеса в Казахстане', date: '15.03.2024', url: '#', image: '/img/media/m2.jpg' }
          ],
          kzItems: [
            { source: 'Silkway TV', title: 'GBWC: Жаңа мүмкіндіктер мен жобалар', date: '10.04.2024', url: '#', image: '/img/media/m3.jpg' }
          ],
          allItems: [
            { source: 'GBWC', title: 'Общие итоги пленарного заседания', date: '01.05.2024', url: '#', image: '/img/media/m4.jpg' }
          ]
      } }
    ]
  },
  contacts: {
    blocks: [
      { id: 'c1', type: 'Hero', data: {
          title: ru(CONTACTS_CONTENT, 'heroTitle'),
          desc: ru(CONTACTS_CONTENT, 'heroDesc'),
          label: ru(CONTACTS_CONTENT, 'heroEye')
        }
      },
      { id: 'c2', type: 'ContactsContent', data: {
          infoTitle: 'Контактная информация',
          infoDesc: 'Секретариат GBWC находится в Астане. Открыты для сотрудничества с деловыми женщинами по всему миру.',
          addressLabel: 'АДРЕС',
          addressVal: 'ул. Достык 16, Talan Towers, Астана',
          phoneLabel: 'ТЕЛЕФОН',
          phoneVal: '+7 702 731 4400',
          emailLabel: 'EMAIL',
          emailVal: 'bibigul.maserbaeva@gbwc.network',
          phone2Label: 'ТЕЛЕФОН',
          phone2Val: '+7 778 124 70 54',
          email2Label: 'EMAIL',
          email2Val: 'sana.kumargazy@gbwc.network',
          name2: 'Құмарғазы Сана Еркінқызы',
          infoEmail: 'info@gbwc.network',
          socialLabel: 'СОЦИАЛЬНЫЕ СЕТИ',
          formTitle: 'Отправить сообщение',
          send: 'Отправить сообщение'
        }
      }
    ]
  },
  partners: {
    blocks: [
      { id: 'p1', type: 'Hero', data: {
          title: 'Партнеры',
          desc: 'Глобальная сеть организаций, поддерживающих инициативы Совета',
          label: 'GBWC'
        }
      },
      { id: 'p2', type: 'PartnersContent', data: {
          intlTitle: 'Международные организации',
          corpTitle: 'Корпоративные партнёры',
          natlTitle: 'Национальные партнёры',
          instTitle: 'Институциональные партнёры',
          intlPartners: [
            { name: 'EBRD', logo: '/img/partners/intl/ebrd.svg', full: 'European Bank for Reconstruction and Development' },
            { name: 'World Bank', logo: '/img/partners/intl/wb.svg', full: 'The World Bank Group' }
          ],
          corpPartners: [
            { name: 'Microsoft', logo: '/img/partners/corp/microsoft.svg', full: 'Microsoft Corporation' },
            { name: 'Citi', logo: '/img/partners/corp/citi.svg', full: 'Citigroup Inc.' }
          ],
          natlPartners: [],
          instPartners: [],
          coopLabel: 'СОТРУДНИЧЕСТВО',
          coopTitle: 'Формы партнёрства',
          coopItems: [
            { title: 'Стратегическое партнерство', desc: 'Совместная реализация глобальных инициатив' },
            { title: 'Экспертная поддержка', desc: 'Участие в аналитических группах и советах' }
          ],
          ctaTitle: 'Стать партнёром GBWC',
          ctaText: 'Присоединяйтесь к глобальной сети партнёров Совета',
          ctaBtn: 'Связаться с нами',
          ctaEmail: 'info@gbwc.network'
        }
      }
    ]
  },
  events: {
    blocks: [
      { id: 'e1', type: 'Hero', data: {
          title: ru(EVENTS_LABELS, 'heroTitle'),
          desc: ru(EVENTS_LABELS, 'heroDesc'),
          label: ru(EVENTS_LABELS, 'eyebrow')
        }
      },
      { id: 'e2', type: 'EventsContent', data: {
          events: [
            { 
              year: '2023', label: 'I Session 2023', 
              title: 'Глобальная бизнес-интеграция', 
              desc: 'Первое пленарное заседание Совета по развитию женского предпринимательства', 
              topics: 'Развитие женского лидерства\nЦифровая трансформация бизнеса\nДоступ к финансовым ресурсам',
              results: 'Создана дорожная карта развития\nПодписано 5 меморандумов\nЗапущена менторская программа',
              members: 'Елена Соколова\nАйгерим Муратова\nДжон Смит',
              day: '12', month: 'мая', location: 'Астана', format: 'Гибридный', link: 'sess-2023' 
            },
            { 
              year: '2024', label: 'II Session 2024', 
              title: 'Женщины в глобальной экономике', 
              desc: 'Второе заседание, посвященное вопросам гендерного равенства в бизнесе', 
              topics: 'Гендерный баланс в советах директоров\nЭкосистемы для стартапов\nМеждународная торговля',
              results: 'Утверждена стратегия до 2030 года\nПривлечено $10млн инвестиций\nОткрыто 3 новых филиала',
              members: 'Сауле Жандосова\nМария Иванова\nКеннет Уокер',
              day: '15', month: 'июня', location: 'Астана', format: 'Оффлайн', link: 'sess-2024' 
            },
            { 
              year: '2025', label: 'III Session 2025', 
              title: 'Будущее устойчивого развития', 
              desc: 'Третье пленарное заседание с участием международных организаций', 
              topics: 'Зеленые инвестиции\nОбразовательные программы\nКультурный обмен',
              results: 'Подписаны соглашения с министерствами\nЗапущен проект цифровой грамотности\nОрганизовано выступление в Ватикане',
              members: 'Одиль Рено-Бассо\nКирсти Уилсон\nЭмили Муран-Ренуар',
              day: '24', month: 'июня', location: 'Астана', format: 'Гибридный', link: 'sess-2025' 
            }
          ],
          membersLabel: 'Участники',
          guestsLabel: 'Гости',
          topicsLabel: 'Темы',
          resultsLabel: 'Итоги'
        }
      }
    ]
  },
  founders: {
    blocks: [
      { id: 'f1', type: 'Hero', data: {
          title: 'Лидеры',
          desc: 'Лидеры и основатели',
          label: 'GBWC'
        }
      },
      { id: 'f2', type: 'FoundersContent', data: {} }
    ]
  }
}

async function seedDynamic() {
  console.log('🔌 Connecting to local JSON DB or MongoDB...')
  // Since we use localdb, Page.findOneAndUpdate handles the JSON files under the hood
  for (const [key, content] of Object.entries(PAGES_BLOCKS)) {
    const result = await Page.findOneAndUpdate(
      { key },
      { content },
      { upsert: true, new: true }
    )
    console.log(`  ✅ ${key} — saved dynamic blocks`)
  }

  console.log(`\n🎉 Done! ${Object.keys(PAGES_BLOCKS).length} pages seeded with blocks.`)
  process.exit(0)
}

seedDynamic().catch(err => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
