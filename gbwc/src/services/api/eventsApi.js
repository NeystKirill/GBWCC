import { sessions } from '../api'
export const eventsApi = {
  list: (params) => sessions.list(params),
  get: (id) => sessions.get(id),
  getBySlug: (slug) => sessions.getBySlug(slug),
}
export default eventsApi
