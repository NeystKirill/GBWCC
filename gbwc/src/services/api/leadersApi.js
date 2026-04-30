import { leaders } from '../api'
export const leadersApi = {
  list: (params) => leaders.list(params),
  get: (id) => leaders.get(id),
}
export default leadersApi
