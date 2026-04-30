import { partners } from '../api'
export const partnersApi = {
  list: (params) => partners.list(params),
  get: (id) => partners.get(id),
}
export default partnersApi
