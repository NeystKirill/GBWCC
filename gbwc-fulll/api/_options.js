import { setCors } from '../lib/cors.js'

export default function handler(req, res) {
  setCors(req, res)
  res.status(204).end()
}
