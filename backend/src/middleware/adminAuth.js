const adminToken = process.env.ADMIN_TOKEN || 'vertex-admin-token'

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.replace('Bearer ', '')

  if (token !== adminToken) {
    return res.status(401).json({ message: 'Acesso admin invalido.' })
  }

  return next()
}
