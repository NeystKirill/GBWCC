import { contact } from '../api'
export const contactApi = {
  submit: (data) => contact.submit(data),
  list: (params) => contact.list(params),
}
export default contactApi
