import 'dotenv/config'
import Leader from './models/Leader.js'
import Session from './models/Session.js'
import Initiative from './models/Initiative.js'
import Partner from './models/Partner.js'
import Media from './models/Media.js'
import Page from './models/Page.js'
import User from './models/User.js'
import bcrypt from 'bcryptjs'

async function seed() {
  console.log('🔌 Initializing Local JSON Database with static data...')

  // Leaders
  const { LEADERS } = await import('../../src/entities/founders/founders.data.js')
  for (const item of LEADERS) {
    const data = {
      photo: item.photo,
      sessionPhotos: item.sessionPhotos,
      initials: item.initials,
      index: item.index,
      data: item.data,
      sort_order: item.id
    }
    const res = await Leader.findOneAndUpdate({ sort_order: item.id }, data, { upsert: true, new: true })
    console.log(`✅ Leader ${item.data.ru.name} saved (id: ${res.id})`)
  }

  // Sessions
  const { SESSIONS } = await import('../../src/entities/events/events.data.js')
  for (const item of SESSIONS) {
    const data = {
      numeral: item.numeral,
      year: item.year,
      date: item.date,
      location: item.location,
      context: item.context,
      theme: item.theme,
      desc: item.desc,
      members: item.members,
      guests: item.guests,
      topics: item.topics,
      results: item.results,
      gallery: item.gallery,
      video: item.video,
      localPhotos: item.localPhotos,
      sort_order: item.id
    }
    const res = await Session.findOneAndUpdate({ sort_order: item.id }, data, { upsert: true, new: true })
    console.log(`✅ Session ${item.year} saved (id: ${res.id})`)
  }

  // Initiatives
  const { INITIATIVES_CONTENT } = await import('../../src/entities/initiatives/initiatives.data.js')
  const initRu = INITIATIVES_CONTENT.ru.items
  const initEn = INITIATIVES_CONTENT.en.items
  const initKk = INITIATIVES_CONTENT.kk.items
  
  for (let i = 0; i < initRu.length; i++) {
    const data = {
      slug: initRu[i].id,
      tag: { ru: initRu[i].tag, en: initEn[i].tag, kk: initKk[i].tag },
      num: initRu[i].num,
      title: { ru: initRu[i].title, en: initEn[i].title, kk: initKk[i].title },
      description: { ru: initRu[i].desc, en: initEn[i].desc, kk: initKk[i].desc },
      details: { ru: initRu[i].details, en: initEn[i].details, kk: initKk[i].details },
      tasks: { ru: initRu[i].tasks, en: initEn[i].tasks, kk: initKk[i].tasks },
      sort_order: i + 1
    }
    const res = await Initiative.findOneAndUpdate({ slug: data.slug }, data, { upsert: true, new: true })
    console.log(`✅ Initiative ${initRu[i].title} saved`)
  }

  // Partners
  const { PARTNERS } = await import('../../src/entities/partners/partners.data.js')
  const allPartners = [
    ...PARTNERS.intl.map(p => ({...p, category: 'international'})), 
    ...PARTNERS.corp.map(p => ({...p, category: 'corporate'})), 
    ...PARTNERS.natl.map(p => ({...p, category: 'national'})), 
    ...PARTNERS.inst.map(p => ({...p, category: 'institutional'}))
  ]
  
  for (let i = 0; i < allPartners.length; i++) {
    const item = allPartners[i]
    const data = {
      name: item.name,
      logo: item.logo,
      url: item.url,
      full_name: item.full,
      rep: item.rep,
      photo: item.photo,
      sessions: item.sessions,
      category: item.category,
      sort_order: i + 1
    }
    const res = await Partner.findOneAndUpdate({ name: data.name }, data, { upsert: true, new: true })
    console.log(`✅ Partner ${item.name} saved`)
  }

  // Media
  const { ARTICLES } = await import('../../src/entities/media/media.data.js')
  for (const item of ARTICLES) {
    const data = {
      source: item.source,
      category: item.category,
      date: item.date,
      title: item.title,
      url: item.url,
      image: item.image,
      sort_order: item.id
    }
    const res = await Media.findOneAndUpdate({ url: item.url }, data, { upsert: true, new: true })
    console.log(`✅ Media ${item.source} saved`)
  }

  // Save Page Contents
  const PAGE_CONTENT = {
    'initiatives': INITIATIVES_CONTENT,
    'events': await import('../../src/entities/events/events.data.js').then(m => m.EVENTS_LABELS),
  }
  for (const [key, content] of Object.entries(PAGE_CONTENT)) {
    await Page.findOneAndUpdate({ key }, { content }, { upsert: true, new: true })
    console.log(`✅ Page content ${key} saved`)
  }

  // Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@gbwc.network'
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!'
  const existingAdmin = await User.findOne({ email: adminEmail })
  if (!existingAdmin) {
    const hash = await bcrypt.hash(adminPassword, 12)
    await User.create({ email: adminEmail, password: hash, role: 'admin' })
    console.log(`✅ Default Admin user created: ${adminEmail}`)
  } else {
    console.log(`✅ Admin user already exists: ${adminEmail}`)
  }

  console.log(`\n🎉 Done! All data seeded to local DB.`)
  process.exit(0)
}

seed().catch(err => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
