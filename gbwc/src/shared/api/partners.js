import { partners } from '../../services/api'

const GROUPS = ['intl', 'corp', 'natl', 'inst']

export const partnerApi = {
  list: (params) => partners.list(params),
  get:  (id)     => partners.get(id),
  getGrouped: async () => {
    const res = await partners.list({ limit: 500 })
    const items = Array.isArray(res) ? res : (res?.items || [])
    const grouped = Object.fromEntries(GROUPS.map(k => [k, []]))
    items.forEach(item => {
      let key = item.type || item.category || ''
      // Normalize full names to short keys used in frontend
      if (key === 'international') key = 'intl'
      if (key === 'corporate')     key = 'corp'
      if (key === 'national')      key = 'natl'
      if (key === 'institutional') key = 'inst'
      
      if (grouped[key]) {
        grouped[key].push({
          ...item,
          logo: item.logo_url || item.logo || item.image || item.photo // Try all common image fields
        })
      }
    })
    return grouped
  },
}

export default partnerApi
