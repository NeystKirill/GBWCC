import { initiatives } from '../api'
export const initiativesApi = {
  list: (params) => initiatives.list(params),
  get: (id) => initiatives.get(id),
}
export default initiativesApi
