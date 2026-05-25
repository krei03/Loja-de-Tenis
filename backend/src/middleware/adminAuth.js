import { verifyAdminToken } from '../services/adminSecurity.js'

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.replace('Bearer ', '')
  const admin = verifyAdminToken(token)

  if (!admin) {
    return res.status(401).json({ message: 'Acesso admin invalido.' })
  }

  req.admin = admin
  return next()
}
