import { media } from '../../services/api'

export const mediaApi = {
  list: (params) => media.list(params),
  get:  (id)     => media.get(id),
}

export default mediaApi
